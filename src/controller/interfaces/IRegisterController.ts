import { UserData } from "../../dto/registrationServiceDTO";

export interface ControllerResponse {
  message: string;
  token?: string;
  data?: any;
}

export type ControllerCallback<T = ControllerResponse> = (error: Error | null, response?: T) => void;

export interface IRegistrationController {
  signup(
    call: { request: UserData & { otp: string; token: string } },
    callback: ControllerCallback
  ): Promise<void>;

  checkUser(
    call: { request: { mobile: number; email: string; name: string } },
    callback: ControllerCallback
  ): Promise<void>;

  resendOtp(
    call: { request: { email: string; name: string } },
    callback: ControllerCallback
  ): Promise<void>;
}