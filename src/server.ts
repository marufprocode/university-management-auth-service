import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, infoLogger } from './shared/logger/logger';

//database connection
async function connectDB() {
  try {
    await mongoose.connect(config.mongo_url);
    infoLogger.info(`🛢 Database connection successful`);

    app.listen(config.port, () => {
      infoLogger.info(`Server is  listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error(`Failed to connect database`, err);
  }
}

connectDB();
