import { Router } from 'express';
import { historyRouters } from './historyRoutes';

const apiRouter = Router();
apiRouter.use('/history', historyRouters);

export { apiRouter };
