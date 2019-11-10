const createErrorMessage = (title, detail) => {
  return {
    title: title,
    detail: detail
  };
};

module.exports = {
  createBadRequestErrorMessage: detail =>
    createErrorMessage('Requisição mal formada', detail),

  createForbiddenErrorMessage: detail =>
    createErrorMessage('Acesso restrito', detail),

  createNotFoundErrorMessage: detail =>
    createErrorMessage('Entidade não encontrada', detail),

  createValidationErrorMessage: detail =>
    createErrorMessage('Erro de validação', detail),

  createInternalErrorMessage: detail =>
    createErrorMessage('Erro interno do servidor', detail)
};
