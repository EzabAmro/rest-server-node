const {request, response} = require('express');
const bcryptjs = require('bcryptjs');
//const { validationResult } = require('express-validator');

const User = require('../models/user');


const getUserByEmail = async(req = request, res = response) => {
    const email = req.query;

    const dataUser = await User.findOne(email);

    res.json(
        {
            ok: true,
            message: 'Get Api user by email from controller',
            dataUser
        }
    );
}

const getUsers = async(req = request, res = response) => {

    const {limit = 5, from = 0} = req.query;
    const queryRule = {state: true};

    /* const users = await User.find(queryRule)
        .limit(Number(limit))
        .skip(Number(from));

    const total = await User.countDocuments(queryRule); */

    /* 
        Promise.all() recibe un arreglo de promesas, este nos sirve
        para ejecutar multiples tareas asincronas en paralelo,
        ya que de por si los metodos que ejecutamos del modelo 
        devuelven promesas
    */
   const [total, users] = await Promise.all([
        User.countDocuments(queryRule),
        User.find(queryRule)
            .limit(Number(limit))
            .skip(Number(from))
    ]);

    res.json({
        ok: true,
        message: "Get API from controller",
        total,
        users
    });
}

const postUsers = async(req = request, res = response) => {

    const {name, email, password, role} = req.body;

    const user = new User({
        name, 
        email, 
        password, 
        role
    });

    // Encrypt the password
    /* 
        salt define the number of turns to encrypt the data,
        in the arguments we can send that number, the bigger
        it is, the safer it will be, but the process will take
        longer, by default this have 10 turns
    */
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);


    // Save in database
    await user.save();
    
    res.json({
        ok: true,
        message: "Post API from controller",
        user
    }); 
}

const putUsers = async(req = request, res = response) => {
    // Into req.params we will found the url params
    const {id} = req.params;
    const {password, google, email, _id, ...dataBody} = req.body;

    if (password) {
        //Encrypt the password
        const salt = bcryptjs.genSaltSync();
        dataBody.password = bcryptjs.hashSync(password, salt);
    }
    // validate


    const userDB = await User.findByIdAndUpdate(id, dataBody);

    res.json({
        ok: true,
        message: "Put API from controller",
        userDB
    });
}

const deleteUsers = async(req = request, res = response) => {
    // Into req.query we will found the query params
    const {id} = req.params;

    const userAuth = req.userAuth;

    // Physical elimination
    //const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {state: false});

    res.json({
        ok: true,
        message: "Delete API from controller",
        user,
        userAuth
    });
}


const pageNotFound = (req = request, res = response) => {
    res.sendFile('/home/nicolas/Documents/web development/Node/07-rest-server/public/404.html');
}



module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers,
    pageNotFound,
    getUserByEmail
};



















