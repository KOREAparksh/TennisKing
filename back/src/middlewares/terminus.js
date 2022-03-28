const JWT = require("../modules/jwt");

const terminus = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .then((result) => {
            if (req.headers.changed) {
                res.cookie("access", JWT.accessSign(), { httpOnly: true, secure: true, sameSite: "none" });
                res.cookie("refresh", JWT.refreshSign(), { httpOnly: true, secure: true, sameSite: "none" });
            }
            res.status(200).json(result);
        })
        .catch((err) => next(err));
};

module.exports = terminus;
