import { Router } from 'express';
import { UploadActivity } from '../../../utils/constant';
import { deleteFile } from '../../../utils/utils';
import * as userController from './userController';

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
 *    HTTP/1.1 401 FAILED {
 *      "message" : "Token expired"
 *    }
 */
userRoutes
  .get('/me',
       (req: any, res) => {
         return res.status(SUCCESS_RESPONSE).json({
           message: 'Authenticate success',
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
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK {
 *      "body": {
 *        "name": "dito",
 *        "username": "dito",
 *        "email": "ditohafizh@gmail.com",
 *        "password": "$2b$10$mWcBjk6cbpTD99LrZa//lu2Bsv1Uox/sCbCx7TI9NZsA.HzVyhREq",
 *        "userOriginalProfile": null
 *      }
 *      "message" : "User has been saved",
 *      "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOTBkYTRkMmUzNj
 *      VlNDIwMjczMTE1ZiIsIm5hbWUiOiJkaXRvIiwiaWF0IjoxNTUyOTk2OTQyLCJleHAiOjE1NTMw
 *      ODMzNDJ9.8wNFi061cTzOx7IH811urfFa9ME_7AQaQ8LaMxbKsuw"
 *    }
 * @apiErrorExample {json} Form not completed
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Please fill the form"
 *    }
 * @apiErrorExample {json} Error in Saving to Database
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Failed saving to MongoDB"
 *    }
 * @apiErrorExample {json} Just support for file (jpg|jpeg|png|gif)
 *    HTTP/1.1 400 FAILED {
 *      "message" : "File that you upload is not supported"
 *    }
 */
userRoutes
  .post('/create',
        upload.single('userOriginalProfile'),
        userController.addUser);

/**
 * @api {post} /user/upload Upload Photo Profile
 * @apiHeader {string} Authorization Bearer
 * @apiGroup User
 * @apiParam {string} userOriginalProfile Image Profile
 * @apiParamExample {json} Input
 *    {
 *      "userOriginalProfile": "Nicho_SmartCard.jpg"
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
 *    HTTP/1.1 401 FAILED {
 *      "message" : "Token expired"
 *    }
 * @apiErrorExample {json} Error Updating Profile
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Failed to update profile"
 *    }
 * @apiErrorExample {json} Just support for file (jpg|jpeg|png|gif)
 *    HTTP/1.1 400 FAILED {
 *      "message" : "File that you upload is not supported"
 *    }
 */
userRoutes
  .post('/upload',
        upload.single('userOriginalProfile'),
        async (req: any, res) => {
          userController.uploadProfile(req, res)
            .then((result) => {
              return res.status(SUCCESS_RESPONSE).json({
                data: {
                  user: result,
                },
                success: true,
              });
            })
            .catch((err) => {
              // delete uploaded image if failed
              // register
              if (req.file) {
                deleteFile(req.file.path)
                  .then(() => {
                    return res.status(SUCCESS_RESPONSE).json({
                      message: 'Profile image updated successfully',
                      success: true,
                    });
                  })
                  .catch((errChild) => {
                    return res.status(FAILED_RESPONSE).json({
                      message: 'Failed to update profile',
                      success: false,
                    });
                  });
              }

              return res.status(FAILED_RESPONSE).json({
                message: err,
                success: false,
              });
            });
        });

/**
 * @api {post} /user/login Login User
 * @apiGroup User
 * @apiParam {string} email Email
 * @apiParam {string} [username] Optional if email is not provided
 * @apiParam {string} password Password
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
userRoutes
  .post('/login', userController.getUser);

/**
 * @api {put} /user/update Update User
 * @apiHeader {string} Authorization Bearer
 * @apiGroup User
 * @apiParam {string} [newUsername] Optional New username to update
 * @apiParam {string} [newEmail] Optional New email to update
 * @apiParam {string} [newPassword] Optional New password to update
 * @apiParam {string} password Password (if not provided then will return error)
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
 *    HTTP/1.1 401 FAILED {
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
userRoutes
  .put('/update',
       userController.updateUser);

/**
 * @api {delete} /user/delete Delete User
 * @apiHeader {string} Authorization Bearer
 * @apiGroup User
 * @apiParam {string} password Password (if not provided then will return error)
 * @apiParamExample {json} Input
 *    {
 *      "password": "dito"
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
 *    HTTP/1.1 401 FAILED {
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
userRoutes
  .delete('/delete',
          userController.deleteUser);
/**
 * @api {get} /user/readAll Get all Users
 * @apiGroup User
 */
userRoutes
  .get('/readAll',
       userController.getUserAll);

export { userRoutes };
