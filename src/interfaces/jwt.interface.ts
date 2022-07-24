import { Role } from '~/api/interfaces/role.interface';
import JWT from 'jsonwebtoken';

export interface Payload {
  userId: string;
  role: Role;
}

export type JwtPayload = Payload & JWT.JwtPayload;
