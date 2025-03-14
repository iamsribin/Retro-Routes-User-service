import { Schema } from "mongoose";
import { UserInterface } from "./user.interface";

const UserSchema: Schema = new Schema <UserInterface>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userImage: {
        type: String,
    },
    referral_code: {
        type: String,
    },
    joiningDate: {
        type: String,
        deafult: Date.now(),
    },
    account_status: {
        type: String,
        default:"Good"
    },
    wallet: {
        balance: {
            type: Number,
            default: 0,
        },
        transactions: [
            {
                date: {
                    type: Date,
                },
                details: {
                    type: String,
                },
                amount: {
                    type: Number,
                },
                status: {
                    type: String,
                },
            },
        ],
    },

    RideDetails: {
        completedRides: {
            default: 0,
            type: Number,
        },
        cancelledRides: {
            default: 0,
            type: Number,
        },
    },
});

export default UserSchema;