const { Router } = require("express");
const contatos_controller = require("./contatos.controller");
const { validate_contatos_data } = require("./contatos.validations");

const contatos_routes = Router();


contatos_routes.get("/", contatos_controller.contatos_render);

module.exports = contatos_routes;