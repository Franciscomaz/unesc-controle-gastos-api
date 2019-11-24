const { CREATED } = require('../../core/http/status-codes');

const router = require('express').Router();

const service = require('./account.service');
const transactionService = require('./transaction/transaction.service');
const { authenticate } = require('../../core/authentication/auth.service');
const transactionRepresentationFactory = require('./transaction/transaction-representation.factory');

const Pagination = require('../../core/data/pagination');
const PageRepresentation = require('../../core/data/page-representation');
const { formatUrl } = require('../../utils/url-utils');
const responseUtils = require('../../utils/response-utils');

router.use(
  '/:contaId/transacoes',
  require('./transaction/transaction.resource')
);

router.get('', authenticate(), async function(req, res, next) {
  try {
    const filter = {
      usuario: req.user.id,
      nome: new RegExp(req.query.nome, 'i')
    };

    const page = await service.findAll(
      new Pagination(filter, req.query.limit, req.query.offset)
    );

    const response = responseUtils.successResponse(
      PageRepresentation.fromPage(page, toRepresentation)
    );

    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.get('/transacoes', authenticate(), async function(req, res, next) {
  try {
    const filter = {
      usuario: req.user.id,
      nome: new RegExp(req.query.nome, 'i')
    };

    const page = await transactionService.findAll(
      new Pagination(filter, req.query.limit, req.query.offset)
    );

    const response = responseUtils.successResponse(
      PageRepresentation.fromPage(
        page,
        transactionRepresentationFactory.fromEntity
      )
    );

    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authenticate(), async function(req, res, next) {
  try {
    const foundEntity = await service.findById(req.params.id);

    const response = responseUtils.successResponse(
      toRepresentation(foundEntity)
    );

    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.post('', authenticate(), async function(req, res, next) {
  try {
    const payload = {
      nome: req.body.nome,
      usuario: req.user.id
    };

    const entity = await service.create(payload);

    const response = responseUtils.createdResponse(
      toRepresentation(entity),
      formatUrl(req.protocol, req.hostname, `/contas/${entity.id}`)
    );

    res.status(CREATED).send(response);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authenticate(), async (req, res, next) => {
  try {
    const payload = {
      nome: req.body.nome
    };

    const updatedEntity = await service.update(req.params.id, payload);

    const response = responseUtils.successResponse(
      toRepresentation(updatedEntity)
    );

    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authenticate(), async (req, res, next) => {
  try {
    const removedEntity = await service.remove(req.params.id);

    const response = responseUtils.successResponse(
      toRepresentation(removedEntity)
    );

    res.send(response);
  } catch (err) {
    next(err);
  }
});

const toRepresentation = entity => {
  return {
    id: entity.id,
    nome: entity.nome
  };
};

module.exports = router;
