import { User } from '../user.interface';

export interface UsersModelInterface {
  login(credentials: { email: string, password: string }): Promise<User | null>
}
