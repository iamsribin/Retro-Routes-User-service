export interface IRegistrationController {
  signup(
    call: {
      request: {
        name: string;
        email: string;
        mobile: number;
        password: string;
        reffered_Code: string;
        otp: string;
        userImage: string;
        token: string;
      };
    },
    callback: (error: Error | null, response?: { message: string }) => void
  ): Promise<void>;

  checkUser(
    call: {
      request: {
        mobile: number;
        email: string;
        name: string;
      };
    },
    callback: (error: Error | null, response?: { token?: string; message: string }) => void
  ): Promise<void>;
  
  resendOtp(
    call: {
      request: {
        email: string;
        name: string;
      };
    },
    callback: (error: Error | null, response?: { token?: string; message: string }) => void
  ): Promise<void>;
  
}
