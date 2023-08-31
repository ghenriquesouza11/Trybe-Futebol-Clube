import { compareSync } from 'bcryptjs';
import UserModel from '../models/users.model';
import generateToken from '../utils/jwt.utils';

export default class UsersServices {
  constructor(private userModel: UserModel = new UserModel()) { }

  async login(credentials: { email: string, password: string }):
  Promise<{ status: number, data: { message: string } | { token: string } }> {
    const { password } = credentials;

    const user = await this.userModel.login(credentials);

    if (!user || !compareSync(password, user.password)) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }

    const token = generateToken({ id: user.id, email: user.email });

    return { status: 200, data: { token } };
  }
}
