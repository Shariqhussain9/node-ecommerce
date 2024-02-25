const express = require('express');
const { fetchOrderByUser, createOrder, updateOrder, deleteOrder } = require('../controller/order');
const router = express.Router();

router.get('/:id', fetchOrderByUser)
        .post('/', createOrder)
        .patch('/:id', updateOrder)
        .delete('/:id', deleteOrder);

exports.router =  router;