import SequelizeMatches from '../../database/models/matches.model';

export interface MatchesModelInterface {
  getAllMatches(): Promise<SequelizeMatches[] >
}
