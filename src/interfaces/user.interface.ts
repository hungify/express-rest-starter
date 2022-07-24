import JWT from 'jsonwebtoken';
import { Role } from '~/interfaces/role.interface';

export interface User {
  username?: string;
  role?: Role;
  email: string;
  password: string;
}

export interface Payload {
  userId: string;
  role: Role;
}

export type JwtPayload = Payload & JWT.JwtPayload;
