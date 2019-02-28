import lokijs from 'lokijs';
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
    callback(null, 'public');
  }),
  filename: ((req, file, callback) => {
    callback(null, `${file.originalname} - ${Date.now()}.png`);
  })
});

export { imageFilter, loadCollection, storage };