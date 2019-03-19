import { Express } from 'express';
import passport from 'passport';

const passportRoute = (app: Express) => {
  app.use('/api/user', (req, res, next) => {
    if (req.url === '/login' || req.url === '/create') {
      return next();
    }

    passport.authenticate('user', { session: true }, (err, user) => {
      const STATUS_UNAUTHORIZED = 401;

      if (!user) {
        return res.status(STATUS_UNAUTHORIZED).json({
          message: 'Token expired. Please login as user first'
        });
      }

      if (user) {
        req.user = user;
      }

      return next();
    })(req, res, next);
  });
};

export { passportRoute };
