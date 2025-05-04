export interface CheckLoginUserResponse {
  message: string;
  name: string;
  token: string;
  refreshToken: string;
  _id: string;
  role: string;
}

export interface CheckGoogleLoginUserResponse {
  message: string;
  name: string;
  token: string;
  refreshToken: string;
  _id: string;
  role: string;
}

export type ControllerCallback<T = CheckLoginUserResponse | CheckGoogleLoginUserResponse> = (
  error: Error | null,
  response?: T
) => void;

export interface ILoginController {
  checkLoginUser(
    call: { request: { mobile: number } },
    callback: ControllerCallback<CheckLoginUserResponse>
  ): Promise<void>;

  checkGoogleLoginUser(
    call: { request: { email: string } },
    callback: ControllerCallback<CheckGoogleLoginUserResponse>
  ): Promise<void>;
}