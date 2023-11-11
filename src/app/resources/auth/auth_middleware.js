const { check_auth_time } = require("./jwt_checker");

function auth_middleware(req, res, next) {
    if(req.session?.auth) {
        if(check_auth_time(req.session.token)) {
            next();
        } else {
            res.redirect("/logout");
        }
    } else {
        res.redirect("/login");
    }
}

module.exports = auth_middleware;