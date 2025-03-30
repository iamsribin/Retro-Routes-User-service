import { UserInterface } from "../entities/user.interface";
import { AuthService } from "../services/auth";
import UserRepository from "../repositories/userRepo";

export default class LoginUseCase {

  private userRepo: UserRepository;
  private auth: AuthService;

  constructor(userRepo: UserRepository, authService: AuthService) {
    this.userRepo = userRepo;
    this.auth = authService;
  }

  private async handleLogin(user: UserInterface) {
    if (user.account_status === "Blocked") {
      return { message: "Blocked" };
    }
    const token = await this.auth.createToken(user._id.toString(), "15m");
    const refreshToken = await this.auth.createToken(user._id.toString(), "7d");
    return {
      message: "Success",
      name: user.name,
      token,
      _id: user._id,
      refreshToken,
      isAdmin: user.isAdmin
    };
  }
  
  checkLoginUser = async (mobile: number) => {
    try {
      const user = (await this.userRepo.findUser(mobile)) as UserInterface;
      return user ? this.handleLogin(user) : { message: "No user found" };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
  
  checkGoogleUser = async (email: string) => {
    try {
      const user = (await this.userRepo.findEmail(email)) as UserInterface;
      return user ? this.handleLogin(user) : { message: "No user found" };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
}
