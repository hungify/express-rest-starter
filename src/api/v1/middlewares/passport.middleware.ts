import passport from 'passport';
import passportJwt from 'passport-jwt';
import userService from '~/api/v1/services/user.service';
import { jwt } from '~/configs/env.config.dev';
import { JwtPayload } from '~/interfaces/jwt.interface';

const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;
const optionsJwt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwt.accessTokenSecret,
};

passport.use(
  new JwtStrategy(optionsJwt, async (payload: JwtPayload, done) => {
    try {
      const foundUser = await userService.getUserById(payload.userId);
      if (foundUser) {
        return done(null, payload);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }),
);

export default passport;
