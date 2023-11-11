module.exports = {
    async logout(req, res) {
        if(req.session?.auth) {
            req.session.destroy();
        }
        res.redirect("/login");
    }
};



