// STATIC CONSTANT
import { Router } from 'express';

const todoRoutes = Router();

todoRoutes.get('/test', (req, res) => { res.send('Welcome to ToDo Routes'); });

export default todoRoutes;
