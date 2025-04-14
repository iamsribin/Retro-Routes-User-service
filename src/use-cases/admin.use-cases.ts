import UserRepository from "../repositories/userRepo";

export default class AdminUseCase {
  private userRepo: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  getUserData = async (status: string) => {
    try {
      const response = await this.userRepo.findUserWithStatus(status);

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  getBlockedUsers = async (status: string) => {};

  getUserDetails = async (id: string) => {
    try {
      const response = await  this.userRepo.getUserDetails(id);
      const userDetail = {
        name: response?.name,
        email: response?.email,
        mobile: response?.mobile,
        userImage: response?.userImage,
        joiningDate: response?.joiningDate.toLocaleDateString(),
        account_status: response?.account_status,
        balance: response?.wallet.balance,
        referral_code: response?.referral_code,
        total_transactions: response?.wallet.transactions.length,
        completed_rides: response?.RideDetails.completedRides,
        cancelled_rides: response?.RideDetails.cancelledRides,
        reason: response?.reasone,
      };
      return userDetail;
    } catch (error) {
      console.log(error);
    }
  };

  updateUserStatus = async (id: string, status: string, reasone: string) => {
    try {
      const response = await  this.userRepo.updateUserStatus(id, status, reasone);
      console.log("reponse of update", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}
