const HTTP_CODES = require('../../http/status-codes');
const { internalErrorMessage } = require('../message.factory');

const handler = (err, req, res, next) => {
  res.status(HTTP_CODES.INTERNAL_ERROR).send(internalErrorMessage(err.message));
};

module.exports = handler;
