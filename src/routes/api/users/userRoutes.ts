import { Router } from 'express';
import fs from 'fs';
import lokijs from 'lokijs';
import multer from 'multer';
import { imageFilter, loadCollection, storage } from '../../../utils/utils';
import * as userController from './userController';

const userRoutes = Router();

// setup multer
const DB_NAME = 'db.json';
const COLLECTION_NAME = 'images';
const UPLOAD_PATH = 'uploads';
const upload = multer({ storage, dest: `src/${UPLOAD_PATH}/`, fileFilter: imageFilter });
const db = new lokijs(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });

userRoutes.post('/create', (req, res) => {
  userController.addUser(req, res);
});

userRoutes.post('/upload', upload.single('avatar'), async (req, res) => {
  console.log(req.body);
  const col = await loadCollection(COLLECTION_NAME, db);
  const data = col.insert(req.file);
  db.saveDatabase();
  res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
});

export { userRoutes };
