import { redis } from '~/configs/env.config.dev';
import Redis from 'ioredis';

const redisClient = new Redis(Number(redis.port), redis.host, {
  password: redis.password,
});

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('ready', () => {
  console.log('Redis client is ready');
});

redisClient.on('error', function (err) {
  if (err.code == 'ECONNREFUSED') {
    return redisClient.disconnect();
  } else {
    console.log('🐞🐞🐞 Redis error 💩💩💩', err);
    throw new Error(err);
  }
});

export default redisClient;
