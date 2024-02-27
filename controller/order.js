const Orders = require("../models/orderModel");

const createOrder = async (req, res) => {
    const order = new Orders(req.body);
    console.log(req.body);
    try {
        const doc = await order.save();
        res.status(200).json(doc);

    }catch(err){
        console.log(err);
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

const fetchAllOrder = async (req, res) => {
    try {
        let query = {};
        // let condition = req.query.admin ? {} : { deleted: {$ne: true}} ;

        // Constructing the query based on query parameters
        // if(req.query.category) query.category = req.query.category;
        // if(req.query.brand) query.brand = req.query.brand;

        // Sorting
        let sort = {};
        if(req.query._sort && req.query._order) {
            sort[req.query._sort] = req.query._order === 'asc' ? 1 : -1;
        }

        // Counting total documents
        const totalItems = await Orders
                                         .countDocuments(query);

        // Pagination
        let page = parseInt(req.query._page) || 1;
        let limit = parseInt(req.query._limit) || 10;
        let skip = (page - 1) * limit;
        
        const data = await Orders
                                    .find(query)
                                    .sort(sort)
                                    .skip(skip)
                                    .limit(limit)
                                    
                                    .exec();

        res.status(200).json({data, totalItems});
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = { 
    createOrder,
    fetchOrderByUser,
    updateOrder,
    deleteOrder,
    fetchAllOrder
}