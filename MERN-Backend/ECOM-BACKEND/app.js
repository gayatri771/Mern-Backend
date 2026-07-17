const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connection = require('./config/db');
const limiter = require('./middlewares/ratelimit');
const productroutes = require('./routes/productRoutes');
const authroutes = require('./routes/authroutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(limiter);

app.use('/products', productroutes);
app.use('/auth', authroutes);

app.listen(port, () => {
  console.log(`the server is running on ${port}`);
  connection();
});
