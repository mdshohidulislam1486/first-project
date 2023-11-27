import app from './app';
import config from './config';

import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    app.listen(config.port);
    console.log(`Example1 app listening on port ${config.port}`);
  } catch (error) {
    console.log(error);
  }
}
main();
