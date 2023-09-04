import SequelizeTeams from '../database/models/teams.model';
import SequelizeMatches from '../database/models/matches.model';
import { MatchesModelInterface } from '../Interfaces/Matches/MatchesModelInterface';
import { Match } from '../Interfaces/matches.interface';

export default class MatchesModels implements MatchesModelInterface {
  private model = SequelizeMatches;

  async getAllMatches(): Promise<SequelizeMatches[]> {
    const allMatches = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return allMatches;
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(matchData: { homeTeamGoals: number; awayTeamGoals: number }, id: number):
  Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = matchData;
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async createMatch(matchData: Omit<Match, 'id'>): Promise<Match> {
    const createdMatch = await this.model.create(matchData);

    const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }:
    Match = createdMatch;

    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }
}
