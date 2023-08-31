import { Teams } from '../teams.interface';

export interface TeamsModelInterface {
  findAll(): Promise<Teams[]>;
}
