import AdminUseCase from "../use-cases/admin.use-cases"

const adminUseCase = new AdminUseCase();

export default class AdminController{
    getActiveUser= async(call:any, callBack:any)=>{
        try {
            const User = await adminUseCase.getUserData("Good");
            console.log("usersssssss",User);
            
            callBack(null,{User})
            
        } catch (error) {
            console.log(error);
            callBack(null, {error:(error as Error).message})
        }
    }

    getBlockedUsers= async(call:any, callBack:any)=>{
      try {
        const Users = await adminUseCase.getUserData("Block");
        console.log("blocked users",Users);

        callBack(null,{Users})

      } catch (error) {
        console.log(error);
        callBack(null,{error: (error as Error).message})
        
      }
    }

    getUserDetails=async(call: any, callBack:any)=>{
      try {         
        const {id} = call.request;
        const userDetail = await adminUseCase.getUserDetails(id);
        console.log("userDetail====",userDetail);
        
        callBack(null, userDetail);
      } catch (error) {
        console.log(error);
        callBack(error,{error:(error as Error).message});
        
      }
    }

    updateUderStatus = async(call:any, callBack:any)=>{
      try {
        console.log(call.request);
        const{reason,status,id}= call.request;
       const response = await adminUseCase.updateUserStatus(id, status, reason);
        callBack(null, response)
      } catch (error) {
        console.log(error);
        
      }
    }
}