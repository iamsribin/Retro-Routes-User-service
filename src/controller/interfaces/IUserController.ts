

export interface fetchUserProfileResponse {

}

export interface IUserController {
  fetchUserProfile(
    call: { request: { id: string } },
    callback: fetchUserProfileResponse
  ): Promise<void>;
}