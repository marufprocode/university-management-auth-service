import mongoose from 'mongoose';
import app from './app';
import config from './config/index';

//database connection
async function connectDB() {
  try {
    await mongoose.connect(config.mongo_url);
    console.log(`🛢 Database connection successful`);

    app.listen(config.port, () => {
      console.log(`Server is  listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(`Failed to connect database`, err);
  }
}

connectDB();
