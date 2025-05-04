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
    reasone: string,
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
