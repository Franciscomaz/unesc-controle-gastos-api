const { CREATED } = require('../../core/http/status-codes');

const router = require('express').Router({ mergeParams: true });

const service = require('./budget.service');
const { authenticate } = require('../../core/authentication/auth.service');

const Sort = require('../../core/data/sort');
const Pagination = require('../../core/data/pagination');
const PageRepresentation = require('../../core/data/page-representation');
const { formatUrl } = require('../../utils/url-utils');
const responseUtils = require('../../utils/response-utils');

router.get('', authenticate(), async function(req, res, next) {
  try {
    const filter = {
      usuario: req.user.id
    };

    const page = await service.findAll(
      new Pagination(filter, req.query.limit, req.query.offset),
      new Sort(req.query.sortField, req.query.sortOrder)
    );

    const response = responseUtils.successResponse(
      PageRepresentation.fromPage(page, toRepresentation)
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
      valor: req.body.valor,
      categoria: req.body.categoriaId,
      usuario: req.user.id
    };

    const createdEntity = await service.create(payload);

    const response = responseUtils.createdResponse(
      toRepresentation(createdEntity),
      formatUrl(req.protocol, req.hostname, `orcamentos/${createdEntity.id}`)
    );

    res.status(CREATED).send(response);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authenticate(), async (req, res, next) => {
  try {
    const payload = {
      valor: req.body.valor,
      categoria: req.body.categoriaId
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
    valor: entity.valor,
    categoria: entity.categoria
      ? {
          id: entity.categoria.id,
          nome: entity.categoria.nome
        }
      : null
  };
};

module.exports = router;
