const mongoose = require('mongoose');
require('colors');



const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_ATLAS);
        console.log('*******Database connection online*******'.green);
    } catch (error) {
        throw new Error(`Error at initializing the database -> ${error}`);
    }



}


module.exports = {
    dbConnection
};








