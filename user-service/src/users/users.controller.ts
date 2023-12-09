import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from "@grpc/grpc-js";
// import { Micr1ById, Micr1 } from './proto/user.proto';

interface Micr1 {
  id: number;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UserService', 'create')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @GrpcMethod('UserService', 'findAll')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @GrpcMethod('UserService', 'findOne')
  @Get(':id')
  findOne(data: Micr1, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    console.log("=====================");
    console.log(data);
    console.log(metadata);
    return this.usersService.findOne(0);
  }

  @GrpcMethod('UserService', 'update')
  @Patch(':id')
  update(@Body() updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return this.usersService.update(updateUserDto);
  }

  @GrpcMethod('UserService', 'remove')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
