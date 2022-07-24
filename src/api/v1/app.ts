import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import connectToMongoLocal from '~/configs/db.config';
import rootRouter from '~/api/v1/routes';
import multerErrorHandler from '~/api/v1/middlewares/multer.middleware';
import corsOptions from '~/configs/cors.config';
import errorHandler, { forwardError } from '~/api/v1/middlewares/error.middleware';
import logToFile from '~/api/v1/middlewares/log.middleware';
import passport from '~/api/v1/middlewares/passport.middleware';

const bootstrap = () => {
  const app = express();
  app.use([
    helmet(),
    morgan('dev'),
    compression(),
    cookieParser(),
    express.json(),
    passport.initialize(),
    cors(corsOptions),
    multerErrorHandler,
  ]);
  app.use('/api/v1', rootRouter);

  app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
      message: 'The API Server is running!. Redirect to /api/v1 to see the API endpoints.',
    });
  });

  app.use(forwardError);
  app.use(errorHandler);
  app.use(logToFile);

  return app;
};

const app = bootstrap();

if (connectToMongoLocal) {
  connectToMongoLocal.on('open', () => {
    app.emit('ready');
  });
}

export default app;
