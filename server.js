const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoutes = require('./routes/product.route.js');
const app = express();

const PORT = process.env.PORT || 3000;

//Use the express.json() method to parse incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

//Connect to MongoDB
mongoose.connect('mongodb+srv://George:KPAKy9QPjx08sA8j@backenddb.bwofx.mongodb.net/Node-API')
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => {
    console.log('Error: ', err.message);
});