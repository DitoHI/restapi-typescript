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

userRoutes.post('/create', upload.single('avatar'), async (req, res) => {
  userController.addUser(req, res, db);
});

userRoutes.post('/upload', upload.single('avatar'), async (req, res) => {
  userController.uploadProfile(req, res, db);
});

userRoutes.get('/read', (req, res) => {
  userController.getUser(req, res);
});

userRoutes.put('/update', (req, res) => {
  userController.updateUser(req, res);
});

userRoutes.delete('/delete', (req, res) => {
  userController.deleteUser(req, res);
});

export { userRoutes };
