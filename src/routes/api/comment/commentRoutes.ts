// STATIC CONSTANT
import { Router } from 'express';

const commentRouter = Router();

commentRouter.get('/test', (req, res) => { res.send('Welcome to Comment Routes'); });

export default commentRouter;
