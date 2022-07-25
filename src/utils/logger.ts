import { Error } from '~/api/interfaces/error.interface';
import { dateToDashes } from '~/api/utils/date.util';
import logEvents from '~/api/utils/logEvents.util';

export const logger = (err: Error) => {
  const dateTime = `${dateToDashes(new Date())}`;
  logEvents(`${err.name}: ${err.message}`, `log_${dateTime}.log`);
};
