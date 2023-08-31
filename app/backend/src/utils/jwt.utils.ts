import { JwtPayload } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const generateToken = (payload: JwtPayload) => jwt.sign(payload, secret);

export default generateToken;
