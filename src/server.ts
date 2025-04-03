import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import "dotenv/config";
import connectDB from "./config/mongo";
connectDB(); 

import registrationControl from './controller/registration-controller';
import loginControl from './controller/login-controller';
import adminControl from './controller/admin-controller';
import LoginUseCases from "./use-cases/login.use-cases";
import RegistrationUseCases from "./use-cases/registration.use-cases";
import { AuthService } from "./services/auth"
import UserRepository from "./repositories/userRepo";

const adminController = new adminControl()

const authService = new AuthService();
const userRepo = new UserRepository()
const registrationUseCases = new RegistrationUseCases(userRepo);
const loginUseCases = new LoginUseCases(userRepo, authService);

const registrationController = new registrationControl(authService, registrationUseCases);
const loginController = new loginControl(loginUseCases);

const packageDef = protoLoader.loadSync(path.resolve(__dirname, './proto/user.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as any;
const userProto = grpcObject.user_package;

if (!userProto || !userProto.User || !userProto.User.service) {
  console.error("Failed to load the User service from the proto file.");
  process.exit(1);
}
 
const server = new grpc.Server();

server.addService(userProto.User.service, {
  Register: registrationController.signup,
  CheckUser: registrationController.checkUser,
  ResendOtp: registrationController.resendOtp,
  CheckGoogleLoginUser: loginController.checkGoogleLoginUser,
  CheckLoginUser: loginController.checkLoginUser,

  AdiminGetActiveUser: adminController.getActiveUser,
  AdminGetBlockedUsers:adminController.getBlockedUsers,
  AdminGetUserData:adminController.getUserDetails,
  AdminUpdateUserStatus: adminController.updateUderStatus,
})


const grpcServer = () => {
  const port = process.env.PORT || '3002';
  const Domain=process.env.NODE_ENV==='dev'?process.env.DEV_DOMAIN:process.env.PRO_DOMAIN_USER
  console.log(Domain);
  server.bindAsync(`${Domain}:${port}`, grpc.ServerCredentials.createInsecure(), (err, bindPort) => {
    if (err) {
      console.error("Error starting gRPC server:", err);
      return;
    }
    console.log(`gRPC user server started on port:${bindPort}`);
  });
};

grpcServer();