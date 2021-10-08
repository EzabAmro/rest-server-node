const {Router} = require("express");
const {check} = require("express-validator");

const {
    validateFields
} = require("../middlewares/validate-fields");
const {
    existProduct,
    priceValid,
    nameProductValid
} = require("../helpers/db-validator-product");
const {
    existCategory
} = require("../helpers/db-validator-category");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/products.controllers");
const { isAdminRole } = require("../middlewares/validate-role");

const router = Router();

// GET consult all products
router.get("/", getProducts);

// GET consult product by id
router.get("/:id", [
    check("id", "Not is a valid ID").isMongoId(),
    check("id").custom(existProduct),
    validateFields
], getProductById);

// POST create product - need JWT (all roles)
router.post("/", [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    check("name").custom(nameProductValid),
    check("price").custom(priceValid),
    check("category", "Not is a valid category id").isMongoId(),
    check("category").custom(existCategory),
    validateFields
], createProduct);

// PUT update product by id - need JWT (all roles)
router.put("/:id", [
    validateJWT,
    check("id", "Not is a valid ID").isMongoId(),
    check("id").custom(existProduct),
    check("name").custom(nameProductValid),
    check("price").custom(priceValid),
    check("category").custom(existCategory),
    validateFields
], updateProduct);


// DELETE delete product by id - need JWT (only admin role)
router.delete("/:id", [
    validateJWT,
    isAdminRole,
    check("id", "Not is a valid ID").isMongoId(),
    check("id").custom(existProduct),
    validateFields
], deleteProduct);

module.exports = router;



