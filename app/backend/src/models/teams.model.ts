import SequelizeTeams from '../database/models/teams.model';
import { TeamsModelInterface } from '../Interfaces/Teams/TeamsModelInterface';
import { Teams } from '../Interfaces/teams.interface';

export default class TeamsModel implements TeamsModelInterface {
  private model = SequelizeTeams;

  async findAll(): Promise<Teams[]> {
    const allTeams = await this.model.findAll();

    return allTeams.map((team) => ({
      id: team.id,
      teamName: team.teamName,
    }));
  }

  async findByPk(id: Teams['id']): Promise<Teams | null> {
    const team = await this.model.findByPk(id);

    if (team === null) {
      return null;
    }

    return { id, teamName: team.teamName };
  }
}
