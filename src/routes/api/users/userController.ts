import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { historyModel, IHistory, IUser, userModel } from '../../../schema';
import { userDeletedPath, userOldPath } from '../../../utils/constant';
import {
  deleteFile
  , moveFile
} from '../../../utils/utils';

const collectionName = process.env.COLLECTION_NAME;
const secret = process.env.SECRET;

const getUserFromToken = (req: any, res: any, next: any) => {
  let statusCode = 400;
  let message = 'Authenticate success';
  const decoded = req.decoded;
  
  userModel.findById(decoded.id, (err, output) => {
    if (err) {
      message = 'User not found';
      return res.status(statusCode).json({
        message,
        status: statusCode,
      });
    }
    
    if (output == null) {
      message = 'Token expired';
      return res.status(statusCode).json({
        message,
        status: statusCode,
      });
    }
    
    statusCode = 200;
    req.status = statusCode;
    req.message = message;
    req.user = output;
    next();
  });
};

const verifyToken = (req: any, res: any, next: any) => {
  let statusCode = 0;
  let message = '';
  
  const token = req.body.token || req.query.token || req.headers.authorization;
  
  if (!token) {
    statusCode = 400;
    message = 'No token provided';
    return res.status(statusCode).json({
      message
    });
  }
  
  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      statusCode = 400;
      message = 'Failed to authenticate token';
      return res.status(statusCode).json({
        message,
        token
      });
    }
    
    statusCode = 200;
    message = 'Token authenticated';
    req.decoded = decoded;
    next();
  });
};

const addUser = async (req: any, res: any, db: any) => {
  if (!req.body.name || !req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'Please fill the form'
    });
  }
  
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 10);
  
  let userOriginalProfile = null;
  req.file
    ? userOriginalProfile = req.file.path
    : null;
  
  const newUser = new userModel({
    name,
    username,
    email,
    password,
    userOriginalProfile,
  });
  newUser.save((err, user: any) => {
    let statusCode: number = 0;
    let messageLog: string = '';
    if (err) {
      statusCode = 400;
      messageLog = 'Failed saving to MongoDB';
      return res.status(statusCode).json({
        message: messageLog
      });
    }
    
    const userParsed = user as IUser;
    const payload = {
      id: user.id,
      name: user.username,
    };
    const token = jwt.sign(payload, secret, {
      expiresIn: 86400 // 24 hours
    });
    
    statusCode = 200;
    messageLog = 'User has been saved';
    return res.status(statusCode).json({
      token,
      message: messageLog,
      body: user,
    });
    
  });
};

const getUser = (req: any, res: any) => {
  if ((req.body.name == null || req.body.username == null) && req.body.password == null) {
    const statusCode = 400;
    const messageLog = 'Please specify name, username, or password';
    return res.status(statusCode).json({
      status: statusCode,
      message: messageLog
    });
  }
  
  const id = req.body.id;
  
  const name = req.body.name;
  
  const username = req.body.username;
  
  const operator = req.body.operator;
  
  const password = req.body.password;
  
  const isActived = req.body.isActived;
  
  const findUser: { [k: string]: any } = {};
  
  id != null
    ? findUser._id = id
    : null;
  
  name != null
    ? findUser.name = name
    : null;
  
  username != null
    ? findUser.username = username
    : null;
  
  isActived != null
    ? findUser.isActived = isActived
    : null;
  
  userModel.find(findUser, async (err, output: any) => {
    let statusCode: number = 0;
    let messageLog: string = '';
    if (err) {
      statusCode = 400;
      messageLog = 'Failed finding at MongoDB';
      return res.status(statusCode).json({
        status: statusCode,
        message: messageLog
      });
    }
    
    const users = output as IUser[];
    if (users.length === 0) {
      statusCode = 404;
      messageLog = 'No user found';
      return res.status(statusCode).json({
        status: statusCode,
        message: messageLog
      });
    }
    
    if (password != null) {
      const valid = await bcrypt.compare(password, users[0].password);
      if (!valid) {
        statusCode = 404;
        messageLog = 'Please check your password';
        return res.status(statusCode).json({
          status: statusCode,
          message: messageLog
        });
      }
    }
    
    const user = users[0];
    const payload = {
      id: user._id,
      name: user.username,
    };
    const token = jwt.sign(payload, secret, {
      expiresIn: 86400 // 24 hours
    });
    
    statusCode = 200;
    messageLog = 'User found';
    return res.status(statusCode).json({
      token,
      status: statusCode,
      message: messageLog,
      body: users,
    });
    
  });
};

const updateUser = (req: any, res: any) => {
  const username = req.user.username;
  
  const email = req.user.email;
  
  // check if value wants to be updated
  // and the new value already inputted
  let statusCode: number = 400;
  let messageLog: string = '';
  
  if (!req.body.newUsername && !req.body.newEmail) {
    messageLog = 'Please fill the form';
    return res.status(statusCode).json({
      status: statusCode,
      message: messageLog
    });
  }
  
  const newUsername = req.body.newUsername;
  
  const newEmail = req.body.newEmail;
  
  const password = req.body.password;
  
  const newPassword = req.body.newPassword;
  
  const findUser: { [k: string]: any } = {};
  
  email != null
    ? findUser.email = email
    : null;
  
  username != null
    ? findUser.username = username
    : null;
  
  if (email != null && newEmail == null) {
    statusCode = 400;
    messageLog = 'Please fill the new email you want to update';
    return res.status(statusCode).json({
      status: statusCode,
      message: messageLog
    });
  }
  
  if (username != null && newUsername == null) {
    statusCode = 400;
    messageLog = 'Please fill the new username you want to update';
    return res.status(statusCode).json({
      status: statusCode,
      message: messageLog
    });
  }
  
  userModel.find(findUser, async (err, output: any) => {
    statusCode = 400;
    messageLog = 'Error finding user';
    if (err) {
      return res.status(statusCode).json({
        status: statusCode,
        message: messageLog
      });
    }
    const users = (output as IUser[]).slice();
    if (users.length === 0) {
      statusCode = 404;
      messageLog = 'No user found';
      return res.status(statusCode).json({
        status: statusCode,
        message: messageLog
      });
    }
    
    if (password == null) {
      statusCode = 404;
      messageLog = 'Please input your password';
      return res.status(statusCode).json({
        status: statusCode,
        message: messageLog
      });
    }
    
    const valid = await bcrypt.compare(password, users[0].password);
    if (!valid) {
      statusCode = 404;
      messageLog = 'Please check your password';
      return res.status(statusCode).json({
        status: statusCode,
        message: messageLog
      });
    }
    findUser.password = password;
    
    statusCode = 307;
    messageLog = 'User updated';
    const userChanged = users.slice(0, 1)[0];
    
    const newUser: { [k: string]: any } = {};
    
    newEmail != null
      ? newUser.user = newEmail
      : null;
    
    newUsername != null
      ? newUser.username = newUsername
      : null;
    
    newPassword != null
      ? newUser.password = newPassword
      : null;
    
    userModel.findByIdAndUpdate(userChanged._id, newUser, (errChild, outputChild: any) => {
      if (err) {
        messageLog = `Failed updating user[_id: ${userChanged._id}]`;
        statusCode = 403;
        return res.status(statusCode).json({
          status: statusCode,
          message: messageLog
        });
      }
    });
    
    return res.status(statusCode).json({
      status: statusCode,
      message: messageLog,
      body: newUser
    });
    
  });
};

const deleteUser = (req: any, res: any) => {
  let statusCode: number = 0;
  let messageLog: string = '';
  
  if (!req.body.password) {
    statusCode = 400;
    messageLog = 'Please input your password';
    return res.status(statusCode).json({
      status: statusCode,
      message: messageLog
    });
  }
  
  const username = req.user.username;
  
  const email = req.user.email;
  
  const password = req.body.password;
  
  const findUser: { [k: string]: any } = {};
  
  username != null
    ? findUser.username = username
    : null;
  
  email != null
    ? findUser.email = email
    : null;
  
  userModel.find(findUser, async (err, output: any) => {
    const users = output as IUser[];
    if (users.length === 0) {
      statusCode = 400;
      messageLog = 'No user found';
      return res.status(statusCode).json({
        status: statusCode,
        message: messageLog
      });
    }
    
    const valid = await bcrypt.compare(password, users[0].password);
    if (!valid) {
      statusCode = 404;
      messageLog = 'Please check your password';
      return res.status(statusCode).json({
        status: statusCode,
        message: messageLog
      });
    }
    
    const usersClone = users.slice();
    usersClone.map(async (user) => {
      userModel.deleteOne({ _id: user._id }, (errChild) => {
        if (errChild) {
          statusCode = 400;
          messageLog = 'Failed deleting at MongoDB';
          return res.status(statusCode).json({
            status: statusCode,
            message: messageLog
          });
        }
      });
    });

    // backup the photo
    // before deleted
    if (req.user.userOriginalProfile) {
      const oldPath = req.user.userOriginalProfile;
      const newPath = `${userDeletedPath}${users[0].username}/${users[0].username}_${Date.now()}.png`;
      await moveFile(oldPath, newPath);
    }

    statusCode = 200;
    messageLog = 'User deleted';
    return res.status(statusCode).json({
      status: statusCode,
      message: messageLog,
      body: usersClone
    });
  });
};

const uploadProfile = async (req: any, res: any) => {
  return new Promise((resolve, reject) => {
    let message = 'Please at least upload an image';
    if (req.file == null) {
      return reject(message);
    }

    // check if user is already
    // logged in
    if (!req.user) {
      message = 'No token provided';
      return reject(message);
    }

    const user = req.user as IUser;
    const newFilePath = req.file.path;
    userModel.findByIdAndUpdate(user._id, { userOriginalProfile: newFilePath },
                                (err, result) => {
                                  if (err) {
                                    message = 'Error updating profile';
                                    return reject(message);
                                  }
                                  return resolve(newFilePath);
                                });
  });
};

export {
  addUser
  , uploadProfile
  , getUser
  , updateUser
  , deleteUser
  , verifyToken
  , getUserFromToken
};
