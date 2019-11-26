const router = require('express').Router();
const { loadYAML } = require('./utils/file-utils');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = loadYAML('../../docs/swagger.yaml');

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use('/dashboards', require('./modules/dashboard/dashboard.resource'));
router.use('/usuarios', require('./modules/user/user.resource'));
router.use('/contas', require('./modules/account/account.resource'));
router.use('/categorias', require('./modules/category/category.resource'));
router.use('/authenticate', require('./core/authentication/auth.resource'));

module.exports = router;
