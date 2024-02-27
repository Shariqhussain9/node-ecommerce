const Users = require("../models/userModel");

exports.fetchUserById = async (req, res) => {
    try{
        const user = await Users.findById(req.user.id);
        res.status(200).json({id: user.id, role: user.role, addresses: user.addresses, email: user.email});
    }catch(err){
        res.status(400).json(err)
    }
};

exports.updateUser = async (req, res) => {
    const {id} = req.params;
    try{
        const user = await Users.findByIdAndUpdate(id, req.body, { new: true});
        res.status(200).json(user);
    }catch(err){
        res.status(400).json(err);
    }
}