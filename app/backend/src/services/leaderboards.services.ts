import TeamsModel from '../models/teams.model';
import { TeamsModelInterface } from '../Interfaces/Teams/TeamsModelInterface';
import LeaderboardModels from '../models/leaderboard.model';
import { TeamPerformance } from '../Interfaces/Leaderboards/LeaderboardModelInterface';

export default class LeaderboardsServices {
  constructor(
    private teamsModel: TeamsModelInterface = new TeamsModel(),
    private leaderboardModel = new LeaderboardModels(),
  ) { }

  async getHomeTeamsPerformance(): Promise<{ status: number, data: TeamPerformance[] }> {
    const allTeams = await this.teamsModel.findAll();

    const performances = await Promise.all(allTeams.map(async (team) => {
      const totalGames = await this.leaderboardModel.totalGames(team.id);
      const totalVictories = await this.leaderboardModel.totalVictories(team.id);
      const totalDraws = await this.leaderboardModel.totalDraws(team.id);
      const totalLosses = await this.leaderboardModel.totalLosses(team.id);
      const goalsFavor = await this.leaderboardModel.goalsFavor(team.id);
      const goalsOwn = await this.leaderboardModel.goalsOwn(team.id);

      return { name: team.teamName,
        totalPoints: (totalVictories * 3) + totalDraws,
        totalGames,
        totalVictories,
        totalDraws,
        totalLosses,
        goalsFavor,
        goalsOwn };
    }));

    return { status: 200, data: performances };
  }
}
