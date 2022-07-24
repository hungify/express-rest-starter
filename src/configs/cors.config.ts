import { CorsOptions } from 'cors';

const whitelist = ['http://localhost:3000'];

const corsOptions: CorsOptions = {
  origin: (origin: string, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
