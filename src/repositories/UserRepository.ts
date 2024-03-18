import { ModelStatic } from 'sequelize';
import User from '../database/models/User';
import IUserRepository from '../interfaces/IUserRepository';
import IUserData from '../interfaces/IUserData';
import IUserDataAuthentication from '../interfaces/IUserDataAuthentication';
import { Op } from 'sequelize';

class UserRepository implements IUserRepository {
  private user: ModelStatic<User> = User;

  async store(userData: IUserData): Promise<User> {
    const { username, email, password } = userData;
    const user = await this.user.create({ username, email, password });
    return user;
  }

  async findUserById(id: number): Promise<User | null> {
    const user = await this.user.findByPk(id);
    return user;
  }

  async removeUser(user: User): Promise<void> {
    return await user.destroy();
  }

  async editUser(user: User, newData: IUserData): Promise<User | null> {
    return await user.update(newData);
  }

  async findUserByEmail(userEmail: string): Promise<User | null> {
    return await this.user.findOne({ where: { email: userEmail } });
  }

  async findUserByLoginMethod(
    user: Partial<IUserDataAuthentication>,
  ): Promise<User | null> {
    const { loginContent } = user;
    return await this.user.findOne({
      where: {
        [Op.or]: [{ username: loginContent }, { email: loginContent }],
      },
    });
  }
}

export default UserRepository;
