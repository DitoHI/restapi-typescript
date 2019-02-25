import { Router } from 'express';
import { historyRouters } from './histories/historyRoutes';

const apiRouter = Router();
apiRouter.use('/history', historyRouters);

export { apiRouter };
