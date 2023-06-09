import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(`🛢 Server is connect successfully`);

    server = app.listen(config.port, () => {
      logger.info(
        `Application listening on port ${config.port},( http://localhost:5000/ )`
      );
    });
  } catch (error) {
    errorLogger.error(`Connection failed`, error);
  }

  process.on('unhandledRejection', error => {
    errorLogger.error(error);
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
