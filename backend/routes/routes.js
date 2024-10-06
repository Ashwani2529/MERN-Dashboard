const express = require('express');
const { verifyUser } = require('../middleware/verifyUser');
const userController = require("../controllers/user.controller");

const routes = express.Router();

// Routes for user
routes.route('/register').post(userController.signUp);
routes.route('/login').post(userController.login);
routes.route('/profile').get(verifyUser, userController.getUser);
routes.route('/update').put(verifyUser, userController.updateUser);

// Routes for file upload and fetching
routes.route('/upload').post(verifyUser,userController.uploadFile);
routes.route('/posts').get(verifyUser,userController.getPosts);
routes.route('/allPosts').get(userController.getAllPosts);
module.exports = routes;