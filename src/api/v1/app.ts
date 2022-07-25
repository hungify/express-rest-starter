import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import errorMiddleware, { forward404Error } from '~/api/v1/middlewares/error.middleware';
import multerErrorHandler from '~/api/v1/middlewares/multer.middleware';
import passport from '~/api/v1/middlewares/passport.middleware';
import rootRouter from '~/api/v1/routes';
import corsOptions from '~/configs/cors.config';
import connectToMongoLocal from '~/configs/db.config';

const bootstrap = () => {
  const app = express();
  app.use([
    helmet(),
    morgan('dev'),
    compression(),
    cookieParser(),
    express.json(),
    passport.initialize(),
    express.urlencoded({ extended: false }),
    cors(corsOptions),
  ]);
  app.use('/api/v1', rootRouter);

  app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
      message: 'The API Server is running!. Redirect to /api/v1 to see the API endpoints.',
    });
  });

  app.use(forward404Error);
  app.use(multerErrorHandler);
  app.use(errorMiddleware);

  return app;
};

const app = bootstrap();

if (connectToMongoLocal) {
  connectToMongoLocal.on('open', () => {
    app.emit('ready');
  });
}

export default app;
