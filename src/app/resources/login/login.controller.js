const { validationResult } = require("express-validator");
const { login_service } = require("./login.service");
const { render } = require("ejs");
module.exports = {
    async login(req, res) {
        try {
            const has_error = validationResult(req);
            if (!has_error.isEmpty()) {
                return render_login_error(res,"Insira um email válido.");
            }
            const { email } = req.body;
            const login_res = await login_service(email);
            console.log(login_res)
            if (login_res) {
                const { token, six_digits, six_digits_expiration_time } = login_res;
                const date_now = new Date(Date.now());
                const expires_in = new Date(date_now.getTime() + (1000 * 60 * six_digits_expiration_time));

                req.session.email = email;
                req.session.token = token;
                req.session.six_digits = six_digits;
                req.session.six_digits_expiration_time = expires_in;
                res.redirect("/login/six-digits");
            }
        } catch (error) {
            console.log(error)
            return render_login_error(res, "Erro interno, por favor entre em contato com o administrador.");
        }
    },

    async login_render(req, res) {
        if (req.session?.auth) {
            res.redirect("/home");
        }
        return render_login_error(res);
    },

    async validate_six_digits(req, res) {
        const has_error = validationResult(req);
        if (!has_error.isEmpty()) {
            return render_six_digists_error(res, "Insira o código de 6 dígitos.");
        }

        const { six_digits } = req.body;
        const date_now = new Date();
        const six_digits_expiration_time = Date.parse(req.session.six_digits_expiration_time);

        if (req.session.six_digits === six_digits && six_digits_expiration_time > date_now) {
            req.session.auth = true;
            res.redirect("/home");
        } else if(req.session.six_digits === six_digits && six_digits_expiration_time < date_now)  {
            return render_six_digists_error(res, "Código expirado");
        } else {
            return render_six_digists_error(res, "Código Inválido");
        }
    },

    async render_six_digits(req, res) {
        if (req.session?.auth) {
            res.redirect("/home");
        }
        return render_six_digists_error(res);
    },
};

function render_six_digists_error(res, error = null) {
    return res.render("login/six_digits/six_digits", {
        title: "Login",
        layout: "layouts/login_layout",
        errors: {
            six_digits: error
        }
    });
}

function render_login_error(res, error = null) {
    return res.render("login/login", {
        title: "Login",
        layout: "layouts/login_layout",
        errors: {
            login: error,
        },
    });
}
