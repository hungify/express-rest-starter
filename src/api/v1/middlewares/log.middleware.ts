import { dateToDashes } from '~/api/utils/date.util';
import logEvents from '~/api/utils/logEvents.util';

const logToFile = (err: Error) => {
  const dateTime = `${dateToDashes(new Date())}`;

  logEvents(`${err.name}: ${err.message}`, `log_${dateTime}.log`);
};

export default logToFile;
