**Use Cases of Using REST API**

### Tech Stacks
* Node.js
* Express
* Mongoose
* Atlas Cloud Mongodb

## Road Map Activity
####Basic CRUD (done)
Include:
* Create Histories
* Update Histories
* Read Histories
* Delete Histories

Check out the README for short introduction [here](list_readme/1_basic_crud/README.md)

####Filesystem, JWT, & Bcrypt (done)
Include:
* Create users with automatically saving token to request
* Check out the token with route `/me`
* Upload the image profile to replace existing profile in user. The flow is: `verifyToken - deleteExistingImageProfile - uploadNewImageProfile`
* Delete the user then automatically delete the image and move it to the backup folder

The README is on progress. Check out the `./src` folder with routes and controllers inside them to know more 

 

