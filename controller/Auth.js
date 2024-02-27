const Users = require("../models/userModel");
const crypto = require('crypto');
const SECRET_KEY = 'SECRET_KEY';
const jwt = require('jsonwebtoken');
const { sanitizeUser } = require("../config/common");

const createUser = async (req, res) => {
    const user = new Users(req.body);
    try{
        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(
          req.body.password,
          salt,
          310000,
          32,
          'sha256',
          async function (err, hashedPassword) {
            const user = new Users({ ...req.body, password: hashedPassword, salt });
            const doc = await user.save();
    
            req.login(sanitizeUser(doc), (err) => {  // this also calls serializer and adds to session
              if (err) {
                res.status(400).json(err);
              } else {
                const token = jwt.sign(sanitizeUser(doc), SECRET_KEY);
                res.cookie('jwt', token, {
                  expires: new Date(Date.now() + 3600000),
                  httpOnly: true,
                })
                .status(201).json(token);
              }
            });
          }
        );
    }catch(err){
        res.status(400).json(err);
    }
}

const logInUser = async (req, res) => {
  try{

    res.cookie('jwt', req.user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true
    }).status(200)
    .json(req.user);
  }catch(err){
    res.json(err);
  }
    
}

const checkUser = async (req, res) => {
    try{
        res.json({status:'success',user: req.user});
    }catch(err){
        res.status(400).json(err);
    }
};

const logOut = async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Error logging out");
    }
    // Clear cookies
    res.clearCookie("jwt"); // Replace with the name of your cookie
    // Redirect or send response indicating successful logout
    res.redirect("/login"); // Redirect to login page, for example

  });
}

module.exports = { createUser, logInUser, checkUser, logOut}