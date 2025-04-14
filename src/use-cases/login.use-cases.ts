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
    if (user.account_status === "Block") {
      return { message: "Blocked" };
    }
    const role = user.isAdmin ? "Admin" : "User"; 
    const token = await this.auth.createToken(user._id.toString(), "15m", role);
    const refreshToken = await this.auth.createToken(user._id.toString(), "7d", role);
  
    if (!token || !refreshToken) {
      throw new Error("Issue in token creation");
    }
  console.log("return data",{
    message: "Success",
    name: user.name,
    token,
    _id: user._id,
    refreshToken,
    role, 
  });
  
    return {
      message: "Success",
      name: user.name,
      token,
      _id: user._id,
      refreshToken,
      role, 
    };
  }
  
  checkLoginUser = async (mobile: number) => {
    try {
      const user = (await this.userRepo.findUser(mobile)) as UserInterface;
      console.log("user",user);
      
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
