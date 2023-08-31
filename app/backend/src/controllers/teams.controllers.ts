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

  async findByPk(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { status, data } = await this.teamsServices.findByPk(parseInt(id, 10));

    return res.status(status).json(data);
  }
}
