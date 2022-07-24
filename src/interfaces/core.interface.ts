import { Request } from 'express';
import { JwtPayload } from '~/interfaces/jwt.interface';

export interface UserAuthRequest extends Request {
  user: JwtPayload; // same as passport jwt payload
}
