import mongoose from 'mongoose';
import { mongo } from '~/configs/env.config.dev';

interface Connection {
  username?: string;
  password?: string;
  databaseName: string;
}

const createConnectionWithMongo = (host: string, port: number, options: Connection) => {
  const { username, password, databaseName } = options;
  const baseInfo = 'mongodb://';
  const hasCredentials = username && password;
  const uri = hasCredentials
    ? `${baseInfo}${username}:${password}@${host}:${port}/${databaseName}`
    : `${baseInfo}${host}:${port}/${databaseName}`;

  const conn = mongoose.createConnection(uri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 5000,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
  });

  conn.on('connected', () => {
    console.log('🐱‍🏍 MongoDB connected 🎉🎉🎉');
  });

  conn.on('error', (err) => {
    console.log('🐞🐞🐞 MongoDB error 💩💩💩', err);
    setTimeout(() => {
      console.log('🐱‍🏍 Recreate MongoDB connection ✨✨✨');
      createConnectionWithMongo(host, port, options);
    }, 5000);
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
    await conn.close();
    process.exit(0);
  });

  return conn;
};

const options: Connection = {
  password: mongo.password,
  username: mongo.username,
  databaseName: mongo.databaseName,
};

const connectToMongoLocal = createConnectionWithMongo(mongo.host, Number(mongo.port), options);

export default connectToMongoLocal;
