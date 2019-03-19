import mongoose from 'mongoose';
import { ITodo, ITodoList } from '../../../schema';

// use case
const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_ACCEPTABLE = 406;

const todoListMongooseModel = mongoose.model('TodoList');
