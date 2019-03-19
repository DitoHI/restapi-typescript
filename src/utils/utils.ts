import fs, { unlink } from 'fs';
import lokijs from 'lokijs';
import * as multer from 'multer';
import { userDeletedPath, userOldPath } from './constant';

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
    req.fileValidationError = 'File that you upload is not supported';
    return cb(null, false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: ((req: any, file, callback) => {
    let backupPath = '';
    let oriPath = '';
    if (req.body.username) {
      oriPath = `${userOldPath}${req.body.username}`;
      backupPath = `${userDeletedPath}${req.body.username}`;
    } else if (req.user.username) {
      oriPath = `${userOldPath}${req.user.username}`;
      backupPath = `${userDeletedPath}${req.user.username}`;
    }

    makeDir(oriPath);
    makeDir(backupPath);
    callback(null, oriPath);
  }),
  filename: ((req: any, file, callback) => {
    if (req.body.username) {
      const fileName = this.modifyImagetoLatest(req.body.username);
      callback(null, fileName);
    } else if (req.user.username) {
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

  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve('Success delete image');
    });
  });
};

const makeDir = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

const modifyImagetoLatest = (originalName: string) => {
  return `${originalName}_${Date.now()}.png`;
};

export { deleteFile, imageFilter, loadCollection, storage, makeDir, moveFile, modifyImagetoLatest };
