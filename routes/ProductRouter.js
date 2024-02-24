const express = require('express');
const router = express.Router();
const { createProduct, fetchAllProducts, fetchProductById }  = require('../controller/product');


router.post('/', createProduct)
        .get('/', fetchAllProducts)
        .get('/:id', fetchProductById);

exports.router =  router;