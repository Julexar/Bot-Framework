const CustomError = require('./custom-error.js');

class BadRequestError extends CustomError {
    constructor(message, cause) {
        super(message || 'Bad Request', 400, cause);
    }
}

module.exports = BadRequestError;