import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

export const createToken = (
  jwtPaylod: { userId: string; userRole: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPaylod, secret, {
    expiresIn: expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
