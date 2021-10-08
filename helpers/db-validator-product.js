const Product = require("../models/product");


const existProduct = async (id) => {
    const product = await Product.findById(id);
    if (!product) throw new Error(`Product with id ${id} doesn't exists`);
}

const nameProductValid = async (name) => {
    if (name) {
        const queryName = name.toUpperCase();
        const productByName = await Product.findOne({ name: queryName });
        if (productByName) throw new Error(`Product with name ${name} already exists`);
    }
}

const priceValid = async (price = 0) => {
    if (price < 0) throw new Error("Price don't must be less than 0");
}

module.exports = {
    existProduct,
    priceValid,
    nameProductValid
}