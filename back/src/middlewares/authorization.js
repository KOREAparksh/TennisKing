const JWT = require("../modules/jwt");
const ApiError = require("../modules/api.error");
const httpStatus = require("http-status");

const authorization = (req, res, next) => {
    const access = req.cookies.access;
    const refresh = req.cookies.refresh;

    if (!access || !refresh) {
        next(new ApiError(httpStatus.UNAUTHORIZED, "UnAuthorized"));
    }

    const accessVerify = JWT.accessVerify(access, refresh);
    const refreshVerify = JWT.refreshVerity(access, refresh);

    if (accessVerify.valid && refreshVerify.valid) {
        next();
    } else if (accessVerify.valid || refreshVerify.valid) {
        if (!accessVerify.valid && accessVerify.changed) {
            req.headers.changed = true;
            next();
        } else if (!refreshVerify.valid && refreshVerify.changed) {
            req.headers.changed = true;
            next();
        } else {
            next(new ApiError(httpStatus.UNAUTHORIZED, "UnAuthorized"));
        }
    } else {
        next(new ApiError(httpStatus.UNAUTHORIZED, "UnAuthorized"));
    }
};

module.exports = authorization;
