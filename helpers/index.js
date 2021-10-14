const dbValidatorCategory = require("./db-validator-category");
const dbValidatorProduct = require("./db-validator-product");
const dbValidatorUser = require("./db-validators-user");
const generateJWT = require("./generate-jwt");
const googleVerify = require("./google-verify");
const loadFile = require("./load-file");


module.exports = {
    ...dbValidatorCategory,
    ...dbValidatorProduct,
    ...dbValidatorUser,
    ...generateJWT,
    ...googleVerify,
    ...loadFile
}