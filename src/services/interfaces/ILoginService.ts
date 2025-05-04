import { UserInterface } from '../../interface/user.interface';

export interface ServiceResponse {
  message: string;
  data?: any;
}

export interface ILoginService {
  checkLoginUser(mobile: number): Promise<ServiceResponse>;
  checkGoogleUser(email: string): Promise<ServiceResponse>;
}