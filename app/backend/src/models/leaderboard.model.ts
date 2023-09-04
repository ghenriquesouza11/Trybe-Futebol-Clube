import { LeaderboardsModelsInterface } from '../Interfaces/Leaderboards/LeaderboardModelInterface';
import SequelizeMatches from '../database/models/matches.model';

export default class LeaderboardModels implements LeaderboardsModelsInterface {
  private mathesModel = SequelizeMatches;

  async totalGames(teamId: number): Promise<number> {
    const totalGames = (await this.mathesModel.findAll({ where: { homeTeamId: teamId } })).length;

    return totalGames;
  }

  async totalVictories(teamId: number): Promise<number> {
    const teamMatches = await this
      .mathesModel.findAll({ where: { homeTeamId: teamId, inProgress: false } });

    return teamMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
  }

  async totalDraws(teamId: number): Promise<number> {
    const teamMatches = await this
      .mathesModel.findAll({ where: { homeTeamId: teamId, inProgress: false } });

    return teamMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
  }

  async totalLosses(teamId: number): Promise<number> {
    const teamMatches = await this
      .mathesModel.findAll({ where: { homeTeamId: teamId, inProgress: false } });

    return teamMatches.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
  }

  async goalsFavor(teamId: number): Promise<number> {
    const teamMatches = await this
      .mathesModel.findAll({ where: { homeTeamId: teamId, inProgress: false } });

    let goalsFavor = 0;

    teamMatches.forEach((match) => {
      goalsFavor += match.homeTeamGoals;
    });

    return goalsFavor;
  }

  async goalsOwn(teamId: number): Promise<number> {
    const teamMatches = await this
      .mathesModel.findAll({ where: { homeTeamId: teamId, inProgress: false } });

    let goalsOwn = 0;

    teamMatches.forEach((match) => {
      goalsOwn += match.awayTeamGoals;
    });

    return goalsOwn;
  }
}
