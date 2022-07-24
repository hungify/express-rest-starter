import { NextFunction, Response } from 'express';
import httpErrors from 'http-errors';
import JWT from 'jsonwebtoken';
import { jwt } from '~/configs/env.config.dev';
import { UserAuthRequest } from '~/interfaces/core.interface';
import { JwtPayload } from '~/interfaces/jwt.interface';
import redisQuery from '~/utils/redis.util';

export const verifyAccessToken = async (req: UserAuthRequest, res: Response, next: NextFunction) => {
  try {
    let token = req.headers['authorization'];

    if (!token) return next(new httpErrors.Unauthorized('No token provided'));
    if (token.startsWith('Bearer ')) token = token.slice(7, token.length);

    const secret = jwt.accessTokenSecret;

    const payload = (await JWT.verify(token, secret)) as JwtPayload;
    req.user = payload;
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new httpErrors.Unauthorized('access token has expired'));
    } else if (err.name === 'JsonWebTokenError') {
      return next(new httpErrors.Unauthorized('invalid access token'));
    } else {
      return next(new httpErrors.InternalServerError(err.message));
    }
  }
};

export const verifyRefreshToken = async (refreshToken: string) => {
  try {
    const secret = jwt.refreshTokenSecret;
    const payload = (await JWT.verify(refreshToken, secret)) as JwtPayload;
    if (payload) {
      const userId = payload.userId;
      const redisValue = JSON.parse(await redisQuery.getValue(userId));

      if (redisValue === refreshToken) {
        return payload;
      }
    }
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return new httpErrors.Unauthorized('refresh token has expired');
    } else if (err.name === 'JsonWebTokenError') {
      return new httpErrors.Unauthorized('invalid refresh token');
    } else if (err.name === 'NotBeforeError') {
      return new httpErrors.Unauthorized('refresh token is not yet valid');
    } else {
      return new httpErrors.InternalServerError(err.message);
    }
  }
};
