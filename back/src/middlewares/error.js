const ApiError = require("../modules/api.error");
const httpStatus = require("http-status");
const logger = require("../modules/logger");

const notFound = (req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not Found"));
};

const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(err instanceof ApiError)) {
        const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
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
    }

    if (statusCode === httpStatus.INTERNAL_SERVER_ERROR) {
        logger.error(stack);
    } else {
        logger.warn(stack);
    }

    res.status(statusCode).send(response);
};

module.exports = { notFound, errorConverter, errorHandler };
