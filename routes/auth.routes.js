const {Router} = require('express');
const {check} = require('express-validator');


const {
    validateFields
} = require('../middlewares/validate-fields');
const {
    login
} = require('../controllers/auth.controller');


const router = Router();



router.post('/login', [
    check('email', 'Invalid email').isEmail(),
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);











module.exports = router;








