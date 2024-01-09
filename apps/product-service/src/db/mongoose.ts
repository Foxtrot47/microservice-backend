import mongoose from 'mongoose';
import dotenv from 'dotenv';

import ProductModel from "./products";

dotenv.config();

let isDbConnected = false;


const connectDB = async () => {
  if (isDbConnected) return;
  try {
    const dbOptions = {
      useUnifiedTopology: true,
      dbName: 'store',
    };
    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/`, dbOptions);
    isDbConnected = true;

    console.info('[Service:Database] Connected.');
  } catch (error) {
    isDbConnected = false;
    console.error('[Service:Database] Err: Failed to Connect.', error);
    process.exit(1); // Exit the application with a failure code
  }
};


// If node exits, terminate mongoose connection
process.on('SIGINT', () => {
  console.info('INFO: Killing database connection');
  mongoose.connection.close();
  process.exit(0);
});

export { connectDB , ProductModel }
