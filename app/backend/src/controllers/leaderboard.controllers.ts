import { Request, Response } from 'express';
import LeaderboardsServices from '../services/leaderboards.services';

export default class LeaderboardControllers {
  constructor(private leaderboardServices = new LeaderboardsServices()) { }

  async getHomeTeamsPerformance(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboardServices.getHomeTeamsPerformance();

    return res.status(status).json(data);
  }
}
