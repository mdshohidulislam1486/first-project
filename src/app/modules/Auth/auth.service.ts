import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from './auth.utils';
import { sendEmail } from '../../utils/setEmail';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist

  const user = await User.isUserExistByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  // const isDeleted = user?.isDeleted;

  // if (isDeleted) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  // }
  if (await User.isDeleted(user.id)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }
  if ((await User.isBlocked(user.id)) === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }
  // // checking if the user is blocked

  // const userStatus = isUserExists?.status;
  // if (userStatus === 'blocked') {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  // }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    //checking if the password is correct
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect');
    // create token and sent to the client
  }
  const jwtPaylod = {
    userId: user.id,
    userRole: user.role,
  };
  const accessToken = createToken(
    jwtPaylod,
    config.jwt_access_secret as string,
    config.jwt_access_expired_in as string
  );
  const refreshToken = createToken(
    jwtPaylod,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expired_in as string
  );

  // Access Granted: Send AccessToken , RefreshToken
  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
  }
) => {
  const user = await User.isUserExistByCustomId(userData.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  // const isDeleted = user?.isDeleted;

  // if (isDeleted) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  // }
  if (await User.isDeleted(user.id)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }
  if ((await User.isBlocked(user.id)) === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }
  // // checking if the user is blocked

  // const userStatus = isUserExists?.status;
  // if (userStatus === 'blocked') {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  // }

  if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password))) {
    //checking if the password is correct
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect');
    // create token and sent to the client
  }

  // hash new password
  const newHassPass = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );
  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.userRole,
    },
    {
      password: newHassPass,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );
  return null;
};

const refreshToken = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);
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

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized ');
  }

  const jwtPaylod = {
    userId: user.id,
    userRole: user.role,
  };
  const accessToken = createToken(
    jwtPaylod,
    config.jwt_access_secret as string,
    config.jwt_access_expired_in as string
  );
  return { accessToken };
};

const forgetPassword = async (userId: string) => {
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
  const jwtPaylod = {
    userId: user.id,
    userRole: user.role,
  };
  const resetToken = createToken(
    jwtPaylod,
    config.jwt_access_secret as string,
    '10m'
  );
  const resetUILink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken}`;
  sendEmail(user.email, resetUILink);
};

const resetPassword = async (
  payload: {
    id: string;
    newPassword: string;
  },
  token: string
) => {
  const user = await User.isUserExistByCustomId(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  if (await User.isDeleted(user.id)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }
  if ((await User.isBlocked(user.id)) === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }
  const decoded = verifyToken(token, config.jwt_access_secret as string);
  console.log(payload, decoded);
  if (payload.id !== decoded.userId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are forbidden to change this passs'
    );
  }
  const newHassPass = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );
  await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.userRole,
    },
    {
      password: newHassPass,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
