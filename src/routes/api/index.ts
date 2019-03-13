import { Router } from 'express';
import { userRoutes } from './users/userRoutes';

const apiRouter = Router();
apiRouter.use('/user', userRoutes);

export { apiRouter };
