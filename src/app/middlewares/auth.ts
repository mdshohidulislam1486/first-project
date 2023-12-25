import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
// this is one way to extends express request object but we will declare it globally
// interface CustomRequest extends Request {
//   user: JwtPayload;
// }
export const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // if token foudn from client

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;
    const { userId, userRole, iat } = decoded;
    const user = await User.isUserExistByCustomId(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    if (await User.isDeleted(user.id)) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }
    if ((await User.isBlocked(user.id)) === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    // jwt.verify(token, config.jwt_secret as string, function (err, decoded) {
    //   if (err) {
    //     throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    //   }
    const role = (decoded as JwtPayload).userRole;
    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized d');
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized c');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
