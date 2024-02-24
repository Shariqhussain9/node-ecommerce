const Carts = require("../models/cartModel");

const addToCart = async (req, res)=> {
    const cart = new Carts(req.body);
    try{
        const doc = await cart.save();
        const result = await doc.populate('product');
        res.status(201).json(result);
    }catch(err){
        res.status(400).json(err);
    }
}

const fetchCartByUser = async (req, res)=> {
    const {user}= req.query;
    try{
        const cartItems = await Carts.find({ user: user}).populate('product');
        res.status(200).json(cartItems);

    }catch(err){
        res.status(400).json(err);
    }
}

const updateCart = async (req, res)=> {
    
}

const deleteFromCart = async (req, res)=> {
    const {id} = req.params;
    try {
        const doc = await Carts.findByIdAndDelete(id);
        res.status(200).json(doc)
    }catch(err){
        res.status(400).json(err);
    }

}

module.exports = { 
    addToCart,
    fetchCartByUser,
    updateCart,
    deleteFromCart
}