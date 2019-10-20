const HTTP_CODES = require('../../http/status-codes');
const EXCEPTION_TYPES = require('../types');

const { validationErrorMessage } = require('../message.factory');

const handler = (err, req, res, next) => {
  if (!err.name && err.name !== EXCEPTION_TYPES.MONGOOSE_VALIDATION) {
    return next(err);
  }

  const errors = [];

  for (const error in err.errors) {
    errors.push(err.errors[error].message);
  }

  res
    .status(HTTP_CODES.VALIDATION_ERROR)
    .send(validationErrorMessage(...errors));
};

module.exports = handler;
