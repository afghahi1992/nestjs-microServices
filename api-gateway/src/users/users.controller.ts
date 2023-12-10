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
import { PinoLogger } from "nestjs-pino";
import * as process from "process";

interface UserService {
  findAll({}): Observable<any>;

  create({}): Observable<any>;

  findOne({}): Observable<any>;

  update({}): Observable<any>;

  remove({}): Observable<any>;
}


@Controller("users")
export class UsersController implements OnModuleInit {
  private userService: UserService;

  constructor(@Inject("TRANSFERPROTO_PACKAGE") private client: ClientGrpc, private readonly logger: PinoLogger) {
    logger.setContext(UsersController.name);
  }

  onModuleInit() {
    this.userService = this.client.getService<UserService>("UserService");
  }

  @Post()
  @UseInterceptors(GrpcToHttpInterceptor)
  create(@Body() createUserDto: CreateUserDto, @Headers("authorization") token: string) {
    this.logger.info("AuthController#create.call");
    return this.userService.create({ ...createUserDto, token });
  }

  @Get()
  @UseInterceptors(GrpcToHttpInterceptor)
  findAll(@Headers("authorization") token: string) {
    this.logger.info("AuthController#findAll.call");
    return this.userService.findAll({ token });
  }

  @Get(":id")
  @UseInterceptors(GrpcToHttpInterceptor)
  findOne(@Param("id") id: string, @Headers("authorization") token: string) {
    this.logger.info("AuthController#findOne.call");
    return this.userService.findOne({ id: +id, token });
  }

  @Patch(":id")
  @UseInterceptors(GrpcToHttpInterceptor)
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto, @Headers("authorization") token: string) {
    this.logger.info("AuthController#update.call");
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
    this.logger.info("AuthController#remove.call");
    return this.userService.remove({ id: +id, token });
  }

}
