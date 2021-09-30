const {Router} = require('express');
const {check} = require('express-validator');


const {
    validateFields
} = require('../middlewares/validate-fields');
const {
    login,
    googleSignIn
} = require('../controllers/auth.controller');


const router = Router();



router.post('/login', [
    check('email', 'Invalid email').isEmail(),
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);


router.post('/google', [
    check('id_token', 'Google token id is required').not().isEmpty(),
    validateFields
], googleSignIn);



module.exports = router;








