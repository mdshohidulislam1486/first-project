/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.const';

export interface IUser {
  id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<IUser> {
  // myStaticMethod(): number;
  isUserExistByCustomId(id: string): Promise<IUser>;
  isPasswordMatched(
    palingTextPass: string,
    hashPassword: string
  ): Promise<boolean>;
  isDeleted(id: string): Promise<boolean>;
  isBlocked(id: string): Promise<string>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimeStamp: Date,
    jwtIssuedTimeStap: number
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
