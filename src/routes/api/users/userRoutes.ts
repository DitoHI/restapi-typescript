import { Router } from 'express';
import { UploadActivity } from '../../../utils/constant';
import { deleteFile } from '../../../utils/utils';
import * as userController from './userController';

// testing
const userRoutes = Router();

// setup multer
const uploadActivity = new UploadActivity('user');
const upload = uploadActivity.upload;
const db = uploadActivity.db;

// STATIC CONSTANT
const SUCCESS_RESPONSE = 200;
const FAILED_RESPONSE = 400;

userRoutes.get('/me',
               userController.verifyToken,
               userController.getUserFromToken,
               (req: any, res) => {
                 return res.status(req.status).json({
                   message: req.message,
                   body: req.user
                 });
               });

userRoutes.post('/create',
                upload.single('avatar'),
                async (req, res) => {
                  userController.addUser(req, res, db);
                });

userRoutes.post('/upload',
                userController.verifyToken,
                userController.getUserFromToken,
                upload.single('avatar'),
                async (req, res) => {
                  userController.uploadProfile(req, res).then((result) => {
                    return res.status(SUCCESS_RESPONSE).json({
                      body: result,
                      message: 'Profile image updated successfully'
                    });
                  }).catch((err) => {
                    // delete uploaded image if failed
                    // register
                    deleteFile(req.file.path).then(() => {
                      return res.status(SUCCESS_RESPONSE).json({
                        message: 'Profile image updated successfully'
                      });
                    }).catch((errChild) => {
                      return res.status(FAILED_RESPONSE).json({
                        message: errChild
                      });
                    });
                  });
                });

userRoutes.get('/login', (req, res) => {
  userController.getUser(req, res);
});

userRoutes.put('/update'
  ,            userController.verifyToken
  ,            userController.getUserFromToken
  ,            (req: any, res) => {
    userController.updateUser(req, res);
  });

userRoutes.delete('/delete',
                  userController.verifyToken,
                  userController.getUserFromToken,
                  (req, res) => {
                    userController.deleteUser(req, res);
});

export { userRoutes };
