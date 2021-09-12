const {request, response} = require('express');

const getUsers = (req = request, res = response) => {
    res.json({
        ok: true,
        message: "Get API from controller"
    });
}

const postUsers = (req = request, res = response) => {
    const dataBody = req.body;
    res.json({
        ok: true,
        message: "Post API from controller",
        dataBody
    }); 
}

const putUsers = (req = request, res = response) => {
    // Into req.params we will found the url params
    const {id} = req.params;
    res.json({
        ok: true,
        message: "Put API from controller",
        id
    });
}

const deleteUsers = (req = request, res = response) => {
    // Into req.query we will found the query params
    const queryParams = req.query;
    res.json({
        ok: true,
        message: "Delete API from controller",
        queryParams
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
    pageNotFound
};



















