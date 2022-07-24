import { Request, Response } from 'express';

const heathController = {
  getHealth: (req: Request, res: Response) => {
    return res.status(200).json({
      message: 'The API Server is running!.',
    });
  },
};

export default heathController;
