const Users = require("../models/userModel")

const createUser = async (req, res) => {
    console.log(req.body);
    const user = new Users(req.body);
    try{
        const doc = user.save();
        res.status(201).json(doc);
    }catch(err){
        res.status(400).json(err);
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    console.log(req.body);
    try {
        const user = await Users.findOne({ email: email}).exec();
        console.log(user);
        if(!user){
            console.log("No Such User");
            res.status(401).json({error: 'no such user exist'});
        }else if(user.password === password){
            res.status(200).json({id: user.id, email: user.email, name: user.name, addresses: user.addresses})
        }else{
            res.status(400).json({message: 'invalid credentials'});
        }

    }catch(err){
        req.status(400).json(err);
    }
}

module.exports = { createUser, loginUser}