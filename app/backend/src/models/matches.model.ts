import SequelizeTeams from '../database/models/teams.model';
import SequelizeMatches from '../database/models/matches.model';
import { MatchesModelInterface } from '../Interfaces/Matches/MatchesModelInterface';

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
}
