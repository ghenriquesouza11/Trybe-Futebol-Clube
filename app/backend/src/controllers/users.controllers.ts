import { Request, Response } from 'express';
import { extractToken, verify } from '../utils/jwt.utils';
import UsersServices from '../services/users.services';

export default class UsersControllers {
  constructor(private usersServices: UsersServices = new UsersServices()) { }

  async login(req: Request, res: Response): Promise<Response> {
    const credentials = req.body;

    const { status, data } = await this.usersServices.login(credentials);

    return res.status(status).json(data);
  }

  async role(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = extractToken(authorization);

    const { id } = verify(token);

    const { status, data } = await this.usersServices.role(id);

    return res.status(status).json(data);
  }
}
