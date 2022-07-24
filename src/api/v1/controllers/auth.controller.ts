import { Request, Response } from 'express';
import userService from '~/api/v1/services/user.service';
import httpErrors from 'http-errors';
import { dayToSeconds } from '~/utils/date.util';
import { jwt } from '~/configs/env.config.dev';
import { revokeRefreshToken, signInAccessToken, signInRefreshToken } from '~/api/v1/services/auth.service';
import { verifyRefreshToken } from '~/api/v1/middlewares/jwt.middleware';

const authController = {
  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const foundUser = await userService.getUserByEmail(email);
    if (foundUser) {
      throw new httpErrors.Conflict(`User with email "${email}" already exists`);
    }

    const savedUser = await userService.saveUser({
      username,
      email,
      password,
    });

    return res.status(201).json({
      message: 'success',
      data: savedUser,
    });
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const foundUser = await userService.getUserByEmail(email);

    if (!foundUser) {
      throw new httpErrors.NotFound('Email or password is incorrect');
    }

    const isPasswordValid = await foundUser.isValidPassword(password);
    if (!isPasswordValid) {
      throw new httpErrors.Unauthorized('Email or password is incorrect');
    }

    const accessToken = await signInAccessToken({
      userId: foundUser._id,
      role: foundUser.role,
    });
    const refreshToken = await signInRefreshToken({
      userId: foundUser._id,
      role: foundUser.role,
    });
    if (!accessToken || !refreshToken) {
      throw new httpErrors.InternalServerError('Error while generating tokens');
    }

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: true,
      secure: false, //True in production
      maxAge: dayToSeconds(jwt.refreshTokenExpiresIn),
    });
    return res.status(200).json({
      message: 'success',
      data: {
        accessToken,
        role: foundUser.role,
        userId: foundUser._id,
      },
    });
  },

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) throw new httpErrors.BadRequest('Refresh token is required');

    const { userId, role } = await verifyRefreshToken(refreshToken);
    const newAccessToken = await signInAccessToken({ userId, role });
    const newRefreshToken = await signInRefreshToken({ userId, role });

    if (!newAccessToken || !newRefreshToken) {
      throw new httpErrors.InternalServerError('Error while generating tokens');
    }

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      maxAge: dayToSeconds(jwt.refreshTokenExpiresIn),
      sameSite: true,
      secure: false, //True in production
    });
    return res.status(200).json({
      message: 'success',
      data: {
        accessToken: newAccessToken,
        userId: userId,
        role: role,
      },
    });
  },

  async logout(req: Request, res: Response) {
    let { refreshToken } = req.params;
    if (!refreshToken) throw new httpErrors.BadRequest('Refresh token is required');
    if (refreshToken.startsWith('Bearer ')) refreshToken = refreshToken.slice(7);
    if (!refreshToken) {
      throw new httpErrors.BadRequest('Refresh token is required');
    }

    const payload = await verifyRefreshToken(refreshToken);
    await revokeRefreshToken(payload?.userId);

    res.clearCookie('refreshToken');
    return res.status(200).json({
      message: 'success',
    });
  },
};

export default authController;
