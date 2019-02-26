import * as bcrypt from 'bcrypt';
import { userModel } from '../../../schema';
import { UploadActivity } from '../../../utils/constant';
import { loadCollection } from '../../../utils/utils';

const addUser = async (req: any, res: any) => {
  if (!req.body.name || !req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'Please fill the form'
    });
  }

  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 10);

  const newUser = new userModel({
    name,
    username,
    email,
    password
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

const uploadProfile = async (req: any, res: any, db: any) => {
  if (req.file == null) {
    return res.status(400).json({
      message: 'Please at least upload an image'
    });
  }

  const collectionName = process.env.COLLECTION_NAME;
  const profileColumn = await loadCollection(collectionName, db);
  const profileData = profileColumn.insert(req.file);
  db.saveDatabase();
  return res.status(200).json({
    message: 'Upload success',
    body: profileData.originalname
  });
};

export { addUser, uploadProfile };
