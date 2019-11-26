const { OK } = require('../../core/http/status-codes');

const router = require('express').Router();
const { successResponse } = require('../../utils/response-utils');

const service = require('../account/transaction/transaction.service');
const { authenticate } = require('../../core/authentication/auth.service');

router.get('/sumario', authenticate(), async function(req, res, next) {
  try {
    const summary = await service.getTransactionsSummary(req.user.id);

    res.status(OK).send(successResponse(summary));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
