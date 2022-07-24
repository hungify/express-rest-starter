import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import httpErrors from 'http-errors';
import type { MulterError } from '~/interfaces/error.interface';

const multerErrorHandler = (err: MulterError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return next(httpErrors(413, 'File too large'));
    }

    if (err.code === 'LIMIT_FILE_COUNT') {
      return next(httpErrors(413, 'Too many files'));
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return next(httpErrors(413, 'Unexpected file'));
    }
  }
  next(err);
};

export default multerErrorHandler;
