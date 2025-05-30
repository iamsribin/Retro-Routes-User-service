export interface AdminGetUserDataResponse {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  userImage: string;
  referral_code: string;
  account_status: string;
  balance: number;
  total_transactions: number;
  completed_rides: number;
  cancelled_rides: number;
  joiningDate: string;
  reason: string;
}

export interface AdminUpdateUserStatusResponse {
  message: string;
  user_id:string;
}

export interface AdminGetDataResponse {
  Users: Array<{
    _id: string;
    name: string;
    email: string;
    mobile: string;
    userImage: string;
    referral_code: string;
    account_status: string;
    joiningDate: string;
  }>;
}

export type ControllerCallback<T = AdminGetUserDataResponse | AdminUpdateUserStatusResponse | AdminGetDataResponse> = (
  error: Error | null, 
  response?: T
) => void;

export interface IAdminController {
  getActiveUser(
    call: { request: {} },
    callback: ControllerCallback<AdminGetDataResponse>
  ): Promise<void>;
  
  getBlockedUsers(
    call: { request: {} },
    callback: ControllerCallback<AdminGetDataResponse>
  ): Promise<void>;
  
  getUserDetails(
    call: { request: { id: string } },
    callback: ControllerCallback<AdminGetUserDataResponse>
  ): Promise<void>;
  
  updateUserStatus(
    call: { request: { id: string; status: 'Good' | 'Block'; reason: string } },
    callback: ControllerCallback<AdminUpdateUserStatusResponse>
  ): Promise<void>;
}