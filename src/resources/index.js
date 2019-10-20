const router = require('express').Router();
const { loadYAML } = require('../utils/file-utils');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = loadYAML('../../docs/swagger.yaml');

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use('/usuarios', require('./usuario.resource'));
router.use('/contas', require('./conta.resource'));
router.use('/etiquetas', require('./etiqueta.resource'));

module.exports = router;
