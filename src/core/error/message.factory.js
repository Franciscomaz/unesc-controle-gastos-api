const HTTP_CODES = require('../http/status-codes');

const createErrorResponse = (...errors) => {
  return {
    errors: errors
  };
};

const createGenericErrorMessage = (title, detail, status) => {
  return {
    title: title,
    detail: detail,
    status: status
  };
};

module.exports = {
  internalErrorMessage: detail => {
    return createErrorResponse(
      createGenericErrorMessage(
        'Erro interno do servidor',
        detail,
        HTTP_CODES.INTERNAL_ERROR
      )
    );
  },
  notFoundErrorMessage: detail => {
    return createErrorResponse(
      createGenericErrorMessage(
        'Entidade não encontrada',
        detail,
        HTTP_CODES.NOT_FOUND
      )
    );
  },
  validationErrorMessage: (...details) => {
    const errors = details.map(detail =>
      createGenericErrorMessage(
        'Erro de validação',
        detail,
        HTTP_CODES.VALIDATION_ERROR
      )
    );

    return createErrorResponse(errors);
  }
};
