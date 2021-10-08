const jwt = require('jsonwebtoken');
const {request, response} = require('express');

const User = require('../models/user');


const validateJWT = async(req = request, res = response, next) => {
    
    const token = req.header('x-token');
    // codigo 401 unauthorize
    if (!token) return res.status(401).json(
            {
                msg: 'There is not any jwt in the request'
            }
    );
    

    try {
        const {uid} = jwt.verify(token, process.env.SECRET_KEY);
        const userAuth = await User.findById(uid);

        if (!userAuth) return res.status(401).json(
            {
                ok: false,
                msg: "Invalid token - The user doesn't exists" 
            }
        );


        // Verify if the logged user there is not deleted {state: false}
        if (!userAuth.state) return res.status(401).json(
            {
                ok: false,
                msg: 'Invalid token - The user is already deleted'
            }
        );
        req.userAuth = userAuth;

        next();
    } catch (error) {
        console.log('Error ->', error);
        res.status(401).json(
            {
                ok: false,
                msg: 'Invalid token'
            }
        );
    }

}
// la funcion next permite que el flujo de la peticion continue



module.exports = {
    validateJWT
}