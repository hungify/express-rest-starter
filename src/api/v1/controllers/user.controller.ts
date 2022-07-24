import { Response } from 'express';
import { UserAuthRequest } from '~/api/interfaces/core.interface';
import usersService from '~/api/v1/services/user.service';

const usersController = {
  async getAll(req: UserAuthRequest, res: Response) {
    const users = await usersService.getUsers();
    return res.status(200).json({
      users,
    });
  },

  async getUserById(req: UserAuthRequest, res: Response) {
    const { userId } = req.params;
    const user = await usersService.getUserById(userId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    return res.status(200).json({
      user,
    });
  },
};

export default usersController;
