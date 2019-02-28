import * as mongoose from 'mongoose';
import { Food } from './index';

enum EUnits {
  kilogram = 'kg',
  gram = 'g',
}

interface IFood {
  _id: string;
  name: string;
  price: number;
  size: string;
  unit: string;
  quantity: number;
  description: string;
}

const foodSchema = new mongoose.Schema({
  name: { required: true, type: String },
  price: { required: true, type: Number },
  size: { required: true, type: Number },
  unit: { required: false, type: String },
  quantity: { required: false, type: Number },
  description: { required: false, type: String },
});

export { foodSchema };
