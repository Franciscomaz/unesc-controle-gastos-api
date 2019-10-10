module.exports = app => {
  app.use('/usuarios', require('./usuario.resource'));
  app.use('/lancamentos', require('./lancamento.resource'));
};
