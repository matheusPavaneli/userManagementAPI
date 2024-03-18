import User from '../database/models/User';
import IUserDataResponse from '../interfaces/IUserDataResponse';
import IUserData from '../interfaces/IUserData';
import IUserRepository from '../interfaces/IUserRepository';
import IUserService from '../interfaces/IUserService';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from '../utils/ApiError';

class UserService implements IUserService {
  private UserRepository: IUserRepository;

  constructor(UserRepository: IUserRepository) {
    this.UserRepository = UserRepository;
  }

  async store(userData: IUserData): Promise<IUserDataResponse> {
    const newUser = await this.UserRepository.store(userData);

    if (!newUser) {
      throw new BadRequestError('Error creating user');
    }

    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      twoStep: newUser.twoStep,
    };
  }

  async delete(id: number): Promise<User> {
    const user = await this.UserRepository.findUserById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (id !== user.id) {
      throw new ForbiddenError(
        'You do not have permission to perform this action',
      );
    }

    await this.UserRepository.removeUser(user);
    return user;
  }

  async update(
    id: number,
    newData: Partial<IUserData>,
  ): Promise<IUserDataResponse | null> {
    const user = await this.UserRepository.findUserById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (id !== user.id) {
      throw new ForbiddenError(
        'You do not have permission to perform this action',
      );
    }

    const dataToUpdate = Object.entries(newData).reduce<Partial<IUserData>>(
      (acc, [key, value]) => {
        const validKey = key as keyof IUserData;

        if (value !== undefined && value !== '' && value !== user[validKey]) {
          acc[validKey] = value;
        }

        return acc;
      },
      {},
    );

    if (Object.keys(dataToUpdate).length === 0) {
      throw new BadRequestError('No fields were modified, no changes made.');
    }

    const updatedUser = await this.UserRepository.editUser(user, dataToUpdate);

    return {
      id: updatedUser!.id,
      username: updatedUser!.username,
      email: updatedUser!.email,
      twoStep: updatedUser!.twoStep,
    };
  }
}

export default UserService;
