
import { Document, ObjectId } from "mongoose";

export interface UserInterface extends Document {
    _id: ObjectId;
    name: string;
    email: string;
    mobile: number;
    password: string;
    userImage: string;
    referral_code: string;
    account_status: string;
    joiningDate: Date;
    isAdmin:boolean,
    wallet: {
        balance: number;
        transactions: {
            date: Date;
            details: string;
            amount: number;
            status: string;
        }[];
    };
    RideDetails: {
        completedRides: number;
        cancelledRides: number;
    };
}


export interface registration {
  name: string;
  email: string;
  mobile: number;
  password: string;
  referral_code: string;
  userImage: any;
}

export interface updateData {
  name?: string | undefined;
  email?: string | undefined;
  mobile?: number | undefined;
}

export interface ridePayment {
  userId: string;
  paymentMode: string;
  amount: number;
  rideId: string;
}


export interface userData {
  name: string;
  email: string;
  mobile: number;
  password: string;
  reffered_Code: string;
  userImage: any;
}