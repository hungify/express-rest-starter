import express from 'express';
import tryCatchWrapper from '~/api/v1/middlewares/tryCatch.middleware';
import authController from '~/api/v1/controllers/auth.controller';

const authRouter = express.Router();

authRouter.route('/register').post(tryCatchWrapper.async(authController.register));

authRouter.route('/login').post(tryCatchWrapper.async(authController.login));

authRouter.route('/refresh-token').post(tryCatchWrapper.async(authController.refreshToken));

authRouter.route('/logout').delete(tryCatchWrapper.async(authController.logout));

export default authRouter;
