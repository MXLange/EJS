const { Router } = require("express");
const login_routes = require("../resources/login/login.routes");
const home_routes = require("../resources/home/home.routes");
const auth_middleware = require("../resources/auth/auth_middleware");
const logout_routes = require("../resources/logout/logout.routes");
const contatos_routes = require("../resources/contatos/contatos.routes");

const routes = Router();

routes.get("/", (req, res) => {
    if(req.session?.auth) {
        res.redirect("/home");
    } else {
        res.redirect("/login");
    }
});
routes.use("/login", login_routes);
routes.use("/logout", logout_routes);
routes.use("/home", auth_middleware, home_routes);
routes.use("/contatos", auth_middleware, contatos_routes);

module.exports = routes;
