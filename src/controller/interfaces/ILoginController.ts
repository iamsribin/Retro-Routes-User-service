export interface AuthResponse {
    token?: string;
    message: string;
  }
  
  export type ControllerCallback<T = AuthResponse> = (error: Error | null, response?: T) => void;
  
  export interface ILoginController {
    checkLoginUser(
      call: { request: { mobile: number } },
      callback: ControllerCallback
    ): Promise<void>;
  
    checkGoogleLoginUser(
      call: { request: { email: string } },
      callback: ControllerCallback
    ): Promise<void>;
  }