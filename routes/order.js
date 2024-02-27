const express = require('express');
const { fetchOrderByUser, createOrder, updateOrder, deleteOrder, fetchAllOrder } = require('../controller/order');
const router = express.Router();

router.get('/:id', fetchOrderByUser)
        .post('/', createOrder)
        .patch('/:id', updateOrder)
        .delete('/:id', deleteOrder)
        .get("/", fetchAllOrder);

exports.router =  router;