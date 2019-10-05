module.exports = app => {
  app.use('lancamentos', require('./lancamento.controller'));
};
