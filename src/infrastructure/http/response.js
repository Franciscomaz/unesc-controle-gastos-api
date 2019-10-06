const HTTP_CODES = {
  OK: 200,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  INTERNAL_ERROR: 500
};

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
  HTTP_CODES: HTTP_CODES,

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
  validationErrorMessage: validationError => {
    const errors = validationError.details.map(error =>
      createGenericErrorMessage(
        'Atributo inválido',
        error.message,
        HTTP_CODES.VALIDATION_ERROR
      )
    );

    return createErrorResponse(...errors);
  }
};
