import UserRepository from "../repositories/userRepo";
import bcrypt from "../services/bcrypt";
import { refferalCode } from "../utilities/refferalCodeGenarate";
import { userData } from "../entities/user.interface";

export default class RegistartionUseCase {

  private userRepo: UserRepository;
  constructor(userRepo: UserRepository) {
    this.userRepo= userRepo
  }

  user_registration = async (userData: userData) => {
    try {
      const { name, email, mobile, password, userImage } = userData;
      const refferal_code = refferalCode();
      const hashedPassword = await bcrypt.securePassword(password);
      const newUserData = {
        name,
        email,
        mobile,
        password: hashedPassword,
        referral_code: refferal_code,
        userImage,
      };
      const response = await this.userRepo.saveUser(newUserData);
      if (typeof response !== "string" && response._id) {
        return { message: "Success" };
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  checkUser = async (mobile: number, email: string) => {
    try {
      const user = await this.userRepo.checkUser(mobile, email);
      console.log("user===", user);

      if (user) {
        return { message: "user already have an account !" };
      } else {
        return { message: "user not registered" };
      }
    } catch (error: unknown) {
      return { message: (error as Error).message };
    }
  };
}
