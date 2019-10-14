const router = require('express').Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../docs/swagger.json');

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use('/usuarios', require('./usuario.resource'));
router.use('/contas', require('./conta.resource'));
router.use('/etiquetas', require('./etiqueta.resource'));

module.exports = router;
