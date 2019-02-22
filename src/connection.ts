import mongoose from 'mongoose';

// connect to mongo
mongoose.connect(process.env.MONGODB_ATLAS, { useNewUrlParser: true });
const db = mongoose.connection;

const dbInit = () => {
  db.on('error', () => {
    console.log('Error connecting mongoose');
  });
  db.once('open', () => {
    console.log('We are connected');
  });
};

export { db, dbInit };
