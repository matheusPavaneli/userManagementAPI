import { ModelStatic } from 'sequelize';
import User from '../database/models/User';
import TwoStepToken from '../database/models/TwoStepToken';
import ResetToken from '../database/models/ResetToken';
import UserImage from '../database/models/UserImage';

export default interface IModels {
  User: ModelStatic<User>;
  ResetToken: ModelStatic<ResetToken>;
  TwoStepToken: ModelStatic<TwoStepToken>;
  UserImage: ModelStatic<UserImage>;
}
