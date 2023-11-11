const { Router } = require("express");
const login_controller = require("./login.controller");
const { validate_login_data, validate_six_digits_data } = require("./login.validations");

const login_routes = Router();


login_routes.get("/", login_controller.login_render);
login_routes.post("/", validate_login_data(), login_controller.login);
login_routes.get("/six-digits", login_controller.render_six_digits);
login_routes.post("/six-digits", validate_six_digits_data(), login_controller.validate_six_digits);


module.exports = login_routes;