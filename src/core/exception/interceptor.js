const errorHandler = require('./handler');
const { errorResponse } = require('../../utils/response-utils');

module.exports = (err, req, res, next) => {
  const error = errorHandler.handleError(err);

  if (!error.isAMappedApplicationError) {
    next(err);
  }

  res.status(error.status).send(errorResponse(error.message));
};
