const express = require('express');
const router = express.Router();
const { createProduct, fetchAllProducts, fetchProductById, updateProduct, deleteProduct }  = require('../controller/product');


router.post('/', createProduct)
        .get('/', fetchAllProducts)
        .get('/:id', fetchProductById)
        .patch('/:id', updateProduct)
        .delete('/:id', deleteProduct);

exports.router =  router;