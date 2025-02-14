import registartionUseCases from "../useCases/registrationUseCases";
import auth from "../middleware/auth";
import { sendOtp } from "../utilities/otpSending";

const registartionUseCase = new registartionUseCases();

export default class RegistrationController{
    signup= async (call:any,callback:any) => {
      const { name, email, mobile, password, reffered_Code ,otp,userImage,token } = call.request
      console.log(call.request);
      
      const userData = {
        name,
        email,
        mobile,
        password,
        reffered_Code,
        userImage,
        otp,
        token
      };
      
      try {
        const jwtOtp: any = auth.verifyOtpToken(token);
        console.log(otp,jwtOtp,"token");
        if (otp === jwtOtp?.clientId) {
            const response = await registartionUseCase.user_registration(userData);
            console.log(response);
            callback(null,response);
        } else {
          console.log("otp invalid");
          callback(null,{ message: "Invalid OTP" });
        }
      } catch (error) {
          console.log(error);
        callback(500,{ error: (error as Error).message });
      }
    }

}