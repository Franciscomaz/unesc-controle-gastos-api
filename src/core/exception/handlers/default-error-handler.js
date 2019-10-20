const HTTP_CODES = require('../../http/status-codes');
const EXCEPTION_TYPES = require('../types');

const factory = require('../message.factory');

const handler = (err, req, res, next) => {
  if (!err.type) {
    return next(err);
  }

  if (err.type === EXCEPTION_TYPES.VALIDATION) {
    res
      .status(HTTP_CODES.VALIDATION_ERROR)
      .send(factory.validationErrorMessage(err.message));
  }

  if (err.type === EXCEPTION_TYPES.NOT_FOUND) {
    res
      .status(HTTP_CODES.NOT_FOUND)
      .send(factory.notFoundErrorMessage(err.message));
  }

  if (err.type === EXCEPTION_TYPES.FORBIDDEN) {
    res
      .status(HTTP_CODES.FORBIDDEN)
      .send(factory.forbiddenErrorMessage(err.message));
  }

  console.warn('Tipo de erro não encontrado:', err.type);

  next(err);
};

module.exports = handler;
