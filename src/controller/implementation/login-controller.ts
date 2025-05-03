import LoginUseCases  from '../../use-cases/login.use-cases';
import { handleControllerError } from '../../utilities/handleError';
import { ILoginController, ControllerCallback } from '../interfaces/ILoginController';

export default class LoginController implements ILoginController {
  constructor(
    private readonly loginUseCase: LoginUseCases
  ) {}

  /**
   * Authenticates a user using their mobile number
   * @param call - Request object containing the mobile number
   * @param callback - Callback to return the authentication result or error
   */
  async checkLoginUser(
    call: { request: { mobile: number } },
    callback: ControllerCallback
  ): Promise<void> {
    try {
      const { mobile } = call.request;
      const response = await this.loginUseCase.checkLoginUser(mobile);
      callback(null, response);
    } catch (error) {
      callback(handleControllerError(error, 'User authentication'));
    }
  }

  /**
   * Authenticates a user using their Google account email
   * @param call - Request object containing the email
   * @param callback - Callback to return the authentication result or error
   */
  async checkGoogleLoginUser(
    call: { request: { email: string } },
    callback: ControllerCallback
  ): Promise<void> {
    try {
      const { email } = call.request;
      const response = await this.loginUseCase.checkGoogleUser(email);
      callback(null, response);
    } catch (error) {
      callback(handleControllerError(error, 'Google authentication'));
    }
  }
}
