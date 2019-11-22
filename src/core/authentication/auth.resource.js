const { OK } = require('../http/status-codes');
const { BAD_REQUEST } = require('../exception/types');
const { successResponse } = require('../../utils/response-utils');

const router = require('express').Router({ mergeParams: true });
const service = require('./auth.service');

router.post('', (req, res, next) => {
  try {
    const token = req.body.token;

    if (!token) {
      throw {
        type: BAD_REQUEST,
        message: 'É necessário informar um token'
      };
    }

    try {
      res.status(OK).send(successResponse(service.isValidToken(token)));
    } catch {
      res.status(OK).send(successResponse(false));
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
