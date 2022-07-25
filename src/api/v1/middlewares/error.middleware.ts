import { NextFunction, Request, Response } from 'express';
import type { Error } from '~/interfaces/error.interface';
import { logger } from '~/api/utils/logger';
import httpErrors from 'http-errors';

export const forward404Error = (req: Request, res: Response, next: NextFunction) => {
  next(new httpErrors.NotFound("This route doesn't exist"));
};

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = err.status || 500;
    const message: string = err.message || 'Something went wrong';
    logger(err);
    return res.status(status).json({
      message: message,
    });
  } catch (err) {
    next(err);
  }
};

export default errorMiddleware;
