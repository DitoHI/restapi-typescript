import lokijs from 'lokijs';
import multer from 'multer';
import { imageFilter, storage } from './utils';

// multer and loki setup
const UPLOAD_PATH = 'public';

class UploadActivity {
  public upload: any;
  public db: any;

  constructor(path: string) {
    this.upload = multer({ storage, dest: `${UPLOAD_PATH}/${path}`, fileFilter: imageFilter });
    this.db = new lokijs(`${UPLOAD_PATH}/${path}.json`, { persistenceMethod: 'fs' });
  }
}

export { UploadActivity };
