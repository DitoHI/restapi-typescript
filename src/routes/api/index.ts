import { Router } from 'express';
import todoListRoutes from './todoList/todoListRoutes';
import { userRoutes } from './users/userRoutes';

const apiRouter = Router();
apiRouter.use('/user', userRoutes);
apiRouter.use('/user/todoList', todoListRoutes);

export { apiRouter };
