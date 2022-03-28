const ApiError = require("../modules/api.error");
const JWT = require("../modules/jwt");

const authorization = (req, res, next) => {
    const access = req.cookies.access;
    const refresh = req.cookies.refresh;

    if (!access || !refresh) {
        next(new ApiError(400, "잘못된 요청입니다."));
    }

    const accessVerify = JWT.accessVerify(access, refresh);
    const refreshVerify = JWT.refreshVerity(access, refresh);

    if (accessVerify.valid || refreshVerify.valid) {
        const newAccess = accessVerify.changed || refreshVerify.changed;
        const newRefresh = accessVerify.changed || refreshVerify.changed;

        if (newAccess && newRefresh) {
            req.headers.changed = true;
        }

        next();
    } else {
        next(new ApiError(401, "UnAuthorized"));
    }
};

module.exports = authorization;
