export interface AuthResponse {
    message: string;
    Users?: any; // response structure
  }
  
  export type ControllerCallback<T = AuthResponse> = (error: Error | null, response?: T) => void;
  
  export interface IAdminController {
    getActiveUser(
      call: { request: {} },
      callback: ControllerCallback
    ): Promise<void>;
  
    getBlockedUsers(
      call: { request: {} },
      callback: ControllerCallback
    ): Promise<void>;
  
    getUserDetails(
      call: { request: { id: string } },
      callback: ControllerCallback
    ): Promise<void>;
  
    updateUserStatus(
      call: { request: { id: string; status: 'Good' | 'Block'; reason: string } },
      callback: ControllerCallback
    ): Promise<void>;
  }