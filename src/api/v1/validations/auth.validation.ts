import joi from 'joi';
import httpErrors from 'http-errors';
import { NextFunction, Request, Response } from 'express';

const authValidation = {
  async login(req: Request, res: Response, next: NextFunction) {
    const userSchema = joi
      .object({
        username: joi.string().required(),
        role: joi.string().valid('admin', 'user'),
        password: joi.string().min(6).max(30).required(),
        email: joi.string().email().required(),
      })
      .when('.role', {
        is: 'admin',
        then: joi.object().keys({
          department: joi.string(),
        }),
      })
      .when('.role', {
        is: 'user',
        then: joi.object().keys({
          department: joi.string().required(),
        }),
      });
    try {
      await userSchema.validateAsync(req.body);
      return next();
    } catch (error) {
      return next(new httpErrors.BadRequest(error.message));
    }
  },

  async register(req: Request, res: Response, next: NextFunction) {
    const userSchema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).max(30).required(),
    });
    try {
      await userSchema.validateAsync(req.body);
      return next();
    } catch (error) {
      return next(new httpErrors.BadRequest(error.message));
    }
  },

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    const refreshTokenSchema = joi.object({
      refreshToken: joi.string().required(),
    });
    try {
      await refreshTokenSchema.validateAsync(req.body);
      return next();
    } catch (error) {
      return next(new httpErrors.BadRequest(error.message));
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    const logoutSchema = joi.object({
      refreshToken: joi.string().required(),
    });
    try {
      await logoutSchema.validateAsync(req.params);
      return next();
    } catch (error) {
      return next(new httpErrors.BadRequest(error.message));
    }
  },
};

export default authValidation;
