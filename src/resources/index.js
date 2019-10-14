module.exports = app => {
  app.use('/usuarios', require('./usuario.resource'));
  app.use('/contas', require('./conta.resource'));
};
