import { Router } from 'express';
import todoRoutes from './todo/todoRoutes';
import todoListRoutes from './todoList/todoListRoutes';
import { userRoutes } from './users/userRoutes';

const apiRouter = Router();
apiRouter.use('/user', userRoutes);
apiRouter.use('/user/todoList', todoListRoutes);
apiRouter.use('/user/todo', todoRoutes);

export { apiRouter };
