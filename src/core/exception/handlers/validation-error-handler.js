const HTTP_CODES = require('../../http/status-codes');
const EXCEPTION_TYPES = require('../types');

const factory = require('../message.factory');

const handler = (err, req, res, next) => {
  if (!err.name) {
    return next(err);
  }

  if (err.name === EXCEPTION_TYPES.MONGOOSE_VALIDATION) {
    const errors = [];

    for (const error in err.errors) {
      errors.push(err.errors[error].message);
    }

    res
      .status(HTTP_CODES.VALIDATION_ERROR)
      .send(factory.validationErrorMessage(...errors));
  }
};

module.exports = handler;
