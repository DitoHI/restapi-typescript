import { ExtractJwt, Strategy } from 'passport-jwt';
import { findUserById } from '../routes/api/users/userController';

const strategyInitializer = (secretKey: string) => {
  const opts: any = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = secretKey;

  return new Strategy(opts, async (payload, done) => {
    const userId = payload.id;
    const user = await findUserById(userId);
    return done(null, user);
  });
};

export { strategyInitializer };
