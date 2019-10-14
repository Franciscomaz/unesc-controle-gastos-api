const router = require('express').Router();
const service = require('../services/conta.service');
const { authenticate } = require('../core/authentication/auth.service');

const toRepresentation = entity => {
  return {
    id: entity.id,
    nome: entity.nome
  };
};

router.use('/:contaId/lancamentos', require('./lancamento.resource'));

router.get('', authenticate(), async function(req, res, next) {
  try {
    const entities = await service.findAll({ usuario: req.user.id });
    res.send(entities.map(entity => toRepresentation(entity)));
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authenticate(), async function(req, res, next) {
  try {
    res.send(toRepresentation(await service.findById(req.params.id)));
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

    res.send(toRepresentation(await service.create(payload)));
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authenticate(), async (req, res, next) => {
  try {
    res.send(toRepresentation(await service.update(req.params.id, req.body)));
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authenticate(), async (req, res, next) => {
  try {
    res.send(toRepresentation(await service.remove(req.params.id)));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
