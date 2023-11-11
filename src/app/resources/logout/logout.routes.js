const { Router } = require("express");
const logout_controller = require("./logout.controller");

const logout_routes = Router();


logout_routes.get("/", logout_controller.logout);

module.exports = logout_routes;