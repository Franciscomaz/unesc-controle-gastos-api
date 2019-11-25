const { CREATED } = require('../../core/http/status-codes');

const router = require('express').Router();

const service = require('./user.service');

const Sort = require('../../core/data/sort');
const Pagination = require('../../core/data/pagination');
const PageRepresentation = require('../../core/data/page-representation');
const { formatUrl } = require('../../utils/url-utils');
const responseUtils = require('../../utils/response-utils');

router.get('', async function(req, res, next) {
  try {
    const filter = {
      nome: new RegExp(req.query.nome, 'i')
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

router.get('/:id', async function(req, res, next) {
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

router.post('/login', async function(req, res, next) {
  try {
    const token = await service.login(req.body);

    res.send(responseUtils.successResponse({ token: token }));
  } catch (err) {
    next(err);
  }
});

router.post('', async function(req, res, next) {
  try {
    const createdEntity = await service.create(req.body);

    const response = responseUtils.createdResponse(
      toRepresentation(createdEntity),
      formatUrl(req.protocol, req.hostname, `usuarios/${createdEntity.id}`)
    );

    res.status(CREATED).send(response);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedEntity = await service.update(req.params.id, req.body);

    const response = responseUtils.successResponse(
      toRepresentation(updatedEntity)
    );

    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
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
    nome: entity.nome,
    username: entity.username
  };
};

module.exports = router;
