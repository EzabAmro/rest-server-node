const {Schema, model} = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'SELLS_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


userSchema.methods.toJSON = function() {
    const {__v, password, _id, ...dataUser} = this.toObject();
    dataUser.uid = _id;
    return dataUser;
}

module.exports = model('User', userSchema);