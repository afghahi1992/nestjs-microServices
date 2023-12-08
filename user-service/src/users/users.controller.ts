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
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
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
