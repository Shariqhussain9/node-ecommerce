const Brands = require("../models/brandsModel")

exports.fetchBrands = async (req, res) => {
    try{
        const brands = await Brands.find({}).exec();
        res.status(200).json(brands);

    }catch(err){
        res.status(400).json(err)
    }
}

exports.createBrand = async (req, res) => {
    try{
        const brand = new Brands(req.body)
        const doc = await brand.save();
        res.status(200).json(doc);

    }catch(err){
        res.status(400).json(err)
    }
}