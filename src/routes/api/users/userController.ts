import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../../../schema';
import { userDeletedPath, userOldPath } from '../../../utils/constant';
import {
  moveFile
} from '../../../utils/utils';

import * as mongoose from 'mongoose';

const userModel = mongoose.model('User');

const collectionName = process.env.COLLECTION_NAME;
const secret = process.env.SECRET;

const findUserById = (userId: any) => {
  return userModel
    .findById(userId)
    .exec()
    .then((user) => {
      return user;
    })
    .catch((err) => {
      return err;
    });
};

const getUserAll = (req: any, res: any) => {
  let statusCode = 200;
  userModel
    .find()
    .select('username email name')
    .exec()
    .then((users) => {
      return res.status(statusCode).json({
        success: true,
        data: {
          users
        },
      });
    })
    .catch(() => {
      statusCode = 400;
      return res.status(statusCode).json({
        success: false,
        message: 'Failed to fetch all users'
      });
    });
};

const getUserFromToken = (req: any, res: any, next: any) => {
  let statusCode = 400;
  let message = 'Authenticate success';
  const decoded = req.decoded;

  userModel
    .findById(decoded.id, (err, output) => {
      if (err) {
        message = 'User not found';
        return res.status(statusCode).json({
          message,
          success: false,
        });
      }

      if (output == null) {
        message = 'Token expired';
        return res.status(statusCode).json({
          message,
          success: false,
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
      message,
      success: false,
    });
  }

  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      statusCode = 400;
      message = 'Failed to authenticate token';
      return res.status(statusCode).json({
        message,
        success: false,
      });
    }

    statusCode = 200;
    message = 'Token authenticated';
    req.decoded = decoded;
    next();
  });
};

const addUser = async (req: any, res: any) => {
  if (!req.body.name || !req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'Please fill the form',
      success: false,
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
  newUser
    .save((err, user: any) => {
      let statusCode: number = 0;
      let messageLog: string = '';
      if (err) {
        statusCode = 400;
        messageLog = err;
        return res.status(statusCode).json({
          message: messageLog,
          success: false,
        });
      }

      const userParsed = user as IUser;
      const payload = {
        id: user.id,
      };
      const token = jwt.sign(payload, secret, {
        expiresIn: 86400 // 24 hours
      });

      statusCode = 200;
      messageLog = 'User has been saved';
      return res.status(statusCode).json({
        data: {
          token,
          user,
        },
        success: true,
      });

    });
};

const getUser = (req: any, res: any) => {
  if ((req.body.email == null || req.body.username == null) && req.body.password == null) {
    const statusCode = 400;
    const messageLog = 'Please specify name, username, or password';
    return res.status(statusCode).json({
      message: messageLog
    });
  }

  const id = req.body.id;

  const name = req.body.name;

  const username = req.body.username;

  const email = req.body.email;

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

  email != null
    ? findUser.email = email
    : null;

  isActived != null
    ? findUser.isActived = isActived
    : null;

  userModel
    .find(findUser, async (err, output: any) => {
      let statusCode: number = 0;
      let messageLog: string = '';
      if (err) {
        statusCode = 400;
        messageLog = 'Failed finding at MongoDB';
        return res.status(statusCode).json({
          message: messageLog,
          success: false,
        });
      }

      const users = output as IUser[];
      if (users.length === 0) {
        statusCode = 404;
        messageLog = 'No user found';
        return res.status(statusCode).json({
          message: messageLog,
          success: false,
        });
      }

      if (password != null) {
        const valid = await bcrypt.compare(password, users[0].password);
        if (!valid) {
          statusCode = 404;
          messageLog = 'Please check your password';
          return res.status(statusCode).json({
            message: messageLog,
            success: false,
          });
        }
      }

      const user = users[0];
      const payload = {
        id: user._id,
      };
      const token = jwt.sign(payload, secret, {
        expiresIn: 86400 // 24 hours
      });

      statusCode = 200;
      messageLog = 'Successfully login';
      return res.status(statusCode).json({
        data: {
          token,
          users,
        },
        success: true,
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
      message: messageLog,
      success: false,
    });
  }

  const newUsername = req.body.newUsername;

  const newEmail = req.body.newEmail;

  const password = req.body.password;

  const newPassword = req.body.newPassword;

  userModel
    .findById(req.user._id, async (err, output: any) => {
      statusCode = 400;
      messageLog = 'Error finding user';
      if (err) {
        return res.status(statusCode).json({
          message: messageLog
        });
      }
      const user = output as IUser;
      if (!user) {
        statusCode = 404;
        messageLog = 'No user found';
        return res.status(statusCode).json({
          message: messageLog,
          success: false,
        });
      }

      if (!password) {
        statusCode = 404;
        messageLog = 'Please input your password';
        return res.status(statusCode).json({
          message: messageLog,
          success: false,
        });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        statusCode = 404;
        messageLog = 'Please check your password';
        return res.status(statusCode).json({
          message: messageLog,
          success: false,
        });
      }

      statusCode = 307;
      messageLog = 'User updated';

      const newUser: { [k: string]: any } = {};

      newEmail != null
        ? newUser.email = newEmail
        : null;

      newUsername != null
        ? newUser.username = newUsername
        : null;

      newPassword != null
        ? newUser.password = newPassword
        : null;

      userModel
        .findByIdAndUpdate(user._id,
                           newUser,
                           { new: true },
                           (errChild, outputChild: any) => {
                             if (err) {
                               statusCode = 400;
                               messageLog = `Failed updating user[_id: ${outputChild._id}]`;
                               return res.status(statusCode).json({
                                 message: messageLog,
                                 success: false,
                               });
                             }
                             return res.status(statusCode).json({
                               data: {
                                 user: outputChild,
                               },
                               success: true,
                             });
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

  userModel
    .find(findUser, async (err, output: any) => {
      const users = output as IUser[];
      if (users.length === 0) {
        statusCode = 400;
        messageLog = 'No user found';
        return res.status(statusCode).json({
          message: messageLog,
          success: false,
        });
      }

      const valid = await bcrypt.compare(password, users[0].password);
      if (!valid) {
        statusCode = 404;
        messageLog = 'Please check your password';
        return res.status(statusCode).json({
          message: messageLog,
          success: false,
        });
      }

      const usersClone = users.slice();
      usersClone
        .map(async (user) => {
          userModel
            .deleteOne({ _id: user._id }, (errChild) => {
              if (errChild) {
                statusCode = 400;
                messageLog = 'Failed deleting user';
                return res.status(statusCode).json({
                  message: messageLog,
                  success: false,
                });
              }
            });
        });

      // backup the photo
      // before deleted
      if (req.user.userOriginalProfile) {
        const oldPath = req.user.userOriginalProfile;
        const newPath =
          `${userDeletedPath}${users[0].username}/${users[0].username}_${Date.now()}.png`;
        await moveFile(oldPath, newPath);
      }

      statusCode = 200;
      messageLog = 'User deleted';
      return res.status(statusCode).json({
        data: {
          user: usersClone[0],
        },
        success: true,
      });
    });
};

const uploadProfile = async (req: any, res: any) => {
  return new Promise((resolve, reject) => {
    // file extension not supported
    if (req.fileValidationError) {
      return reject(req.fileValidationError);
    }

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
    userModel
      .findByIdAndUpdate(user._id,
                         { userOriginalProfile: newFilePath },
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
  , getUserAll
  , updateUser
  , deleteUser
  , findUserById
};
