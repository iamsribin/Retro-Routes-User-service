import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import "dotenv/config";
import connectDB from "./config/mongo";
connectDB(); 

import registrationControl from './controller/registrationController';
import loginControl from './controller/loginController';

const registrationController= new registrationControl() 
const loginController= new loginControl() 

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
  // ResendOtp: registrationController.resendOtp,
  // CheckGoogleLoginUser: loginController.checkGoogleLoginUser,
  CheckLoginUser: loginController.checkLoginUser,
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
    // server.start();
  });
};

grpcServer();