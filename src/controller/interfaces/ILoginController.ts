export interface ControllerResponse {
  message: string;
   name ?:string;
   token ?:string;
   refreshToken ?:string;
   _id ?:string;
   role ?:string;
}

export type ControllerCallback<T = ControllerResponse> = (error: Error | null, response?: T) => void;

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