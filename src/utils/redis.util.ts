import redisClient from '~/configs/redis.config';

const redisQuery = {
  setWithTTL(key: string, value: object | string | number, ttlSeconds: number | string) {
    try {
      return redisClient.set(key, JSON.stringify(value), 'EX', ttlSeconds || 60);
    } catch (error) {
      throw new Error(error);
    }
  },
  getValue(key: string) {
    try {
      return redisClient.get(key);
    } catch (error) {
      throw new Error(error);
    }
  },
  updateNewTTL(key: string, ttlSeconds: number | string) {
    try {
      return redisClient.expire(key, ttlSeconds || 60);
    } catch (error) {
      throw new Error(error);
    }
  },
  updateKeepAlive(key: string, value: object | string | number) {
    try {
      return redisClient.set(key, JSON.stringify(value), 'KEEPTTL', 'XX');
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteKey(key: string) {
    try {
      return redisClient.del(key);
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default redisQuery;
