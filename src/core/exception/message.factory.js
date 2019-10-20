const HTTP_CODES = require('../http/status-codes');

const { errorResponse } = require('../../utils/response-utils');

const createGenericErrorMessage = (title, detail, status) => {
  return {
    title: title,
    detail: detail,
    status: status
  };
};

module.exports = {
  badRequestErrorMessage: detail => {
    return errorResponse(
      createGenericErrorMessage(
        'Requisição mal formada',
        detail,
        HTTP_CODES.BAD_REQUEST
      )
    );
  },
  forbiddenErrorMessage: detail => {
    return errorResponse(
      createGenericErrorMessage('Acesso restrito', detail, HTTP_CODES.FORBIDDEN)
    );
  },
  notFoundErrorMessage: detail => {
    return errorResponse(
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

    return errorResponse(errors);
  },
  internalErrorMessage: detail => {
    return errorResponse(
      createGenericErrorMessage(
        'Erro interno do servidor',
        detail,
        HTTP_CODES.INTERNAL_ERROR
      )
    );
  }
};
