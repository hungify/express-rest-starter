import { Request, Response } from 'express';
import usersService from '~/api/v1/services/user.service';

const usersController = {
  async getAll(req: Request, res: Response) {
    const users = await usersService.getUsers();
    return res.status(200).json({
      users,
    });
  },
};

export default usersController;
