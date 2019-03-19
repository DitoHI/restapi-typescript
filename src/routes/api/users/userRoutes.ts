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

/**
 * @api {get} /user/me Get LoggedIn User
 * @apiHeader {string} Authorization Bearer
 * @apiGroup User
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK {
 *      "body": {
 *        "name": "Dito Hafizh",
 *        "username": "dito",
 *        "email": "ditohafizh@gmail.com",
 *        "password": "dito123",
 *        "userOriginalProfile": null
 *      }
 *      "message" : "Authenticate success"
 *    }
 * @apiErrorExample {json} No token provided
 *    HTTP/1.1 400 FAILED {
 *      "message" : "No token provided"
 *    }
 * @apiErrorExample {json} Error in Authenticating Token
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Failed to authenticate token"
 *    }
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 400 FAILED {
 *      "message" : "User not found"
 *    }
 * @apiErrorExample {json} Expired Token
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Token expired"
 *    }
 */
userRoutes.get('/me',
               userController.verifyToken,
               userController.getUserFromToken,
               (req: any, res) => {
                 return res.status(req.status).json({
                   message: req.message,
                   body: req.user
                 });
               });

/**
 * @api {post} /user/create Create an User
 * @apiGroup User
 * @apiParam {string} name Name
 * @apiParam {string} username Username
 * @apiParam {string} email Email
 * @apiParam {string} password Password
 * @apiParam {string} [userOriginalProfile] Optional Image Profile
 * @apiParamExample {json} Input
 *    {
 *      "name": "Dito Hafizh",
 *      "username": "dito",
 *      "email": "ditohafizh@gmail.com",
 *      "password": "dito123"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK {
 *      "body": {
 *        "name": "Dito Hafizh",
 *        "username": "dito",
 *        "email": "ditohafizh@gmail.com",
 *        "password": "ditohafizh@gmail.com",
 *        "userOriginalProfile": null
 *      }
 *      "message" : "User has been saved",
 *      "token" : ""
 *    }
 * @apiErrorExample {json} Form not completed
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Please fill the form"
 *    }
 * @apiErrorExample {json} Error in Saving to Database
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Failed saving to MongoDB"
 *    }
 */
userRoutes.post('/create',
                upload.single('userOriginalProfile'),
                async (req, res) => {
                  userController.addUser(req, res);
                });

/**
 * @api {post} /user/upload Upload Photo Profile
 * @apiHeader {string} Authorization Bearer
 * @apiGroup User
 * @apiParam {string} userOriginalProfile Image Profile
 * @apiParamExample {json} Input
 *    {
 *      "userOriginalProfile": "public/user/photos/new/dito/DSP_new_123.png"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK {
 *      "body": {
 *        "userOriginalProfile": "public/user/photos/new/dito/DSP_new_123.png"
 *      }
 *      "message" : "Profile image updated successfully"
 *    }
 *
 * @apiErrorExample {json} No token provided
 *    HTTP/1.1 400 FAILED {
 *      "message" : "No token provided"
 *    }
 * @apiErrorExample {json} Error in Authenticating Token
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Failed to authenticate token"
 *    }
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 400 FAILED {
 *      "message" : "User not found"
 *    }
 * @apiErrorExample {json} Expired Token
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Token expired"
 *    }
 * @apiErrorExample {json} Error Updating Profile
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Failed to update profile"
 *    }
 */
userRoutes.post('/upload',
                userController.verifyToken,
                userController.getUserFromToken,
                upload.single('avatar'),
                async (req, res) => {
                  userController.uploadProfile(req).then((result) => {
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
                        message: 'Failed to update profile'
                      });
                    });
                  });
                });

/**
 * @api {get} /user/login Login User
 * @apiGroup User
 * @apiParam {string} email Email
 * @apiParam {string} [username] Optional if email is not provided
 * @apiParam {string} password Password
 * @apiParamExample {json} Input
 *    {
 *      "email": "ditohafizh@gmail.com",
 *      "password": "ditohafizh@gmail.com"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK {
 *      "body": {
 *        "name": "Dito Hafizh",
 *        "username": "dito",
 *        "email": "ditohafizh@gmail.com",
 *        "password": "",
 *        "userOriginalProfile": "public/user/photos/new/dito/DSP_new_123.png"
 *      }
 *      "message" : "Successfully login"
 *    }
 *
 * @apiErrorExample {json} Form not filled
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Please specify name, username, or password"
 *    }
 * @apiErrorExample {json} Form not filled
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Please specify name, username, or password"
 *    }
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 400 FAILED {
 *      "message" : "No user found"
 *    }
 * @apiErrorExample {json} Password not match
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Please check your password"
 *    }
 */
userRoutes.get('/login', userController.getUser);

/**
 * @api {put} /user/update Update User
 * @apiHeader {string} Authorization Bearer
 * @apiGroup User
 * @apiParam {string} [newUsername] Optional New username to update
 * @apiParam {string} [newEmail] Optional New email to update
 * @apiParam {string} [newPassword] Optional New password to update
 * @apiParam {string} password Password (if not provided then will return error)
 * @apiParamExample {json} Input
 *    {
 *      "newEmail": "ditohafizh__baru@gmail.com",
 *      "password": "dito123"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK {
 *      "body": {
 *        "name": "Dito Hafizh",
 *        "username": "dito",
 *        "email": "ditohafizh__baru@gmail.com",
 *        "password": "",
 *        "userOriginalProfile": "public/user/photos/new/dito/DSP_new_123.png"
 *      }
 *      "message" : "User updated"
 *    }
 *
 * @apiErrorExample {json} No token provided
 *    HTTP/1.1 400 FAILED {
 *      "message" : "No token provided"
 *    }
 * @apiErrorExample {json} Error in Authenticating Token
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Failed to authenticate token"
 *    }
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 400 FAILED {
 *      "message" : "User not found"
 *    }
 * @apiErrorExample {json} Expired Token
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Token expired"
 *    }
 * @apiErrorExample {json} No password inputed
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Please input your password"
 *    }
 * @apiErrorExample {json} Password not match
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Please check your password"
 *    }
 * @apiErrorExample {json} Failed Updating User
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Failed updating user[_id:]"
 *    }
 */
userRoutes.put('/update',
               userController.verifyToken,
               userController.getUserFromToken,
               userController.updateUser);

/**
 * @api {delete} /user/delete Delete User
 * @apiHeader {string} Authorization Bearer
 * @apiGroup User
 * @apiParam {string} password Password (if not provided then will return error)
 * @apiParamExample {json} Input
 *    {
 *      "password": "dito123"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK {
 *      "body": {
 *        "name": "Dito Hafizh",
 *        "username": "dito",
 *        "email": "ditohafizh__baru@gmail.com",
 *        "password": "",
 *        "userOriginalProfile": "public/user/photos/new/dito/DSP_new_123.png"
 *      }
 *      "message" : "User deleted"
 *    }
 *
 * @apiErrorExample {json} No token provided
 *    HTTP/1.1 400 FAILED {
 *      "message" : "No token provided"
 *    }
 * @apiErrorExample {json} Error in Authenticating Token
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Failed to authenticate token"
 *    }
 * @apiErrorExample {json} User not found
 *    HTTP/1.1 400 FAILED {
 *      "message" : "User not found"
 *    }
 * @apiErrorExample {json} Expired Token
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Token expired"
 *    }
 * @apiErrorExample {json} No password inputed
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Please input your password"
 *    }
 * @apiErrorExample {json} Failed Updating User
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Failed deleting user"
 *    }
 */
userRoutes.delete('/delete',
                  userController.verifyToken,
                  userController.getUserFromToken,
                  userController.deleteUser);

export { userRoutes };
