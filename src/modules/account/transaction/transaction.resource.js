const { CREATED } = require('../../../core/http/status-codes');

const router = require('express').Router({ mergeParams: true });

const service = require('./transaction.service');
const { fromEntity } = require('./transaction-representation.factory');
const { authenticate } = require('../../../core/authentication/auth.service');

const Sort = require('../../../core/data/sort');
const Pagination = require('../../../core/data/pagination');
const PageRepresentation = require('../../../core/data/page-representation');
const { formatUrl } = require('../../../utils/url-utils');
const responseUtils = require('../../../utils/response-utils');

router.get('', authenticate(), async function(req, res, next) {
  try {
    const filter = {
      usuario: req.user.id,
      conta: req.params.contaId,
      nome: new RegExp(req.query.nome, 'i')
    };

    const page = await service.findAll(
      new Pagination(filter, req.query.limit, req.query.offset),
      new Sort(req.query.sortField, req.query.sortOrder)
    );

    const response = responseUtils.successResponse(
      PageRepresentation.fromPage(page, fromEntity)
    );

    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authenticate(), async function(req, res, next) {
  try {
    const foundEntity = await service.findById(req.params.id);

    const response = responseUtils.successResponse(fromEntity(foundEntity));

    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.post('', authenticate(), async function(req, res, next) {
  try {
    const payload = {
      nome: req.body.nome,
      valor: req.body.valor,
      tipo: req.body.tipo,
      categoria: req.body.categoriaId,
      conta: req.params.contaId,
      usuario: req.user.id
    };

    const createdEntity = await service.create(payload);

    const response = responseUtils.createdResponse(
      fromEntity(createdEntity),
      formatUrl(
        req.protocol,
        req.hostname,
        `contas/${req.params.contaId}/transacoes/${createdEntity.id}`
      )
    );

    res.status(CREATED).send(response);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authenticate(), async (req, res, next) => {
  try {
    const payload = {
      nome: req.body.nome,
      valor: req.body.valor,
      tipo: req.body.tipo,
      categoria: req.body.categoriaId
    };

    const updatedEntity = await service.update(req.params.id, payload);

    const response = responseUtils.successResponse(fromEntity(updatedEntity));

    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authenticate(), async (req, res, next) => {
  try {
    const removedEntity = await service.remove(req.params.id);

    const response = responseUtils.successResponse(fromEntity(removedEntity));

    res.send(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
