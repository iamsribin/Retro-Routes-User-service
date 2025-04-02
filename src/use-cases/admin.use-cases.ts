import userRepository from "../repositories/userRepo";

const userRepo = new userRepository();

export default class AdminUseCase {
    getUserData = async (status: string) => {
    try {
      const response = await userRepo.findUserWithStatus(status);
      
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  getBlockedUsers = async (status:string)=>{

  }

  getUserDetails= async(id:string)=>{
try {
  const response = await userRepo.getUserDetails(id);
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
  }
  return userDetail
} catch (error) {
  console.log(error);
  
}
  }
}
