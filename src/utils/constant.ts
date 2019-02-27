import lokijs from 'lokijs';
import multer from 'multer';
import { imageFilter, storage } from './utils';

// multer and loki setup
const UPLOAD_PATH = 'public';

class UploadActivity {
  public upload: any;
  public db: any;
  public path: string;

  constructor(path: string) {
    this.path = `${UPLOAD_PATH}/${path}`;
    this.upload = multer({ storage, dest: this.path, fileFilter: imageFilter });
    this.db = new lokijs(`${UPLOAD_PATH}/${path}.json`, { persistenceMethod: 'fs' });
  }
}

export { UploadActivity };
