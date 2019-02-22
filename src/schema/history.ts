import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  numberOne: Number,
  numberTwo: Number,
  operator: String,
  result: Number,
  createdIn: Date,
});

const historyModel = mongoose.model('History', historySchema);

export { historyModel };
