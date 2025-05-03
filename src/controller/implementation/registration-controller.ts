  import { IRegistrationController } from '../interfaces/IRegisterController';
  import RegistrationUseCases from '../../use-cases/registration.use-cases';
  import { AuthService } from '../../utilities/auth';
  import { sendOtp } from '../../utilities/otpSending';
  import { JwtPayload } from 'jsonwebtoken';

  interface OtpPayload extends JwtPayload {
    clientId: string;
  }

  interface UserData {
    name: string;
    email: string;
    mobile: number;
    password: string;
    reffered_Code: string;
    otp: string;
    userImage: string;
    token: string;
  }

  export default class RegistrationController implements IRegistrationController {
    constructor(                             
      private readonly authService: AuthService,
      private readonly registrationUseCases: RegistrationUseCases
    ) {}

    /**
     * Handles user registration with OTP verification
     */
    async signup(
      call: { request: UserData },
      callback: (error: Error | null, response?: { message: string }) => void
    ): Promise<void> {
      try {
        const { name, email, mobile, password, reffered_Code, otp, userImage, token } = call.request;
        
        const jwtOtp = this.authService.verifyOtpToken(token) as OtpPayload;

        if (otp !== jwtOtp?.clientId) {
          callback(null, { message: 'Invalid OTP' });
          return;
        }         

        const response = await this.registrationUseCases.user_registration({
          name,
          email,
          mobile,
          password,
          reffered_Code,
          userImage,
        });

        callback(null, response);
      } catch (error) {
        callback(new Error(`Registration failed: ${(error as Error).message}`));
      }
    }
    /**
     * Checks if user exists and sends OTP if not registered
     */
  async checkUser(
    call: { request: { mobile: number; email: string; name: string } },
    callback: (error: Error | null, response?: { token?: string; message: string }) => void
  ): Promise<void> {
    try {
      const { mobile, email, name } = call.request;
      const response = await this.registrationUseCases.checkUser(mobile, email);

      if (response.message === 'user not registered') {
        const token = await sendOtp(email, name);
        callback(null, { token, message: response.message });
        return;
      }

      callback(null, response);
    } catch (error) {
      console.log(error);
      
      callback(new Error(`User check failed: ${(error as Error).message}`));
    }
  }
    /**
     * Resends OTP to user's email
     */
    async resendOtp(
      call: { request: { email: string; name: string } },
      callback: (error: Error | null, response?: { token?: string; message: string }) => void
    ): Promise<void> {
      try {
        const { email, name } = call.request;
        const token = await sendOtp(email, name);
    
        if (!token) {
          callback(null, { message: 'Failed to generate OTP token' });
          return;
        }
    
        callback(null, { token, message: 'OTP sent successfully' });
      } catch (error) {
        callback(new Error('Failed to resend OTP'));
      }
    }
  }

