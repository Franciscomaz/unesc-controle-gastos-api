const HTTP_CODES = require('../../http/status-codes');
const ERROR_TYPES = require('../types');

const factory = require('../message.factory');

const handler = (err, req, res, next) => {
  if (!err.type) {
    return next(err);
  }

  if (err.type === ERROR_TYPES.VALIDATION) {
    res
      .status(HTTP_CODES.VALIDATION_ERROR)
      .send(factory.validationErrorMessage(err.message));
  }

  if (err.type === ERROR_TYPES.NOT_FOUND) {
    res
      .status(HTTP_CODES.NOT_FOUND)
      .send(factory.notFoundErrorMessage(err.message));
  }
};

module.exports = handler;
