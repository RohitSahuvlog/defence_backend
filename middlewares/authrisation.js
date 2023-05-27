const User = require("../models/user.models");

const authorization = (permittedrole) => {

    return async (req, res, next) => {
        const user = await User.findOne({ _id: req.userId });
        if (!user) {
            return res.status(400).send({ message: "User not  exist" });
        }
        if (permittedrole.includes(user.role)) {
            return next()
        }
        return res.send({ message: "you are not authorize" })

    }
};
module.exports = authorization