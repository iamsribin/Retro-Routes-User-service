import  AdminService  from '../../services/implementation/admin_service';
import { handleControllerError } from '../../utilities/handleError';
import { IAdminController, ControllerCallback } from '../interfaces/IAdminController';

export class AdminController implements IAdminController {
  constructor(
    private readonly AdminService: AdminService
  ) {}

  /**
   * Retrieves active users
   * @param call - Empty request object
   * @param callback - Callback to return the active users or error
   */
  async getActiveUser(
    call: { request: {} },
    callback: ControllerCallback
  ): Promise<void> {
    try {
      const response = await this.AdminService.getUserWithStatus('Good');
      const users=response.data
      callback(null, { message: 'Active users retrieved successfully', Users: users });
    } catch (error) {
      callback(handleControllerError(error, 'Active user retrieval'));
    }
  }

  /**
   * Retrieves blocked users
   * @param call - Empty request object
   * @param callback - Callback to return the blocked users or error
   */
  async getBlockedUsers(
    call: { request: {} },
    callback: ControllerCallback
  ): Promise<void> {
    try {
      const response = await this.AdminService.getUserWithStatus('Block');
      console.log("====",response);
      const user = response.data
      callback(null, { message: 'Blocked users retrieved successfully', Users: user });
    } catch (error) {
      callback(handleControllerError(error, 'Blocked user retrieval'));
    }
  }

  /**
   * Retrieves details for a specific user
   * @param call - Request object containing the user ID
   * @param callback - Callback to return the user details or error
   */
  async getUserDetails(
    call: { request: { id: string } },
    callback: ControllerCallback
  ): Promise<void> {
    try {
      const { id } = call.request;
      const response = await this.AdminService.getUserDetails(id);
      callback(null, { message: 'User details retrieved successfully', Users: response });
    } catch (error) {
      callback(handleControllerError(error, 'User details retrieval'));
    }
  }

  /**
   * Updates the status of a user
   * @param call - Request object containing the user ID, status, and reason
   * @param callback - Callback to return the update result or error
   */
  async updateUserStatus(
    call: { request: { id: string; status: 'Good' | 'Block'; reason: string } },
    callback: ControllerCallback
  ): Promise<void> {
    try {
      const { id, status, reason } = call.request;
      const response = await this.AdminService.updateUserStatus(id, status, reason);
      callback(null, { message: 'User status updated successfully', Users: response });
    } catch (error) {
      callback(handleControllerError(error, 'User status update'));
    }
  }
}

export default AdminController;