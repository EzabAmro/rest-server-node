const {request, response} = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');


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

const googleSignIn = async(req = request, res = response) => {

    const {id_token} = req.body;

    try {
        const googleUser = await googleVerify(id_token);
        console.log(googleUser);

        let user = await User.findOne({email: googleUser.email});

        if (!user) {
            const data = { 
                name: googleUser.name,
                email: googleUser.email,
                password: 'contraseña',
                image: googleUser.image,
                google: true
            };
            user = new User(data);
            await user.save();
        }

        if (!user.state) {
            return res.status(401).json(
                {
                    ok: false,
                    msg: 'User deleted or inactive, Communicate with the server administrator'
                }
            );
        }

        // Generate the JWT
        const token = await generateJWT(user._id);

        res.json(
            {
                ok: true,
                user,
                token
            }
        ); 
    } catch (error) {
        console.log(`Error -> ${error}`);
        res.status(400).json(
            {
                ok: false,
                msg: "Google id token invalid"
            }
        );
    }


}

module.exports = {
    login,
    googleSignIn
}











