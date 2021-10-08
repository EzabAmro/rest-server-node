const {Router} = require("express");
const {check} = require("express-validator");

const {
    validateFields
} = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
    createCategory,
    getCategories,
    getCategoriesById,
    updateCategory,
    deleteCategory
} = require("../controllers/categories.controller");
const {
    existCategory,
    categoryValid
} = require("../helpers/db-validator-category");
const {
    isAdminRole
} = require("../middlewares/validate-role");

const router = Router();

// Get categories PUBLIC
router.get("/", getCategories);


// Get category by id PUBLIC
router.get("/:id", [
    check("id", "Not is a valid ID").isMongoId(),
    check("id").custom(existCategory),
    validateFields
], getCategoriesById);

// Post create categorie PRIVATE - need jwt (all roles)
router.post("/", [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    validateFields
], createCategory);


// Put update category by id PRIVATE - need jwt (all roles)
router.put("/:id", [
    validateJWT,
    check("id", "Not is a valid ID").isMongoId(),
    check("id").custom(existCategory),
    check("name", "New name is required").not().isEmpty(),
    check("name").custom(categoryValid),
    validateFields
], updateCategory);


// Delete '' category by id PRIVATE - need jwt (only admin role)
router.delete("/:id", [
    validateJWT,
    isAdminRole,
    check("id", "Not is a valid ID").isMongoId(),
    check("id").custom(existCategory),
    validateFields
], deleteCategory);



module.exports = router;









