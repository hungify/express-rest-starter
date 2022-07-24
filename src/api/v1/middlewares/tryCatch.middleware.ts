import { NextFunction, Request, Response } from 'express';

type ExpressPromiseFunction = (req: Request, res?: Response, next?: NextFunction) => void;
type ExpressFunction = (req: Request, res: Response, next: NextFunction) => void;

const tryCatchWrapper = {
  sync: function (cb: ExpressFunction): ExpressFunction {
    return function (req: Request, res: Response, next: NextFunction) {
      try {
        return cb.call(this, req, res, next);
      } catch (err) {
        next(err);
      }
    };
  },
  async: function (cb: ExpressPromiseFunction): ExpressPromiseFunction {
    return async function (req: Request, res: Response, next: NextFunction) {
      try {
        await cb.call(this, req, res, next).catch(next);
      } catch (err) {
        next(err);
      }
    };
  },
};

export default tryCatchWrapper;
