const express = require("express");
const { logInUser, createUser, checkUser, logOut } = require("../controller/Auth");
const router = express.Router();
const passport = require('passport');

router
  .post("/signup", createUser)
  .post("/login",  passport.authenticate('local'), logInUser)
  .get("/check", passport.authenticate('jwt'), checkUser)
  .post('/logout', logOut);

exports.router = router;
