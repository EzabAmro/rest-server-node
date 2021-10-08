const {request, response} = require("express");
const {ObjectId} = require("mongoose").Types;

const {
    User,
    Product,
    Category,
    Role
} = require("../models");

const validCollections = [
    "category",
    "product",
    "role",
    "user",
];

const searchCategories = async(term = "", res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const categoryById = await Category.findById(term).populate("user", "name");
        return res.json(
            {
                ok: true,
                result: (categoryById) ? [categoryById] : []
            }
        );
    }
    const regex = new RegExp(term, "i");
    const categoryByKeyTerm = await Category.find({name: regex, state: true}).populate("user", "name");
    res.json(
        {
            ok: true,
            result: categoryByKeyTerm
        }
    );
}


const searchProduct = async(term = "", res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const productById = await Product.findById(term).populate("user", "name").populate("category", "name");
        return res.json(
            {
                ok: true,
                result: (productById) ? [productById] : []
            }
        );
    }
    const regex = new RegExp(term, "i");
    const productByKeyTerm = await Product.find({name: regex, state: true}).populate("user", "name").populate("category", "name");
    res.json(
        {
            ok: true,
            result: productByKeyTerm
        }
    );
}


const searchRole = async(term = "", res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const roleById = await Role.findById(term);
        return res.json(
            {
                ok: true,
                result: (roleById) ? [roleById] : []
            }
        );
    }
    const regex = new RegExp(term, "i");
    const productByKeyTerm = await Role.find({role: regex, state: true});
    res.json(
        {
            ok: true,
            result: productByKeyTerm
        }
    );
}

const searchUsers = async(term = "", res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const userById = await User.findById(term);
        return res.json(
            {
                ok: true,
                result: (userById) ? [userById] : []
            }
        );
    }
    // Expresion regular para busquedas insensibles "i" a mayusculas y minusculas
    const regex = new RegExp(term, "i");
    console.log(`${regex}`.red);
    //const userByName = await User.find({name: regex});
    const userByKeyTerm = await User.find(
        {
            $or: [{name: regex}, {email: regex}],
            $and: [{state: true}]
        }
    );
    res.json(
        {
            ok: true,
            result: userByKeyTerm
        }
    );
}

const search = (req = request, res = response) => {
    const {collection, term} = req.params;

    if (!validCollections.includes(collection)) return res.status(400).json(
        {
            ok: false,
            msg: `Valid collections are ${validCollections}`
        }
    );

    switch(collection) {
        case "category":
            searchCategories(term, res);
        break;
        case "product":
            searchProduct(term, res);
        break;
        case "role":
            searchRole(term, res);
        break;
        case "user":
            searchUsers(term, res);
        break;
        default:
            res.status(500).json(
                {
                    ok: false,
                    msg: "This search is not available"
                }
            );

    }

   /*  res.json(
        {
            collection,
            term
        }
    ); */
}



module.exports = {
    search
}