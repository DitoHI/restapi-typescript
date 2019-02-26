import { Router } from 'express';
import fs from 'fs';
import lokijs from 'lokijs';
import multer from 'multer';
import { UploadActivity } from '../../../utils/constant';
import * as userController from './userController';

const userRoutes = Router();

// setup multer
const uploadActivity = new UploadActivity('user');
const upload = uploadActivity.upload;
const db = uploadActivity.db;

userRoutes.post('/create', (req, res) => {
  userController.addUser(req, res);
});

userRoutes.post('/upload', upload.single('avatar'), async (req, res) => {
  userController.uploadProfile(req, res, db);
});

export { userRoutes };
