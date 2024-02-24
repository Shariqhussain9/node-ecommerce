const Products = require('../models/productModel');

const createProduct = (req, res) => {
    console.log(req.body);
    const newProduct = new Products(req.body);
    newProduct.save();
    res.status(201).json({"message": "Your Product is Saved Successfully"});
}

const fetchAllProducts = async (req, res) => {
    try {
        let query = {};

        // Constructing the query based on query parameters
        if(req.query.category) query.category = req.query.category;
        if(req.query.brand) query.brand = req.query.brand;

        // Sorting
        let sort = {};
        if(req.query._sort && req.query._order) {
            sort[req.query._sort] = req.query._order === 'asc' ? 1 : -1;
        }

        // Counting total documents
        const totalDocs = await Products.countDocuments(query);

        // Pagination
        let page = parseInt(req.query._page) || 1;
        let limit = parseInt(req.query._limit) || 10;
        let skip = (page - 1) * limit;

        const docs = await Products.find(query)
                                    .sort(sort)
                                    .skip(skip)
                                    .limit(limit)
                                    .exec();

        res.status(200).json({ data, items: totalDocs });
    } catch (err) {
        console.log("error", err);
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


module.exports = { createProduct, fetchAllProducts, fetchProductById };