import { Router } from 'express';
import fs from 'fs';
import lokijs from 'lokijs';
import multer from 'multer';
import { UploadActivity } from '../../../utils/constant';
import * as userController from './userController';

// testing

const userRoutes = Router();

// setup multer
const uploadActivity = new UploadActivity('user');
const upload = uploadActivity.upload;
const db = uploadActivity.db;

userRoutes.get('/me',  userController.verifyToken, userController.showToken);

userRoutes.post('/create', upload.single('avatar'), async (req, res) => {
  userController.addUser(req, res, db);
});

userRoutes.post('/upload', upload.single('avatar'), async (req, res) => {
  userController.uploadProfile(req, res, db);
});

userRoutes.get('/login', (req, res) => {
  userController.getUser(req, res);
});

userRoutes.put('/update', (req, res) => {
  userController.updateUser(req, res);
});

userRoutes.delete('/delete', (req, res) => {
  userController.deleteUser(req, res);
});

// testing fs: read file
userRoutes.get('/readData', (req, res) => {
  fs.readFile('userInfo.txt', 'utf8', (err, data) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    const result = JSON.parse(data);
    return res.status(200).json({
      body: result
    });
  });
});

export { userRoutes };
