import { UserInterface } from '../../interface/user.interface'; 

export interface RegistrationData {
  name: string;
  email: string;
  mobile: number;
  password: string;
  referral_code: string;
  userImage?: string | null;
}

export interface IUserRepository {
  saveUser(userData: RegistrationData): Promise<UserInterface>;
  checkUser(mobile: number, email: string): Promise<UserInterface | null>;
  findUser(mobile: number): Promise<UserInterface | null>;
  findEmail(email: string): Promise<UserInterface | null>;
  findUserWithStatus(status: 'Good' | 'Block'): Promise<UserInterface[]>;
  findAndUpdate(id: string, status: 'Good' | 'Block'): Promise<UserInterface | null>;
  findUserById(id: string): Promise<UserInterface | null>;
  getUserDetails(id: string): Promise<UserInterface | null>;
  updateUserStatus(id: string, status: 'Good' | 'Block', reason: string): Promise<UserInterface | null>;
}
