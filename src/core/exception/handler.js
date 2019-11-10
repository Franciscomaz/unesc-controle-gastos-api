const EXCEPTION_TYPES = require('./types');
const HTTP_STATUS_CODES = require('../http/status-codes');

const messageFactory = require('./message/factory');
const mongooseValidationErrorFormatter = require('./formatters/mongoose-validation');

const logError = err => {
  console.error('Ocorreu um erro na aplicação:', err);
};

const handleError = error => {
  if (EXCEPTION_TYPES.BAD_REQUEST === error.type) {
    return createHttpError(
      HTTP_STATUS_CODES.BAD_REQUEST,
      messageFactory.createBadRequestErrorMessage(error.message)
    );
  }

  if (EXCEPTION_TYPES.FORBIDDEN === error.type) {
    return createHttpError(
      HTTP_STATUS_CODES.FORBIDDEN,
      messageFactory.createForbiddenErrorMessage(error.message)
    );
  }

  if (EXCEPTION_TYPES.NOT_FOUND === error.type) {
    return createHttpError(
      HTTP_STATUS_CODES.NOT_FOUND,
      messageFactory.createNotFoundErrorMessage(error.message)
    );
  }

  if (EXCEPTION_TYPES.VALIDATION === error.type) {
    return createHttpError(
      HTTP_STATUS_CODES.VALIDATION_ERROR,
      messageFactory.createValidationErrorMessage(error.message)
    );
  }

  if (EXCEPTION_TYPES.INTERNAL_ERROR === error.type) {
    return createHttpError(
      HTTP_STATUS_CODES.INTERNAL_ERROR,
      messageFactory.createInternalErrorMessage(error.message)
    );
  }

  if (EXCEPTION_TYPES.MONGOOSE_VALIDATION) {
    const errors = mongooseValidationErrorFormatter.format(error);
    return createHttpError(HTTP_STATUS_CODES.VALIDATION_ERROR, errors);
  }

  console.warn('Não foi encontrado um tipo para o erro:', error);

  return null;
};

const createHttpError = (status, message) => {
  return {
    status: status,
    message: message
  };
};

module.exports = {
  handleError: error => {
    logError(error);
    return handleError(error);
  }
};
