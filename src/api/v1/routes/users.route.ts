import express from 'express';
import usersController from '~/api/v1/controllers/users.controller';
import { verifyAccessToken } from '~/api/v1/middlewares/jwt.middleware';
import verifyRoles from '~/api/v1/middlewares/role.middleware';
import tryCatchWrapper from '~/api/v1/middlewares/tryCatch.middleware';
import roles from '~/configs/roles.config';

const usersRouter = express.Router();

usersRouter
  .route('/')
  .get(verifyAccessToken, verifyRoles(roles.user), tryCatchWrapper.async(usersController.getAll))
  .post();

export default usersRouter;
