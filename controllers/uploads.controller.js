const path = require("path");
const fs = require("fs");

const { request, response } = require("express");
const {loadFile} = require("../helpers");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const  {User, Product} = require("../models");

const validExtensions = [
    "png",
    "jpg",
    "jpeg",
    "gif"
]; 

const uploadFile = async(req = request, res = response) => {

    try {
        const name = await loadFile(
            req.files,
            validExtensions,
            "documents"
        );
        res.json(
            {
                ok: true,
                name
            }
        );
    } catch (msg) {
        res.status(400).json(
            {
                ok: false,
                msg
            }
        );
    }
}


const updateImage = async(req = request, res = response) => {
    const {collection, id} = req.params;

    let model;

    switch(collection) {
        case "users":
            model = await User.findById(id);
            if (!model) return res.status(400).json(
                {
                    ok: false,
                    msg: `User with id ${id} not found`
                }
            );
        break;
        case "products":
            model = await Product.findById(id);
            if (!model) return res.status(400).json(
                {
                    ok: false,
                    msg: `Product with id ${id} not found`
                }
            );
        break;
        default:
            return res.status(500).jscon(
                {
                    ok: false,
                    msg: `The collection ${collection} it's not taken`
                }
            );
    }

    // delete previous images
    if (model.image) {
        // Delete image from server
        const pathImage = path.join(__dirname, "../uploads", collection, model.image);
        if (fs.existsSync(pathImage)) fs.unlinkSync(pathImage);
    }

    try {
        model.image = await loadFile(
            req.files,
            validExtensions,
            collection
        );    
    } catch (error) {
        return res.status(400).json(
            {
                ok: false,
                error
            }
        );
    }
    await model.save();

    res.json(
        {
            ok: true, 
            model
        }
    );
}

const updateImageCloudinary = async(req = request, res = response) => {
    const {collection, id} = req.params;

    let model;

    switch(collection) {
        case "users":
            model = await User.findById(id);
            if (!model) return res.status(400).json(
                {
                    ok: false,
                    msg: `User with id ${id} not found`
                }
            );
        break;
        case "products":
            model = await Product.findById(id);
            if (!model) return res.status(400).json(
                {
                    ok: false,
                    msg: `Product with id ${id} not found`
                }
            );
        break;
        default:
            return res.status(500).jscon(
                {
                    ok: false,
                    msg: `The collection ${collection} it's not taken`
                }
            );
    }

    const cutFileName = req.files.file.name.split(".");
    const extensionFile = cutFileName[cutFileName.length - 1];
    if (!validExtensions.includes(extensionFile)) return res.status(400).json(
        {
            ok: false,
            msg: `Invalid type of the extension ${extensionFile}, valid extensions: ${validExtensions}`
        }
    );

    // delete previous images in cloudinary
    if (model.image) {
        const cutNameImage = model.image.split("/");
        const nameImage = cutNameImage[cutNameImage.length - 1];
        const [idImage, ...extensions] = nameImage.split(".");
        await cloudinary.uploader.destroy(idImage);
    }


    const {tempFilePath} = req.files.file;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);

    model.image = secure_url;
    await model.save();

    res.json(
        {
            ok: true, 
            model
        }
    ); 
}

const responseImage = async(req = request, res = response) => {
    const {collection, id} = req.params;

    let model;

    switch(collection) {
        case "users":
            model = await User.findById(id);
            if (!model) return res.status(400).json(
                {
                    ok: false,
                    msg: `User with id ${id} not found`
                }
            );
        break;
        case "products":
            model = await Product.findById(id);
            if (!model) return res.status(400).json(
                {
                    ok: false,
                    msg: `Product with id ${id} not found`
                }
            );
        break;
        default:
            return res.status(500).jscon(
                {
                    ok: false,
                    msg: `The collection ${collection} it's not taken`
                }
            );
    }

    // delete previous images
    if (model.image) {
        // Delete image from server
        const pathImage = path.join(__dirname, "../uploads", collection, model.image);
        if (fs.existsSync(pathImage)) return res.sendFile(pathImage);
    }

    /* res.json(
        {
            ok: true,
            msg: `Elment with id ${id} don't have image`
        }
    ); */
    const pathImageNotFound = path.join(__dirname, "../assets/image-not-found.png");
    res.sendFile(pathImageNotFound);
}

module.exports = {
    uploadFile,
    updateImage,
    responseImage,
    updateImageCloudinary
}