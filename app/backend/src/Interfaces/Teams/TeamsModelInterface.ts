import { Teams } from '../teams.interface';

export interface TeamsModelInterface {
  findAll(): Promise<Teams[]>;

  findByPk(id: Teams['id']): Promise<Teams | null>;
}
