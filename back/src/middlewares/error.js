const ApiError = require("../modules/api.error");

const notFound = (req, res, next) => {
    next(new ApiError(404, "Not Found"));
};

const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(err instanceof ApiError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message;
        error = new ApiError(statusCode, message, err.stack);
    }
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let { statusCode, message, stack } = err;

    const response = {
        code: statusCode,
        message: message,
    };

    if (process.env.NODE_ENV === "development") {
        response.stack = stack;
    } else {
        if (statusCode === 500) {
            response.message = "서버 오류";
        }
    }

    res.status(statusCode).send(response);
};

module.exports = { notFound, errorConverter, errorHandler };
