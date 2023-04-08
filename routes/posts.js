const express = require('express');
const router = express.Router();
const passport = require('passport'); // for checking user authentication 

const postsController = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthentication, postsController.create); // so that anyone cannot post with html

router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy);

module.exports = router;