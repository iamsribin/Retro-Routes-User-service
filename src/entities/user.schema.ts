import { Schema } from "mongoose";
import { UserInterface } from "./user.interface";

const UserSchema: Schema = new Schema<UserInterface>({
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
    type: Date,
    default: new Date(),
  },
  account_status: {
    type: String,
    enum: ["Good", "Block"],
    default: "Good",
  },
  reasone:{
  type: String,
  },
  isAdmin: { type: Boolean, default: false },
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
