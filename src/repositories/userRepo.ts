import User from "../entities/user.model";
import {registration} from "../entities/user.interface"

export default class userRepository {
  saveUser = async (userData: registration) => {

    const existingUser = await User.findOne();
      
    const newUser = new User({
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile,
      password: userData.password,
      referral_code: userData.referral_code,
      userImage: userData.userImage,
      joiningDate: Date.now(),
      isAdmin: existingUser ? false: true
    });
    try {
      const saveUser = await newUser.save();
      console.log("user saved into db");

      return saveUser;
    } catch (error) {
      return (error as Error).message;
    }
  };
  checkUser = async (mobile: number, email: string) => {
    try {
      const userDetailWithMobile = await User.findOne({ mobile });
      console.log("userDetailWithMobile", userDetailWithMobile);

      if (userDetailWithMobile) {
        return userDetailWithMobile;
      }

      const userDetailWithEmail = await User.findOne({ email });
      console.log("userDetailWithEmail", userDetailWithEmail);

      if (userDetailWithEmail) {
        return userDetailWithEmail;
      }
    } catch (error) {
      return (error as Error).message;
    }
  };
  findUser = async (mobile: number) => {
    try {
      const userData = await User.findOne({ mobile });
      return userData;
    } catch (error) {
      console.log(error);
      return (error as Error).message;
    }
  };
  findEmail = async (email: string) => {
    try {
      const userData = await User.findOne({ email });
      return userData;
    } catch (error) {
      console.log(error);
      return (error as Error).message;
    }
  };
  findUserWithStatus = async (status: string) => {
    try {
      const user = await User.find({ account_status: status, isAdmin:{$ne:true}});
      console.log("repor",user);
      
      return user;
    } catch (error) {
      console.log(error);
      return (error as Error).message;
    }
  };

  findAndUpdate = async (id: string, status: string) => {
    try {
      const user = await User.findByIdAndUpdate(id, {
        $set: {
          account_status: status,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      return (error as Error).message;
    }
  };
  findUserById = async (id: string) => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.log(error);
    }
  };
}
