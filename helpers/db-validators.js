const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') => {
    if (role != '') {
        const existRole = await Role.findOne({role});
        if (!existRole) throw new Error(`The role ${role} is a not valid role`);
    }
}

const existEmail = async(email = '') => {
    // Verify if the email already exist
    const emailExist = await User.findOne({email});
    if (emailExist) throw new Error(`The email ${email} already exists`);
    /* if (emailExist) return res.status(400).json(
        {
            ok: false,
            message: `The email ${email} already exist`
        }
    ); */
}

const notExistEmail = async(email) => {
    const emailExist = await User.findOne({email});
    if (!emailExist) throw new Error(`User with the email: ${email} doesn't exists`);
}

const existUser = async(id) => {
    //const userExist = await User.findOne({_id: id});
    const userExist = await User.findById(id);
    if (!userExist) throw new Error(`There is no user with id: ${id}`);
}


module.exports = {
    isValidRole,
    existEmail,
    existUser,
    notExistEmail
}






