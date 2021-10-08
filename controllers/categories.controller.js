const {request, response, json} = require("express");
const {Category} = require("../models");

const getCategories = async(req = request, res = response) => {

    const {limit = 5, from = 0} = req.query;
    const queryRule = {state: true};

    const [total, categories] = await Promise.all(
        [
            Category.countDocuments(queryRule),
            Category.find(queryRule)
                .limit(limit)
                .skip(from)
                .populate("user", "name")
        ]
    );

    res.json(
        {
            ok: true, 
            total,
            categories
        }
    );

};   


const getCategoriesById = async(req = request, res = response) => {

    const {id} = req.params;

    const category = await Category.findById(id).populate("user", "name");

    res.json(
        {
            ok: true, 
            category
        }
    );

}


const createCategory = async(req = request, res = response) => {
    const name = req.body.name.toUpperCase();

    const existCategory = await Category.findOne({name});
    if(existCategory) return res.status(400).json(
        {
            ok: false,
            msg: `Category ${existCategory.name} already exists`
        }
    );

    const dataCategory = {
        name,
        user: req.userAuth._id
    };

    const category = new Category(dataCategory);
    await category.save();

    res.json(
        {
            ok: true,
            category
        }
    );

}

const updateCategory = async(req = request, res = response) => {
    const {id} = req.params;
    const name = req.body.name.toUpperCase();

    const dataCategory = {
        name,
        user: req.userAuth._id
    };

    const categoryDB = await Category.findByIdAndUpdate(id, dataCategory, {new: true}/*Este ultimo argumento hace que se retorne como queda el documento ya actualizado*/);

    res.json(
        {
            ok: true,
            categoryDB
        }
    );
}

const deleteCategory = async(req = request, res = response) => {
    const {id} = req.params;
    const category = await Category.findByIdAndUpdate(id, {state: false}, {new: true});
    
    res.json(
        {
            ok: true,
            category
        }
    );
}


module.exports = {
    createCategory,
    getCategories,
    getCategoriesById,
    updateCategory,
    deleteCategory
};