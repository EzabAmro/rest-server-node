const {Router} =  require('express');
const {check} = require('express-validator');
const router = Router();

const {
    validateFields
} = require('../middlewares/validate-fields');
const {
    validateJWT
} = require('../middlewares/validate-jwt');
const {
    isAdminRole,
    haveRole
} = require('../middlewares/validate-role');

const {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers,
    pageNotFound,
    getUserByEmail
} = require('../controllers/users.controller');
const {
    isValidRole,
    existEmail,
    notExistEmail,
    existUser
} = require('../helpers/db-validators-user');

/* 
router.app.get('/hello-world', (req, res) => {
    // With .send we send text plain
    res.send("Hello world");
}); */

// MAIN ENDPOINTS

router.get('/', getUsers);

router.get('/user', [
    check('email', 'Invalid email').isEmail(),
    check('email').custom(notExistEmail),
    validateFields
], getUserByEmail);

router.put('/:id', [
    check('id', 'Not is a valid ID').isMongoId(),
    //check('id').custom(id => existUser(id)),
    check('id').custom(existUser),
    check('role').custom(isValidRole),
    validateFields
], putUsers);

router.post('/', [
    // Middlewares to validate the data
    check('name', "Name don't must be empty").not().isEmpty(),
    check('password', "Password must be longer than 6 letters").isLength({min: 6}),
    check('email', 'Invalid email').isEmail(),
    check('email').custom(existEmail),
    //check('role', 'This is a invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    validateFields
], postUsers);

router.delete('/:id', [
    // validamos el jwt de primero antes de validar los demas aspectos
    validateJWT,
    //isAdminRole,
    haveRole('ADMIN_ROLE', 'SELLS_ROLE'),
    check('id', 'Not is a valid ID').isMongoId(),
    //check('id').custom(id => existUser(id)),
    check('id').custom(existUser),
    validateFields
], deleteUsers);

router.get('*', pageNotFound);


module.exports = router;







 