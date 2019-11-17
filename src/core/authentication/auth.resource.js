const { NO_CONTENT } = require('../http/status-codes');
const { BAD_REQUEST, FORBIDDEN } = require('../exception/types');

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
      service.isValidToken(token);
    } catch {
      throw {
        type: FORBIDDEN,
        message: 'Você não possui acesso para acessar este recurso'
      };
    }

    res.status(NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
