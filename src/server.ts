import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, infoLogger } from './shared/logger/logger';

let server: Server;

process.on('uncaughtException', (error: Error) => {
  errorLogger.error(error);
  process.exit(1);
});

//Connect to the database and start the server
async function connectDB() {
  try {
    await mongoose.connect(config.mongo_url);
    infoLogger.info(`🛢 Database connection successful`);

    server = app.listen(config.port, () => {
      infoLogger.info(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('Failed to connect to the database', err);
    process.exit(1);
  }

  process.on('unhandledRejection', (reason: unknown) => {
    if (server) {
      server.close(() => {
        errorLogger.error(reason);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

connectDB();

process.on('SIGTERM', () => {
  infoLogger.info('SIGTERM is received');
  if (server) {
    server.close();
    mongoose.disconnect();
  }
});
