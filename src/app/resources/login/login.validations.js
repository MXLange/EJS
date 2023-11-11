const { body, validationResult } = require("express-validator");

const validate_login_data = (req) => body("email").notEmpty().isEmail();
const validate_six_digits_data = (req) => body("six_digits").notEmpty();
module.exports = {
    validate_login_data,
    validate_six_digits_data
}