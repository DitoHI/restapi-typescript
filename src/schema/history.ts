import mongoose from 'mongoose';

interface IHistory {
  numberOne: number;
  numberTwo: number;
  operator: string;
  result: number;
  createdIn: Date;
}

const historySchema = new mongoose.Schema({
  numberOne: Number,
  numberTwo: Number,
  operator: String,
  result: Number,
  createdIn: Date,
});

const historyModel = mongoose.model('History', historySchema);

export { IHistory, historyModel };
