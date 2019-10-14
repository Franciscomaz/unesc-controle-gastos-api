const router = require('express').Router({ mergeParams: true });
const service = require('../services/lancamento.service');
const { authenticate } = require('../core/authentication/auth.service');

const toRepresentation = entity => {
  return {
    id: entity.id,
    nome: entity.nome,
    valor: entity.valor,
    conta: entity.conta
  };
};

router.get('', authenticate(), async function(req, res, next) {
  try {
    const entities = await service.findAll({
      usuario: req.user.id,
      conta: req.params.contaId
    });

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
      valor: req.body.valor,
      conta: req.params.contaId,
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
