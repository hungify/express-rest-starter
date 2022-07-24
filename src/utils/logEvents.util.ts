import path from 'path';
import fs from 'fs';
import { dateToDashesWithTime } from '~/api/utils/date.util';

const fsPromises = fs.promises;

const logEvents = async (message: string, fileLogName: string) => {
  const dateTime = `${dateToDashesWithTime(new Date())}`;
  if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
    fs.mkdirSync(path.join(__dirname, '..', 'logs'));
  }
  const logFilePath = path.join(__dirname, '..', 'logs', fileLogName);
  const logItem = `${dateTime}\t${message}\n`;

  try {
    await fsPromises.appendFile(logFilePath, logItem);
  } catch (err) {
    throw new Error(err);
  }
};

export default logEvents;
