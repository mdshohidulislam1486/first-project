import app from './app';
import config from './config';
import { Server } from 'http';
import mongoose from 'mongoose';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    server = app.listen(config.port);
    console.log(`Example1 app listening on port ${config.port}`);
  } catch (error) {
    console.log(error);
  }
}
main();
process.on('unhandledRejection', () => {
  console.log(`Un unhandledRejection detected sutting down the server`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});
process.on('uncaughtException', () => {
  console.log(`Un uncaughtException detected sutting down the server`);
  process.exit(1);
});
