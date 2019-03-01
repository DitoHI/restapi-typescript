import fs, { unlink } from 'fs';
import lokijs from 'lokijs';
import moment from 'moment';
import * as multer from 'multer';

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

const destinationPath = 'public/user/photos/new/';
const storage = multer.diskStorage({
  destination: ((req, file, callback) => {
    callback(null, destinationPath);
  }),
  filename: ((req: any, file, callback) => {
    
    if (req.body.username != null) {
      callback(null, this.modifyImagetoLatest(req.body.username));
    }
    if (req.user != null) {
      callback(null, this.modifyImagetoLatest(req.user.username));
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
  return `${originalName}-${moment().format('DDMMYYYY')}.png`;
};

export { deleteFile, imageFilter, loadCollection, storage, moveFile, modifyImagetoLatest };
