import { ServiceResponse } from '../../dto/serviceResponse';
import { UserInterface } from '../../interface/user.interface';


export interface IAdminService {
  getUserWithStatus(status: 'Good' | 'Block'): Promise<ServiceResponse>;
  getUserDetails(id: string): Promise<ServiceResponse>;
  updateUserStatus(id: string, status: 'Good' | 'Block', reason: string): Promise<ServiceResponse>;
}