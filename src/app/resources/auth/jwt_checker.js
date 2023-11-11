const jwt = require("jsonwebtoken");


module.exports = {
    check_auth_time(token) {
        const valid = jwt.verify(token, "1234", function(err, decoded) {
            if(err) {
                return false;
            }
            return true;
        });
        return valid;
    },
};
