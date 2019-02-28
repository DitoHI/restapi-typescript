import * as bcrypt from 'bcrypt';
import { historyModel, IHistory, IUser, userModel } from '../../../schema';
import { loadCollection } from '../../../utils/utils';

const collectionName = process.env.COLLECTION_NAME;

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
  const pathImgProfile = req.file.path;

  // save to local by loki
  const profileColumn = await loadCollection(collectionName, db);
  const profileData = profileColumn.insert(req.file);
  db.saveDatabase();

  const newUser = new userModel({
    name,
    username,
    email,
    password,
    userProfile: pathImgProfile,
  });
  newUser.save((err, user) => {
    let statusCode: number = 0;
    let messageLog: string = '';
    if (err) {
      statusCode = 400;
      messageLog = 'Failed saving to MongoDB';
      return res.status(statusCode).json({
        message: messageLog
      });
    }

    statusCode = 200;
    messageLog = 'User has been saved';
    return res.status(statusCode).json({
      message: messageLog,
      body: user,
    });

  });
};

const getUser = (req: any, res: any) => {

  const id = req.query.id;

  const name = req.query.name;

  const username = req.query.username;

  const operator = req.query.operator;

  const password = req.query.password;

  const isActived = req.query.isActived;

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

    statusCode = 200;
    messageLog = 'User found';
    return res.status(statusCode).json({
      status: statusCode,
      message: messageLog,
      body: users,
    });

  });
};

const updateUser = (req: any, res: any) => {
  const username = req.body.username;

  const email = req.body.email;

  const password = req.body.password;

  const newUsername = req.body.newUsername;

  const newEmail = req.body.newEmail;

  const newPassword = req.body.newPassword;

  const findUser: { [k: string]: any } = {};

  email != null
    ? findUser.email = email
    : null;

  username != null
    ? findUser.username = username
    : null;

  // check if value wants to be updated
  // and the new value already inputted
  let statusCode: number = 0;
  let messageLog: string = '';

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

    if (password != null) {
      if (newPassword == null) {
        statusCode = 400;
        messageLog = 'Please fill the new password you want to update';
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
    }

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

  if ((req.body.username == null && req.body.password == null)
    || (req.query.email == null && req.body.password == null)
  ) {
    statusCode = 400;
    messageLog = 'Please fill the form';
    return res.status(statusCode).json({
      status: statusCode,
      message: messageLog
    });
  }

  const username = req.body.username;

  const email = req.body.email;

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

    statusCode = 200;
    messageLog = 'User deleted';
    return res.status(statusCode).json({
      status: statusCode,
      message: messageLog,
      body: usersClone
    });
  });
};

const uploadProfile = async (req: any, res: any, db: any) => {
  if (req.file == null) {
    return res.status(400).json({
      message: 'Please at least upload an image'
    });
  }
  const profileColumn = await loadCollection(collectionName, db);
  const profileData = profileColumn.insert(req.file);
  db.saveDatabase();
  return res.status(200).json({
    message: 'Upload success',
    body: profileData.originalname
  });
};

export { addUser, uploadProfile, getUser, updateUser, deleteUser };
