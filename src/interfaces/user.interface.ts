import JWT from 'jsonwebtoken';
import { Role } from '~/interfaces/role.interface';

export interface User {
  username?: string;
  role?: Role;
  email: string;
  password: string;
}
