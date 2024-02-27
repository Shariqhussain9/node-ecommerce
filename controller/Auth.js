const Users = require("../models/userModel")
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
                res.status(201).json(token);
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
    console.log(req.user);
    res.json(req.user);
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

module.exports = { createUser, logInUser, checkUser}