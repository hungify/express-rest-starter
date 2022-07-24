import { JwtPayload, Payload } from '~/interfaces/user.interface';
import httpErrors from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { jwt, redis } from '~/configs/env.config.dev';
import redisQuery from '~/utils/redis.util';

export const signInAccessToken = async ({ userId, role }: Payload) => {
  try {
    if (!userId || !role) return new httpErrors.Unauthorized("User isn't authorized");

    const payload = { userId, role };
    const secret = jwt.accessTokenSecret;
    const expiresIn = jwt.accessTokenExpiresIn;
    const options = {
      expiresIn,
    };

    const accessToken = await JWT.sign(payload, secret, options);
    return accessToken;
  } catch (err) {
    return new httpErrors.InternalServerError(err.message);
  }
};

export const signInRefreshToken = async ({ userId, role }: Payload) => {
  try {
    const payload = { userId, role };
    const secret = jwt.refreshTokenSecret;
    const expiresIn = jwt.refreshTokenExpiresIn;
    const redisExpiresIn = redis.expireIn;
    const options = {
      expiresIn,
    };

    const refreshToken = await JWT.sign(payload, secret, options);
    await redisQuery.setWithTTL(userId, refreshToken, redisExpiresIn);
    return refreshToken;
  } catch (err) {
    return new httpErrors.InternalServerError(err.message);
  }
};

export const getPayload = async (req: Request) => {
  try {
    let token = req.headers['authorization'];

    if (!token) return null;
    if (token.startsWith('Bearer ')) token = token.slice(7, token.length);

    const secret = jwt.accessTokenSecret;
    const payload = (await JWT.verify(token, secret)) as JwtPayload;
    return payload;
  } catch (error) {
    return null;
  }
};

export const revokeRefreshToken = async (userId: string) => {
  try {
    if (!userId) return;
    await redisQuery.deleteKey(userId);
  } catch (error) {
    return new httpErrors.InternalServerError(error.message);
  }
};
