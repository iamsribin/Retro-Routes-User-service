import { status } from "@grpc/grpc-js";
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
}
