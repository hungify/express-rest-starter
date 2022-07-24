import { Request } from 'express';
import { JwtPayload } from '~/interfaces/user.interface';

export interface UserAuthRequest extends Request {
  payload: JwtPayload;
}
