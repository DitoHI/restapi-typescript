// STATIC CONSTANT
import { Router } from 'express';

const SUCCESS_RESPONSE = 200;
const FAILED_RESPONSE = 400;

const todoListRoutes = Router();

todoListRoutes.get('/test', (req, res) => { res.send('Welcome to ToDoList Routes'); });

export default todoListRoutes;
