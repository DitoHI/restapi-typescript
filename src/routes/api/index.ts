import { Router } from 'express';
import { historyRouters } from './histories/historyRoutes';
import { userRoutes } from './users/userRoutes';

const apiRouter = Router();
apiRouter.use('/history', historyRouters);
apiRouter.use('/user', userRoutes);

export { apiRouter };
