import fs, { unlink } from 'fs';
import lokijs from 'lokijs';
import moment from 'moment';
import * as multer from 'multer';
import { userOldPath } from './constant';

const loadCollection = (colName: string, db: lokijs): Promise<lokijs.Collection<any>> => {
  return new Promise((resolve) => {
    db.loadDatabase({}, () => {
      const collection = db.getCollection(colName) || db.addCollection(colName);
      resolve(collection);
    });
  });
};

const imageFilter = (req: any, file: any, cb: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: ((req, file, callback) => {
    callback(null, userOldPath);
  }),
  filename: ((req: any, file, callback) => {
    if (req.body.username != null) {
      const fileName = this.modifyImagetoLatest(req.body.username);
      callback(null, fileName);
    }
    if (req.user != null) {
      const fileName = this.modifyImagetoLatest(req.user.username);
      callback(null, fileName);
    }
  })
});

const moveFile = (oldPath: string, newPath: string) => {
  fs.rename(oldPath, newPath, (err) => {
    return new Promise((resolve) => {
      fs.unlink(oldPath, (errChild) => resolve(errChild));
      if (err) {
        if (err.code === 'EXDEV') {
          return copyFile(oldPath, newPath);
        }
        return resolve(err);
      }
      return resolve(oldPath);
    });
  });
};

const copyFile = (oldPath: string, newPath: string) => {
  const readStream = fs.createReadStream(oldPath);
  const writeStream = fs.createWriteStream(newPath);

  return new Promise((resolve) => {
    readStream.on('error', (err) => resolve(err));
    writeStream.on('error', (err) => resolve(err));

    readStream.on('close', () => {
      fs.unlink(oldPath, (err) => resolve(err));
    });

    readStream.pipe(writeStream);
    resolve(newPath);
  });
};

const deleteFile = (path: string) => {
  const readStream = fs.createReadStream(path);

  return new Promise((resolve) => {
    readStream.on('error', (err) => resolve(err));
    readStream.on('close', () => {
      fs.unlink(path, (err) => resolve(err));
    });

    resolve(path);
  });
};

const modifyImagetoLatest = (originalName: string) => {
  return `${originalName}_${moment().format('DDMMYYYY')}.png`;
};

export { deleteFile, imageFilter, loadCollection, storage, moveFile, modifyImagetoLatest };
