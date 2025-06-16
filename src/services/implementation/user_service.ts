// import  UserRepository  from '../../repositories/implementation/userRepo';
// import { IUserService} from '../interfaces/IUserService';
// import { handleControllerError } from '../../utilities/handleError';
// import { UserInterface } from '../../interface/user.interface';

// export default class UserService implements IUserService {
//   constructor(
//     private readonly userRepo: UserRepository,
//   ) {}

//   /**
//    * Authenticates a user by Google account email
//    * @param email - User's id 
//    * @returns Promise resolving the user result
//    * @throws Error if null fails
//    */
//   async fetchUserProfile(id: string): Promise<UserInterface | null> {
//     try {
//       const user = await this.userRepo.findUserById(id);
//       return user;
//     } catch (error) {
//       throw handleControllerError(error, 'Google authentication');
//     }
//   }
// }