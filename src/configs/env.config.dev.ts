import dotenv from 'dotenv';
dotenv.config();

const redis = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  expireIn: process.env.REDIS_EXPIRE_IN,
  connectTimeout: process.env.REDIS_CONNECT_TIMEOUT,
};

const s3 = {
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION_NAME,
  bucket: process.env.S3_BUCKET_NAME,
};

const jwt = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
};

const mongo = {
  username: process.env.MONGO_DB_USERNAME,
  password: process.env.MONGO_DB_PASSWORD,
  host: process.env.MONGO_DB_HOST,
  port: process.env.MONGO_DB_PORT,
  databaseName: process.env.MONGO_DB_NAME,
  authSource: process.env.MONGO_DB_AUTH_SOURCE,
};

const port = process.env.PORT || process.env.APP_PORT;

export { redis, s3, jwt, mongo, port };
