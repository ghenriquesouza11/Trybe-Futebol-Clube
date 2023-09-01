import { JwtPayload } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export const generateToken = (payload: JwtPayload) => jwt.sign(payload, secret);

export const extractToken = (token: string) => (
  token.split(' ')[1]
);

export const verify = (token: string): JwtPayload => {
  const data = jwt.verify(token, secret) as JwtPayload;

  return data;
};
