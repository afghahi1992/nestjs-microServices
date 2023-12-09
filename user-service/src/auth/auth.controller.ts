import { Body, Controller, Inject, Post, UseInterceptors } from "@nestjs/common";
import { SignUpAuthDto } from "./dto/signUp-auth.dto";
import { SignInAuthDto } from "./dto/signIn-auth.dto";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { Observable } from "rxjs";
import { ClientGrpc, GrpcMethod } from "@nestjs/microservices";
import { GrpcToHttpInterceptor } from "nestjs-grpc-exceptions";
import { UsersService } from "../users/users.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Public()
  @GrpcMethod("AuthService", "signUp")
  async signUp(@Body() signUpDTO: SignUpAuthDto) {
    const name = signUpDTO?.name;
    const email = signUpDTO?.email;
    const password = signUpDTO?.password;
    const age = +signUpDTO?.age;
    console.log(signUpDTO);
    let serviceResult = await this.authService.signUp(name, email, password, age);
    return { msg: serviceResult };
  }

  @Public()
  @GrpcMethod("AuthService", "signIn")
  async signIn(@Body() signInDTO: SignInAuthDto) {
    let serviceResult =await  this.authService.signIn(signInDTO);
    return { msg: serviceResult };
  }
}
