import { TeamsModelInterface } from '../Interfaces/Teams/TeamsModelInterface';
import { Teams } from '../Interfaces/teams.interface';
import TeamsModel from '../models/teams.model';

export default class TeamsServices {
  constructor(
    private teamsModel: TeamsModelInterface = new TeamsModel(),
  ) { }

  async findAll(): Promise<{ status: number, data: Teams[] }> {
    const allTeams = await this.teamsModel.findAll();

    return { status: 200, data: allTeams };
  }
}
