import { NextFunction, Request, Response } from 'express';
import { verify, extractToken } from '../utils/jwt.utils';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const emailParam = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailParam.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const token = extractToken(authorization);
    try {
      verify(token);
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default Validations;
