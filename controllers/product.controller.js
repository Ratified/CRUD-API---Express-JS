const Product = require('../models/product.model.js');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const getProduct = async(req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        if(product)
            res.status(200).json(product);
        else
            res.status(404).send({ message: 'Product not found' });
    } catch(error){
        res.status(500).send({ message: error.message });
    }
}

const createProduct = async (req, res) => {
    try{
        // const product = new Product({
        //     name : req.body.name,
        //     quantity : req.body.quantity,
        //     price : req.body.price,
        //     image : req.body.image
        // })

        // product.save();
        // res.send(product);
        const product = await Product.create(req.body);
        res.status(201).send(product);
    } catch(error){
        res.status(500).send({ message: error.message });
    }
}

const updateProduct = async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        if(!product){
            res.status(404).send({ message: 'Product not found' });
        } else {
            product.name = req.body.name;
            product.quantity = req.body.quantity;
            product.price = req.body.price;
            product.image = req.body.image;
            await product.save();
            res.status(200).send(product);
        }
    } catch (error){
        res.status(500).send({ message: error.message });
    }
}

const deleteProduct = async(req, res) => {
    try{ 
        const { id } = req.params;
        const product = await Product.findByIdandDelete(id);
        if(product)
            res.status(200).send({ message: 'Product deleted successfully' });
        else
            res.status(404).send({ message: 'Product not found' });
    } catch(error)
    {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}