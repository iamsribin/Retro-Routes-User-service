import registartionUseCases from "../useCases/registrationUseCases";
import auth from "../middleware/auth";
import { sendOtp } from "../utilities/otpSending";

const registartionUseCase = new registartionUseCases();

export default class RegistrationController{
    signup= async (call:any,callback:any) => {
      const { name, email, mobile, password, reffered_Code ,otp,userImage,token } = call.request
      console.log("singup requst",call.request);
      
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
        console.log("otp==",otp," jwtotp==",jwtOtp?.clientId);
        if (otp === jwtOtp?.clientId) {
            const response = await registartionUseCase.user_registration(userData);
            console.log("response,",response);
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

    checkUser= async (call: any, callback: any) => {
      const { mobile, email ,name} = call.request;  
      try {
        const response = await registartionUseCase.checkUser(mobile, email);
        console.log("response===",response);
        
        if (response.message === "user not registered") {
          const token = await sendOtp(email,name);
          console.log(token,"controll");
          callback(null,{token,message:response.message} );
        } else {
          callback(null, response); 
        }
      } catch (error) {
        console.error("Error in checkUser:", error);
        callback({
          code: null,
          message: (error as Error).message || 'Unknown error occurred during checkUser'
        });
      }
    }
}