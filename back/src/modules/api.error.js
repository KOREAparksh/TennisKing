Error.stackTraceLimit = 10;

class ApiError extends Error {
    constructor(statusCode, message, option) {
        super(message);
        this.statusCode = statusCode;
        if (option) {
            this.isFatal = option.isFatal === undefined ? false : option.isFatal;
            if (option.stack) {
                this.stack = option.stack;
            } else {
                Error.captureStackTrace(this, this.constructor);
            }
        } else {
            this.isFatal = false;
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = ApiError;
