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
      const totalDraws = await this.leaderboardModel.totalDraws(team.id);
      const totalGames = await this.leaderboardModel.totalGames(team.id);

      return { name: team.teamName,
        totalPoints: ((await this.leaderboardModel.totalVictories(team.id)) * 3) + totalDraws,
        totalGames,
        totalVictories: await this.leaderboardModel.totalVictories(team.id),
        totalDraws,
        totalLosses: await this.leaderboardModel.totalLosses(team.id),
        goalsFavor: await this.leaderboardModel.goalsFavor(team.id),
        goalsOwn: await this.leaderboardModel.goalsOwn(team.id),
        goalsBalance: (await this.leaderboardModel.goalsFavor(team.id))
         - (await this.leaderboardModel.goalsOwn(team.id)),
        efficiency: (((((await this.leaderboardModel
          .totalVictories(team.id)) * 3) + totalDraws) / (totalGames * 3)) * 100).toFixed(2) };
    }));

    return { status: 200, data: performances };
  }
}
