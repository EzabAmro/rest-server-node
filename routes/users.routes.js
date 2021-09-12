const {Router} =  require('express');
const router = Router();

const {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers,
    pageNotFound
} = require('../controllers/users.controller');

/* 
router.app.get('/hello-world', (req, res) => {
    // With .send we send text plain
    res.send("Hello world");
}); */

// MAIN ENDPOINTS

router.get('/', getUsers);

router.put('/:id', putUsers);

router.post('/', postUsers);

router.delete('/', deleteUsers);

router.get('*', pageNotFound);


module.exports = router;







