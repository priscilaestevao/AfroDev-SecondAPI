const createToken = require("../../shared/generateToken");

module.exports = {
    login: (req, res) => {
        const acessToken = createToken(req.user);
        res.set("Authorization", acessToken);
        res.status(200).send();
    }
};