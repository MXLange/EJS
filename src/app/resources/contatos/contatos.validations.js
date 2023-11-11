const { body, validationResult } = require("express-validator");

const validate_contatos_data = (req) => body("email").notEmpty().isEmail();

module.exports = {
    validate_contatos_data
}