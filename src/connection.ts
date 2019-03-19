import mongoose from 'mongoose';

// connect to mongo
mongoose.connect(process.env.MONGODB_ATLAS, { useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;

const dbInit = () => {
  db.on('error', () => {
    console.log('Error connecting mongoose');
  });
  db.once('open', () => {
    console.log('We are connected');
  });
};

export { dbInit };
