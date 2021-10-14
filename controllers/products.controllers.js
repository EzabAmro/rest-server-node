const {Product} = require("../models");
const {request, response} = require("express");

const getProducts = async(req = request, res = response) => {
    const {limit = 5, from = 0} = req.query;
    const queryRule = {state: true};

    const [total, products] = await Promise.all(
        [
            Product.countDocuments(queryRule),
            Product.find(queryRule)
                .limit(limit)
                .skip(from)
                .populate("category", "name")
                .populate("user", "name")
        ]
    );
    res.json(
        {
            ok: true,
            total,
            products
        }
    );
}

const getProductById = async(req = request, res = response) => {
    const {id} = req.params;
    const product = await Product.findById(id).populate("category", "name").populate("user", "name");

    res.json(
        {
            ok: true,
            product
        }
    );
}


const createProduct = async(req = request, res = response) => {
    const name = req.body.name.toUpperCase();
    const {price, category, description = ""} = req.body;
    
    const dataProduct = {
        name,
        price,
        category,
        description,
        user: req.userAuth._id
    }

    const product = new Product(dataProduct);
    await product.save();

    res.json(
        {
            ok: true,
            product
        }
    );
}

const updateProduct = async(req = request, res = response) => {
    const {id} = req.params;
    const {_id, state, available, ...data} = req.body;
    
    if (data.name) data.name = data.name.toUpperCase();
    data.user = req.userAuth._id;

    const product = await Product.findByIdAndUpdate(id, data, {new: true});

    res.json(
        {
            ok: true,
            product
        }
    );
    
}

const deleteProduct = async(req = request, res = response) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, {state: false}, {new: true});

    res.json(
        {
            ok: true,
            product
        }
    );
}


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}