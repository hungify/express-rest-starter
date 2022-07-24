import express from 'express';
import authRouter from '~/api/v1/routes/auth.route';
import heathRouter from '~/api/v1/routes/heath.route';
import usersRouter from '~/api/v1/routes/users.route';

const rootRouter = express.Router();

/** Heath APIs */
rootRouter.use('/heath', heathRouter);

/** Auth APIs */
rootRouter.use('/auth', authRouter);

/** Users APIs */
rootRouter.use('/users', usersRouter);

export default rootRouter;
