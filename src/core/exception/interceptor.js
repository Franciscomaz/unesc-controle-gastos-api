const errorHandler = require('./handler');
const { errorResponse } = require('../../utils/response-utils');

module.exports = (err, req, res, next) => {
  const error = errorHandler.handleError(err);

  if (!error.isAMappedApplicationError) {
    next(err);
  }

  const response = errorResponse(
    Array.isArray(error.message) ? error.message : [error.message]
  );

  res.status(error.status).send(response);
};
