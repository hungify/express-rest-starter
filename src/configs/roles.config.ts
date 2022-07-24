import { Role } from '~/interfaces/role.interface';
interface Roles {
  [key: string]: Role;
}
const roles: Roles = {
  user: 'user',
  admin: 'admin',
};

export default roles;
