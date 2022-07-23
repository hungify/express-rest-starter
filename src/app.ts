import httpErrors from 'http-errors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import connectToMongoLocal from '~/configs/db.config';

const bootstrap = () => {
  const app = express();
  app.use([helmet(), cors(), morgan('dev'), compression(), cookieParser(), express.json()]);
  app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
      message: 'The API Server is running!. Redirect to /api/v1 to see the API endpoints.',
    });
  });
  return app;
};

const app = bootstrap();

if (connectToMongoLocal) {
  connectToMongoLocal.on('open', () => {
    app.emit('ready');
  });
}

export default app;
