const {Router} = require("express");
const {check} = require("express-validator");

const {validateFields} = require("../middlewares/validate-fields");
const {
    uploadFile,
    updateImage,
    responseImage,
    updateImageCloudinary
} = require("../controllers/uploads.controller");
const { isValidCollection, isValidExtensionFile} = require("../helpers/db-validator");
const { validateFileUploaded } = require("../middlewares/validate-file");

const router = Router();

router.post("/", [
    validateFileUploaded
], uploadFile);


router.put("/:collection/:id", [
    check("id", "Not is a valid ID").isMongoId(),
    check("collection").custom(c => isValidCollection(c, ["users", "products"])),
    validateFileUploaded,
    validateFields
], updateImageCloudinary);

router.get("/:collection/:id", [
    check("id", "Not is a valid ID").isMongoId(),
    check("collection").custom(c => isValidCollection(c, ["users", "products"])),
    check("file").custom(isValidExtensionFile),
    validateFields
], responseImage);

module.exports = router;