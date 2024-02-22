const CustomError = require('./custom-error.js');

class InternalServerError extends CustomError {
    constructor(message, cause) {
        super(message || 'Internal Server', 500, cause);
    }
}

module.exports = InternalServerError;