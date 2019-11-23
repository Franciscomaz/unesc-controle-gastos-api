const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const userService = require('../../modules/user/user.service');

const options = {
  secretOrKey: process.env.AUTH_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const strategyImplementation = new Strategy(options, async (payload, done) => {
  try {
    const usuario = await userService.findById(payload.usuario_id);
    done(null, usuario);
  } catch (err) {
    done(err, false);
  }
});

passport.use(strategyImplementation);

module.exports = {
  initialize: () => passport.initialize()
};
