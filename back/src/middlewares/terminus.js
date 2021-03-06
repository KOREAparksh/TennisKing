const httpStatus = require("http-status");
const JWT = require("../modules/jwt");

const terminus = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .then((result) => {
            if (req.headers.changed) {
                res.cookie("access", JWT.accessSign(), {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                    maxAge: 24 * 3600 * 1000,
                });
                res.cookie("refresh", JWT.refreshSign(), {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                    maxAge: 24 * 3600 * 1000,
                });
            }
            res.status(httpStatus.OK).json(result);
        })
        .catch((err) => next(err));
};

module.exports = terminus;
