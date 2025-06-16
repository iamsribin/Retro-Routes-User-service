import { UserInterface } from '../../interface/user.interface';

export interface IUserService {
  fetchUserProfile(id: string): Promise<UserInterface| null>;
}