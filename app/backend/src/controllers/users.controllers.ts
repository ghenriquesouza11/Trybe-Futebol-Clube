import { Request, Response } from 'express';
import UsersServices from '../services/users.services';

export default class UsersControllers {
  constructor(private usersServices: UsersServices = new UsersServices()) { }

  async login(req: Request, res: Response): Promise<Response> {
    const credentials = req.body;

    const { status, data } = await this.usersServices.login(credentials);

    return res.status(status).json(data);
  }
}
