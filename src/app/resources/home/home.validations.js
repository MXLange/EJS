const { body, validationResult } = require("express-validator");

const validate_home_data = (req) => body("email").notEmpty().isEmail();

module.exports = {
    validate_home_data
}