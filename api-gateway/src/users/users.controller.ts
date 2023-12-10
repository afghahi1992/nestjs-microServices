import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  OnModuleInit,
  Inject, UseInterceptors
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { GrpcToHttpInterceptor } from "nestjs-grpc-exceptions";
import { SignUpAuthDto } from "./dto/signUp-auth.dto";
import { SignInAuthDto } from "./dto/signIn-auth.dto";

interface UserService {
  findAll({}): Observable<any>;

  create({}): Observable<any>;

  findOne({}): Observable<any>;

  update({}): Observable<any>;

  remove({}): Observable<any>;
}

interface AuthService {
  signUp({}): Observable<any>;

  signIn({}): Observable<any>;
}


@Controller("users")
export class UsersController implements OnModuleInit {
  private userService: UserService;
  private authService: AuthService;

  constructor(@Inject("USERPROTO_PACKAGE") private client: ClientGrpc) {
  }

  onModuleInit() {
    this.userService = this.client.getService<UserService>("UserService");
    this.authService = this.client.getService<AuthService>("AuthService");
  }

  @Post()
  @UseInterceptors(GrpcToHttpInterceptor)
  create(@Body() createUserDto: CreateUserDto, @Headers("authorization") token: string) {
    return this.userService.create({ ...createUserDto, token });
  }

  @Get()
  @UseInterceptors(GrpcToHttpInterceptor)
  findAll(@Headers("authorization") token: string) {
    return this.userService.findAll({ token });
  }

  @Get(":id")
  @UseInterceptors(GrpcToHttpInterceptor)
  findOne(@Param("id") id: string, @Headers("authorization") token: string) {
    return this.userService.findOne({ id: +id, token });
  }

  @Patch(":id")
  @UseInterceptors(GrpcToHttpInterceptor)
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto, @Headers("authorization") token: string) {
    const updateModel = {
      name: updateUserDto.name,
      age: updateUserDto.age,
      id: +id,
      token: token
    };
    return this.userService.update(updateModel);
  }

  @Delete(":id")
  @UseInterceptors(GrpcToHttpInterceptor)
  remove(@Param("id") id: string, @Headers("authorization") token: string) {
    return this.userService.remove({ id: +id, token });
  }

  @Post("signUp")
  @UseInterceptors(GrpcToHttpInterceptor)
  signUp(@Body() signUpAuthDto: SignUpAuthDto) {
    // return {msg:'ok'};
    return this.authService.signUp(signUpAuthDto);
  }

  @Post("signIn")
  @UseInterceptors(GrpcToHttpInterceptor)
  signIn(@Body() signInAuthDto: SignInAuthDto) {
    return this.authService.signIn(signInAuthDto);
  }


}
