const jwt = require("jsonwebtoken");

module.exports = {
    async login_service(email) {
        const token = await jwt.sign({ email: email }, "1234", {
            expiresIn: "24h",
        });
        if(token) {
            return { token, six_digits: "123456", six_digits_expiration_time: 2 };
        }
        return false;
    }
};
