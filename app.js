const express = require('express');
const ProductRouter = require('./routes/ProductRouter');
const BrandsRouter = require('./routes/BrandsRouter');
const CategoryRouter = require('./routes/CategoryRouter');
const UserRouter = require('./routes/Users');
const cartRouter = require('./routes/CartRouter');
const orderRouter = require('./routes/order');

const Auth = require('./routes/Auth');
const cors = require('cors');

const app = express();
const connect = require('./connection');


const PORT = 3000;

//use to connect DB
connect();

app.use(cors());
app.use(express.json()); //to parse Json req.body

app.use('/products', ProductRouter.router);
app.use('/brands', BrandsRouter.router)
app.use('/categories', CategoryRouter.router);
app.use('/users', UserRouter.router);
app.use('/auth', Auth.router);
app.use('/cart', cartRouter.router);
app.use('/orders', orderRouter.router);

app.listen(PORT, () => {
    console.log(`Server is started at port #${PORT}`);
})
