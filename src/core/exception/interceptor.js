const errorHandler = require('./handler');
const { errorResponse } = require('../../utils/response-utils');

module.exports = (err, req, res, next) => {
  const httpError = errorHandler.handleError(err);
  if (!httpError) {
    next(err);
  }

  res.status(httpError.status).send(errorResponse(httpError.message));
};
