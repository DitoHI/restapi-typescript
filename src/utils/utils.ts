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

const storage = multer.diskStorage({
  destination: ((req, file, callback) => {
    callback(null, 'public/user/photos/new');
  }),
  filename: ((req: any, file, callback) => {
    callback(null, `${req.body.username}-${moment().format('DDMMYYYY')}.png`);
  })
});

const move = (oldPath: string, newPath: string) => {
  fs.rename(oldPath, newPath, (err) => {
    return new Promise((resolve) => {
      fs.unlink(oldPath, (errChild) => resolve(errChild));
      if (err) {
        if (err.code === 'EXDEV') {
          return copy(oldPath, newPath);
        }
        return resolve(err);
      }
      return resolve(oldPath);
    });
  });
};

const copy = (oldPath: string, newPath: string) => {
  const readStream = fs.createReadStream(oldPath);
  const writeStream = fs.createWriteStream(newPath);

  return new Promise((resolve) => {
    readStream.on('error', (err) => resolve(err));
    writeStream.on('error', (err) => resolve(err));

    readStream.on('close', () => {
      console.log(oldPath);
      fs.unlink(oldPath, (err) => resolve(err));
    });

    readStream.pipe(writeStream);
    resolve(newPath);
  });
};

export { imageFilter, loadCollection, storage, move };
