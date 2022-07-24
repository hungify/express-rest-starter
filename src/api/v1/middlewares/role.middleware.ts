import { NextFunction, Response } from 'express';
import httpErrors from 'http-errors';
import { UserAuthRequest } from '~/interfaces/core.interface';
import { Role } from '~/interfaces/role.interface';

const verifyRoles = (allowedRoles: Role[] | Role) => {
  return (req: UserAuthRequest, res: Response, next: NextFunction) => {
    if (allowedRoles.length > 0) {
      if (req?.user?.role && allowedRoles.includes(req?.user?.role)) {
        return next();
      } else {
        return next(new httpErrors.Forbidden("You don't have permission to access this resource"));
      }
    } else {
      return next(new httpErrors.BadRequest('Please define some roles in this route'));
    }
  };
};

export default verifyRoles;
