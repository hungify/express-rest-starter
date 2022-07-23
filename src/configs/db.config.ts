import mongoose from 'mongoose';
import { mongo } from '~/configs/env.config.dev';

const createConnection = (uri: string) => {
  const conn = mongoose.createConnection(uri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 5000,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
  });

  conn.on('disconnected', () => {
    mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
      keepAlive: true,
      keepAliveInitialDelay: 300000,
    });
  });

  process.on('SIGINT', async () => {
    await connectToMongoLocal.close();
    process.exit(0);
  });
  return conn;
};

let URI = '';

if (mongo.username && mongo.password) {
  URI = `mongodb://${mongo.username}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.databaseName}`;
} else {
  URI = `mongodb://${mongo.host}:${mongo.port}/${mongo.databaseName}`;
}

const connectToMongoLocal = createConnection(URI);

connectToMongoLocal.on('connected', () => {
  console.log('MongoDB connected');
});

connectToMongoLocal.on('error', err => {
  console.log('MongoDB error', err);
});

export default connectToMongoLocal;
