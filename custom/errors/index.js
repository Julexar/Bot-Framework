const BadRequestError = require('./bad-request.js');
const CustomError = require('./custom-error.js');
const DuplicateError = require('./duplicate.js');
const ForbiddenError = require('./forbidden.js');
const InternalServerError = require('./internal-server.js');
const NotFoundError = require('./not-found.js');
const UnauthorizedError = require('./unauthorized.js');

module.exports = {
    BadRequestError,
    CustomError,
    DuplicateError,
    ForbiddenError,
    InternalServerError,
    NotFoundError,
    UnauthorizedError,
};
