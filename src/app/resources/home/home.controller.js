const { validationResult } = require("express-validator");
const { home_service } = require("./home.service");
module.exports = {
    async home(req, res) {
        const has_error = validationResult(req);
        if(!has_error.isEmpty()) {
            res.render("home/home");
        }
        const { email } = req.body;
        const user = await home_service(email);
        return res.render("");
    },
    async home_render(req, res) {
        return res.render("home/home", { title: "Home" });
    }
};



