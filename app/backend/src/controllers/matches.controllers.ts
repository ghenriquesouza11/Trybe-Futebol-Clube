import { Request, Response } from 'express';
import MatchesServices from '../services/matches.services';

export default class MatchesControllers {
  constructor(private matchesServices: MatchesServices = new MatchesServices()) { }

  async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.matchesServices.getAllMatches();

    const { inProgress } = req.query;

    if (inProgress === 'true') {
      const inProgressMatches = data.filter((match) => match.inProgress === true);

      return res.status(status).json(inProgressMatches);
    }
    if (inProgress === 'false') {
      const finishedMatches = data.filter((match) => match.inProgress === false);

      return res.status(status).json(finishedMatches);
    }

    return res.status(status).json(data);
  }

  async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { status, data } = await this.matchesServices.finishMatch(parseInt(id, 10));

    return res.status(status).json(data);
  }
}
