const express = require('express');
const ProductRouter = require('./routes/ProductRouter');
const BrandsRouter = require('./routes/BrandsRouter');
const CategoryRouter = require('./routes/CategoryRouter');
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

app.listen(PORT, () => {
    console.log(`Server is started at port #${PORT}`);
})
