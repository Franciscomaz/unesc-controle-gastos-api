const router = require('express').Router();
const Lancamento = require('../../domain/lancamento/lancamento');
const representationBuilder = require('./lancamento-representation');
const response = require('../../infrastructure/http/response');

router.get('', async function(req, res) {
  const lancamentos = await Lancamento.find();
  const representations = lancamentos.map(entity =>
    representationBuilder.toRepresentation(entity)
  );

  res.send(representations);
});
router.get('/:id', async function(req, res) {
  try {
    const entity = await Lancamento.findById(req.params.id);

    res
      .status(response.HTTP_CODES.OK)
      .send(representationBuilder.toRepresentation(entity));
  } catch (error) {
    res
      .status(response.HTTP_CODES.NOT_FOUND)
      .send(
        response.notFoundErrorMessage(
          `O lançamento de id ${req.params.id} não foi encontrado`
        )
      );
  }
});
router.post('', function(req, res) {
  representationBuilder
    .toEntity(req.body, new Lancamento())
    .then(async entity => {
      const created = await entity.save();

      res
        .status(response.HTTP_CODES.OK)
        .send(representationBuilder.toRepresentation(created));
    })
    .catch(error => {
      res
        .status(response.HTTP_CODES.VALIDATION_ERROR)
        .send(response.validationErrorMessage(error));
    });
});
router.put('/:id', async (req, res) => {
  Lancamento.findById(req.params.id)
    .then(toBeUpdatedEntity => {
      representationBuilder
        .toEntity(req.body, toBeUpdatedEntity)
        .then(async entity => {
          const created = await entity.save();

          res
            .status(response.HTTP_CODES.OK)
            .send(representationBuilder.toRepresentation(created));
        })
        .catch(error => {
          res
            .status(response.HTTP_CODES.VALIDATION_ERROR)
            .send(response.validationError(error));
        });
    })
    .catch(() => {
      res
        .status(response.HTTP_CODES.NOT_FOUND)
        .send(
          response.notFoundErrorMessage(
            `O lançamento de id ${req.params.id} não foi encontrado`
          )
        );
    });
});
router.delete('/:id', (req, res) => {
  Lancamento.findById(req.params.id)
    .then(async toBeDeletedEntity => {
      try {
        await Lancamento.findByIdAndRemove(toBeDeletedEntity.id);

        res
          .status(response.HTTP_CODES.OK)
          .send(representationBuilder.toRepresentation(toBeDeletedEntity));
      } catch (error) {
        res
          .status(response.HTTP_CODES.INTERNAL_ERROR)
          .send(
            response.internalErrorMessage(
              `Não foi possível deletar o lançamento de id ${req.params.id}`
            )
          );
      }
    })
    .catch(() => {
      res
        .status(response.HTTP_CODES.NOT_FOUND)
        .send(
          response.notFoundErrorMessage(
            `O lançamento de id ${req.params.id} não foi encontrado`
          )
        );
    });
});

module.exports = router;
