import { NextFunction, Request, Response } from 'express';
import httpErrors from 'http-errors';
import joi from 'joi';
import joiObjectId from 'joi-objectid';

const JoiObjectId = joiObjectId(joi);

const paramsValidation = {
  id(params: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const ids = params.reduce(
        (pre, cur) => ({
          ...pre,
          [cur]: JoiObjectId().required(),
        }),
        {},
      );
      const schema = joi.object(ids);
      try {
        await schema.validateAsync(req.params);
        return next();
      } catch (error) {
        return next(new httpErrors.BadRequest(error.message));
      }
    };
  },
};

export default paramsValidation;
