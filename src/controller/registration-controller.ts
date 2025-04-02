import RegistartionUseCases from "../use-cases/registration.use-cases";
import { AuthService } from "../services/auth";
import { sendOtp } from "../utilities/otpSending";

export default class RegistrationController {
  
  private registartionUseCase: RegistartionUseCases;
  private auth: AuthService;

  constructor(auth: AuthService, registartionUseCase: RegistartionUseCases) {
    this.registartionUseCase = registartionUseCase;
    this.auth = auth;
  }

  signup = async (call: any, callback: any) => {
    const {
      name,
      email,
      mobile,
      password,
      reffered_Code,
      otp,
      userImage,
      token,
    } = call.request;

    const userData = {
      name,
      email,
      mobile,
      password,
      reffered_Code,
      userImage,
      otp,
      token,
    };

    try {
      const jwtOtp: any = this.auth.verifyOtpToken(token);

      if (otp === jwtOtp?.clientId) {
        const response = await this.registartionUseCase.user_registration(
          userData
        );
        console.log("response,", response);
        callback(null, response);
      } else {
        console.log("otp invalid");
        callback(null, { message: "Invalid OTP" });
      }
    } catch (error) {
      console.log(error);
      callback(500, { error: (error as Error).message });
    }
  };

  checkUser = async (call: any, callback: any) => {
    const { mobile, email, name } = call.request;
    try {
      const response = await this.registartionUseCase.checkUser(mobile, email);
      console.log("response===", response);

      if (response.message === "user not registered") {
        const token = await sendOtp(email, name);

        callback(null, { token, message: response.message });
        
      } else {
        callback(null, response);
      }
    } catch (error) {
      console.error("Error in checkUser:", error);
      callback({
        code: null,
        message:
          (error as Error).message || "Unknown error occurred during checkUser",
      });
    }
  };

  resendOtp=async(call: any, callback: any)=>{
    try {
        const {email,name}=call.request;
        console.log("email",email);
        const token=await sendOtp(email,name);
        console.log(token,"new token");
        callback(null,{token, message: "OTP resent successfully" });
    } catch (error) {
        console.log(error);
        callback(null,{ message: "OTP resent errored" });
    }
  }
}
