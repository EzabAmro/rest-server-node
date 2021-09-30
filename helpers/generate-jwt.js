const jwt = require('jsonwebtoken');


const generateJWT = (uid = '') => {
    return new Promise(
        (resolve, reject) => {
            const payload = {uid};
            jwt.sign(
                payload, 
                process.env.SECRET_KEY, 
                {
                    expiresIn: '1h'
                }, 
                (error, token) => {
                    if (error) {
                        console.log(`Error -> ${error}`);
                        reject("It wasn't possible generate the JWT");
                    } else resolve(token);
                }
            );
        }
    );
};






module.exports = {
    generateJWT
}











