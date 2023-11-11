const { Router } = require("express");
const home_controller = require("./home.controller");
const { validate_home_data } = require("./home.validations");

const home_routes = Router();


home_routes.get("/", home_controller.home_render);

module.exports = home_routes;