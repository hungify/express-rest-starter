import express from 'express';
import heathController from '~/api/v1/controllers/heath.controller';

const heathRouter = express.Router();

heathRouter.route('/live').get(heathController.getHealth);

export default heathRouter;
