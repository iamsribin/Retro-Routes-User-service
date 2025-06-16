// import UserService from '../../services/implementation/user_service';
// import { handleControllerError } from '../../utilities/handleError';
// import {  IUserController, fetchUserProfileResponse  } from '../interfaces/IUserController';

// export default class UserController implements IUserController{
//   constructor(
//     private readonly userService: UserService
//   ) {}

//   /**
//    * Authenticates a user using their mobile number
//    * @param call - Request containing the user id
//    * @param callback - Callback to return the user details
//    */
//   async fetchUserProfile(
//     call: { request: { id: string } },
//     callback: fetchUserProfileResponse
//   ): Promise<void> {
//     try {
//       const { id } = call.request;
//       const response = await this.userService.fetchUserProfile(id);
//       const result: fetchUserProfileResponse = {
//       };
//       callback(null, result);
//     } catch (error) {
//       callback(handleControllerError(error, 'User authentication'));
//     }
//   }

// }