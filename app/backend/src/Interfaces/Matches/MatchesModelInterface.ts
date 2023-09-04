import SequelizeMatches from '../../database/models/matches.model';
import { Match } from '../matches.interface';

export interface MatchesModelInterface {
  getAllMatches(): Promise<SequelizeMatches[] >;

  finishMatch(id: number): Promise<void>;

  updateMatch(matchData: { homeTeamGoals: number, awayTeamGoals: number }, id: number):
  Promise<void>;

  createMatch(matchData: Partial<Match>): Promise<Match>;
}
