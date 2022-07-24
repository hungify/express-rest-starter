import express from 'express';
import userController from '~/api/v1/controllers/user.controller';
import verifyRoles from '~/api/v1/middlewares/role.middleware';
import tryCatchWrapper from '~/api/v1/middlewares/tryCatch.middleware';
import roles from '~/configs/roles.config';
import passport from '~/api/v1/middlewares/passport.middleware';
import paramsValidation from '~/api/v1/validations/param.validation';

const userRouter = express.Router();

userRouter
  .route('/')
  .get(
    passport.authenticate('jwt', {
      session: false,
    }),
    verifyRoles(roles.user),
    tryCatchWrapper.async(userController.getAll),
  )
  .post();

userRouter.route('/:userId').get(
  paramsValidation.id(['userId']),
  passport.authenticate('jwt', {
    session: false,
  }),
  verifyRoles(roles.user),
  tryCatchWrapper.async(userController.getUserById),
);

export default userRouter;
