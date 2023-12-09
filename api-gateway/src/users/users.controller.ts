import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  Inject, UseInterceptors
} from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

interface UserService {
  findAll({}): Observable<any>;

  create({}): Observable<any>;

  findOne({}): Observable<any>;

  update({}): Observable<any>;

  remove({}): Observable<any>;
}


@Controller('users')
export class UsersController implements OnModuleInit {
  private userService: UserService;

  constructor(@Inject('USERPROTO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Post()
  @UseInterceptors(GrpcToHttpInterceptor)
  create(@Body() createUserDto: CreateUserDto) {
    const serviceResult = this.userService.create(createUserDto);
    console.log(serviceResult);
    return serviceResult;
  }

  @Get()
  @UseInterceptors(GrpcToHttpInterceptor)
  findAll() {
    const serviceResult = this.userService.findAll(null);
    console.log(serviceResult);
    return serviceResult;
  }

  @Get(':id')
  @UseInterceptors(GrpcToHttpInterceptor)
  findOne(@Param('id') id: string) {
    const serviceResult = this.userService.findOne({id:+id} );
    console.log(serviceResult);
    return serviceResult;
  }

  @Patch(':id')
  @UseInterceptors(GrpcToHttpInterceptor)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updateModel = {
      name: updateUserDto.name,
      age: updateUserDto.age,
      id: +id,
    };
    const serviceResult = this.userService.update(updateModel);
    console.log(serviceResult);
    return serviceResult;
  }

  @Delete(':id')
  @UseInterceptors(GrpcToHttpInterceptor)
  remove(@Param('id') id: string) {
    const serviceResult = this.userService.remove({id:+id});
    console.log(serviceResult);
    return serviceResult;
  }
}
