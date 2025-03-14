import LoginUseCases from "../use-cases/login.use-cases";

export default class LoginController{
    
    private loginUseCase: LoginUseCases;

    constructor(loginUseCase:LoginUseCases){
       this.loginUseCase = loginUseCase;
    }

    checkLoginUser=async (call:any,callback:any)=>{
        const {mobile}=call.request
        console.log(call.request);
        
        try {
            const response=await this.loginUseCase.checkLoginUser(mobile)
            callback(null,response)
        } catch (error) {
            console.log(error);
            callback(null,{ error: (error as Error).message });
        }
    }  

    checkGoogleLoginUser=async(call:any,callback:any)=>{
        const {email}=call.request
        console.log(call.request);
        try {
            const response=await this.loginUseCase.checkGoogleUser(email)
            console.log(response);
            callback(null,response)
        } catch (error) {
            console.log(error);
            callback(null,{ error: (error as Error).message });
        }
    }
}