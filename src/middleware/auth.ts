import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import { verify } from "crypto";
import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();

interface DecodedToken {
  id: string;
  role: string;
}

export default {
  createToken: async (
    clientId: ObjectId | string,
    expire: string
  ): Promise<string> => {
    try {
      const jwtSecretKey: jwt.Secret = process.env.USER_SECRET_KEY ?? "Sribin"; 
      const token = jwt.sign({ clientId }, jwtSecretKey, { expiresIn: expire as SignOptions["expiresIn"]  });
      return token;
    } catch (error) {
      console.log("createToken===",error);
      return "something went wrong";
    }
  },
  verifyOtpToken: (token: string) => {
    const secretKey = process.env.USER_SECRET_KEY ?? "Sribin";
    console.log(token);

    try {
      const decodedToken = jwt.verify(token, secretKey) as JwtPayload;
      console.log(decodedToken, "decode");
      return decodedToken;
    } catch (error: any) {
      console.error("Token verification failed:", error.message);
      return { message: "inavlid otp" };
    }
  },
};
