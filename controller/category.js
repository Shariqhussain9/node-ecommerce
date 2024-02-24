const Category = require("../models/categoryModel");

exports.fetchCategories = async (req, res) => {
    try{
        const category = await Category.find({}).exec();
        res.status(200).json(category);

    }catch(err){
        res.status(400).json(err)
    }
}

exports.createCategory = async (req, res) => {
    try{
        const category = new Category(req.body)
        const doc = await category.save();
        res.status(200).json(doc);

    }catch(err){
        res.status(400).json(err)
    }
}