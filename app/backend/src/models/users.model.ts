import { UsersModelInterface } from '../Interfaces/Users/UsersModelInterface';
import SequelizeUsers from '../database/models/users.model';
import { User } from '../Interfaces/user.interface';

export default class UserModel implements UsersModelInterface {
  private model = SequelizeUsers;

  async login(credentials: { email: string; password: string; }):
  Promise<User | null> {
    const { email } = credentials;

    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    return user;
  }

  async role(id: number): Promise<{ role: string; } | null> {
    const user = await this.model.findByPk(id);

    if (!user) {
      return null;
    }

    return { role: user.role };
  }
}
