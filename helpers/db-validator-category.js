const Category = require("../models/category");


const existCategory = async (id) => {
    if (id) {
        const categoryExist = await Category.findById(id);
        if (!categoryExist) throw new Error(`Category with id ${id} doesn't exists`);
    }
};


const categoryValid = async (name = "") => {
    const queryName = name.toUpperCase();
    const categoryByName = await Category.findOne({ name: queryName });
    if (categoryByName) throw new Error(`A category with name ${name} already exists`);
}

module.exports = {
    existCategory,
    categoryValid
}
