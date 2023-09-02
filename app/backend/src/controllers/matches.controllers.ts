import { Request, Response } from 'express';
import MatchesServices from '../services/matches.services';

export default class MatchesControllers {
  constructor(private matchesServices: MatchesServices = new MatchesServices()) { }

  async getAllMatches(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.matchesServices.getAllMatches();

    return res.status(status).json(data);
  }
}
