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
import { TransformInterceptor } from "../interceptors/transform.interceptor";

interface UserService {
  findAll({}): Observable<any>;

  create({}): Observable<any>;

  findOne({}): Observable<any>;

  update({}): Observable<any>;

  remove({}): Observable<any>;
}


@Controller("users")
@UseInterceptors(TransformInterceptor)
@UseInterceptors(GrpcToHttpInterceptor)
export class UsersController implements OnModuleInit {
  private userService: UserService;

  constructor(@Inject("TRANSFERPROTO_PACKAGE") private client: ClientGrpc, private readonly logger: PinoLogger) {
    logger.setContext(UsersController.name);
  }

  onModuleInit() {
    this.userService = this.client.getService<UserService>("UserService");
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Headers("authorization") token: string) {
    this.logger.info("AuthController ==> create");
    return this.userService.create({ ...createUserDto, token });
  }

  @Get()
  async findAll(@Headers("authorization") token: string) {
    this.logger.info("AuthController ==> findAll");
    return this.userService.findAll({ token });
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Headers("authorization") token: string) {
    this.logger.info("AuthController ==> findOne");
    return this.userService.findOne({ id: +id, token });
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto, @Headers("authorization") token: string) {
    this.logger.info("AuthController ==> update");
    const updateModel = {
      name: updateUserDto.name,
      age: updateUserDto.age,
      id: +id,
      token: token
    };
    return this.userService.update(updateModel);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Headers("authorization") token: string) {
    this.logger.info("AuthController ==> remove");
    return this.userService.remove({ id: +id, token });
  }

}
