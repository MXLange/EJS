const { validationResult } = require("express-validator");
const { contatos_service } = require("./contatos.service");
module.exports = {
    async contatos(req, res) {
        const has_error = validationResult(req);
        if(!has_error.isEmpty()) {
            res.render("contatos/contatos");
        }
        const { email } = req.body;
        const user = await contatos_service(email);
        return res.render("");
    },
    async contatos_render(req, res) {
        return res.render("contatos/contatos", { title: "Contatos" });
    }
};



