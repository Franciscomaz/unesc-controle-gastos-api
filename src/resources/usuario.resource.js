const router = require('express').Router();
const service = require('../services/usuario.service');

const toRepresentation = (...entities) => {
  if (!entities.length) {
    return [];
  }

  const createRepresentation = entity => {
    return {
      id: entity.id,
      nome: entity.nome,
      username: entity.username
    };
  };

  if (entities.length > 1) {
    return entities.map(entity => createRepresentation(entity));
  }

  return createRepresentation(...entities);
};

router.get('', async function(req, res, next) {
  try {
    const entities = await service.findAll();
    res.send(toRepresentation(...entities));
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    res.send(toRepresentation(await service.findById(req.params.id)));
  } catch (err) {
    next(err);
  }
});

router.post('', async function(req, res, next) {
  try {
    res.send(toRepresentation(await service.create(req.body)));
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    res.send(toRepresentation(await service.update(req.params.id, req.body)));
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    res.send(toRepresentation(await service.remove(req.params.id)));
  } catch (err) {
    next(err);
  }
});

module.exports = router;