import { NextFunction, Request, Response } from 'express';
import { dateToDashes } from '~/api/utils/date.util';
import logEvents from '~/api/utils/logEvents.util';

const logToFile = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const dateTime = `${dateToDashes(new Date())}`;

  logEvents(`${err.name}: ${err.message}`, `log_${dateTime}.log`);
  next(err);
};

export default logToFile;
