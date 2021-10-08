const {Router} = require("express");

const {
    search
} = require("../controllers/searchs.controller");

const router = Router();

router.get("/:collection/:term", search);



module.exports = router;