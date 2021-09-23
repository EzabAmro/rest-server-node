const {request, response} = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');


const login = async(req = request, res = response) => {
    
    const {
        email,
        password
    } = req.body;

    try {
        // Verify if the email already exists
        const user = await User.findOne({email});
        if (!user) return res.status(400).json(
            {
                ok: false,
                msg: 'User / Password incorrects - Email'
            }
        );

        // Verify if the user is active
        if (!user.state) return res.status(400).json(
            {
                ok: false,
                msg: `User / Password incorrects - User inactive`
            }
        );

        // Verify the password
        const validPassword = bcryptjs.compareSync(
            password, user.password
        );

        if (!validPassword) return res.status(400).json(
            {
                ok: false,
                msg: `User / Password incorrects - Password`
            }
        );

        // Generate the JWT
        const token = await generateJWT(user._id);

        res.json(
            {
                ok: true,
                msg: 'login ok',
                user,
                token
            }
        );
    } catch (error) {
        console.log(`Error -> ${error}`);
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong'
        });
    }
    
}



module.exports = {
    login
}











