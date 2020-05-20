const jwt = require("jsonwebtoken");
const configVars = require("../config/vars.js");


module.exports = {
    createToken
};

function createToken(user) {
    const payload = {
        sub: user.id,
        username: user.username,
        role: user.role
    };

    const secret = configVars.jwtSecret;

    const options = {
        expiresIn: configVars.expiresIn,
    };

    return jwt.sign(payload, secret, options);
}