const Products = require('../models/productModel');

const createProduct = async (req, res) => {
    const newProduct = new Products(req.body);
    const product = await newProduct.save();
    res.status(201).json(product);
}

const fetchAllProducts = async (req, res) => {
    try {
        let query = {};
        let condition = req.query.admin ? {} : { deleted: {$ne: true}} ;

        // Constructing the query based on query parameters
        if(req.query.category) query.category = req.query.category;
        if(req.query.brand) query.brand = req.query.brand;

        // Sorting
        let sort = {};
        if(req.query._sort && req.query._order) {
            sort[req.query._sort] = req.query._order === 'asc' ? 1 : -1;
        }

        // Counting total documents
        const totalItems = await Products.find(condition)
                                         .countDocuments(query);

        // Pagination
        let page = parseInt(req.query._page) || 1;
        let limit = parseInt(req.query._limit) || 10;
        let skip = (page - 1) * limit;
        
        const data = await Products.find(condition)
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

const fetchProductById = async (req, res) => {
    const {id} = req.params;
    try{
        const product = await Products.findById(req.params.id);
        res.status(200).json(product);
    }catch(err) {
        res.status(400).json(err);
    }
}

const updateProduct = async (req, res) => {
    const {id} = req.params;
    try{
        const result = await Products.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(result);
    }catch(err){
        res.status(400).json(err);
    }
}

const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try{
        const result = await Products.findByIdAndUpdate(id, {deleted: true}, {new: true});
       
        res.status(200).json(result);
    }catch(err){
        res.status(400).json(err);
    }
}

module.exports = { createProduct, fetchAllProducts, fetchProductById, updateProduct, deleteProduct };