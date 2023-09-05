import { Request, Response } from 'express';
import LeaderboardsServices from '../services/leaderboards.services';
import { TeamPerformance } from '../Interfaces/Leaderboards/LeaderboardModelInterface';

export default class LeaderboardControllers {
  constructor(private leaderboardServices = new LeaderboardsServices()) { }

  async getHomeTeamsPerformance(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboardServices.getHomeTeamsPerformance();

    const sortedData: TeamPerformance[] = data.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }

      if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }

      if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }

      return b.goalsFavor - a.goalsFavor;
    });

    return res.status(status).json(sortedData);
  }
}
