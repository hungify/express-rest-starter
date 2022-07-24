import { NextFunction, Request, Response } from 'express';
import type { Error } from '~/interfaces/error.interface';
import httpErrors from 'http-errors';

export const forwardError = (req: Request, res: Response, next: NextFunction) => {
  next(new httpErrors.NotFound("This route doesn't exist"));
};

const errorHandler = (err: Error, req: Request, res: Response) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  return res.status(err.status || 500).json({
    message: err.message,
  });
};

export default errorHandler;
