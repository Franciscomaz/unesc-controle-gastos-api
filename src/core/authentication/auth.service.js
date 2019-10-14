const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = {
  gerarToken: payload =>
    jwt.sign(payload, process.env.AUTH_SECRET, {
      expiresIn: process.env.AUTH_EXPIRATION
    }),
  authenticate: () =>
    passport.authenticate(process.env.AUTH_TYPE, { session: false })
};
