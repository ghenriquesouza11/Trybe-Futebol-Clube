import SequelizeMatches from '../database/models/matches.model';
import MatchesModels from '../models/matches.model';

export default class MatchesServices {
  constructor(private matchesModels: MatchesModels = new MatchesModels()) { }

  async getAllMatches(): Promise<{ status: number, data: SequelizeMatches[] }> {
    const allMatches = await this.matchesModels.getAllMatches();

    return { status: 200, data: allMatches };
  }

  async finishMatch(id: number): Promise<{ status: number, data: { message: string } }> {
    await this.matchesModels.finishMatch(id);

    return { status: 200, data: { message: 'Finished' } };
  }
}
