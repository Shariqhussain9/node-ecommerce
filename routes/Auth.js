const express = require('express');
const { loginUser, createUser } = require('../controller/Auth');
const router = express.Router();

router.post('/signup', createUser)
        .post('/login', loginUser);

exports.router =  router;