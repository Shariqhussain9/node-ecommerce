const Users = require("../models/userModel");

exports.fetchUserById = async (req, res) => {
    const id = req.params.id;
    console.log("id", id);

    try{
        const user = await Users.findById(id);
        res.status(200).json(user);
    }catch(err){
        res.status(400).json(err)
    }
};

exports.updateUser = async (req, res) => {
    const {id} = req.params.id;
    try{
        const user = await Users.findByIdAndUpdate(id, req.body, { new: true});
        res.status(200).json(user);
    }catch(err){
        res.status(400).json(err);
    }
}