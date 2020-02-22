const mongoose = require('mongoose');

const initDB = () => {
  try {
    mongoose.connect(process.env.MONGO, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.once('open', () => {
      console.log('✅ Connected to database');
    });
    mongoose.connection.on('error', err => {
      console.error(`MongoDB connection error: ${err}`);
      process.exit(-1); // eslint-disable-line no-process-exit
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = initDB;
