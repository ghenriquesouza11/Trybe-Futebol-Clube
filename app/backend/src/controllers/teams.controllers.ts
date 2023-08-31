import { Request, Response } from 'express';
import TeamsServices from '../services/teams.services';

export default class TeamsControllers {
  constructor(
    private teamsServices: TeamsServices = new TeamsServices(),
  ) { }

  async findAll(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.teamsServices.findAll();

    return res.status(status).json(data);
  }
}
