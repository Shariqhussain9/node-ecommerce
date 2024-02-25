const Orders = require("../models/orderModel");

const createOrder = async (req, res) => {
    const order = new Orders(req.body);
    console.log(order);
    try {
        const doc = await order.save();
        res.status(200).json(doc);

    }catch(err){
        res.status(400).json(err);
    }

}

const fetchOrderByUser = async (req, res) => {
    const { id } = req.params;
    try {
        const orders = await Orders.find({ user: id });
        res.status(200).json(orders)

    }catch(err){
        res.status(400).json(err);
    }
}

const updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const orders = await Orders.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(orders)

    }catch(err){
        res.status(400).json(err);
    }
}

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const orders = await Orders.findByIdAndDelete(id);
        res.status(200).json(orders)

    }catch(err){
        res.status(400).json(err);
    }
}

module.exports = { 
    createOrder,
    fetchOrderByUser,
    updateOrder,
    deleteOrder
}