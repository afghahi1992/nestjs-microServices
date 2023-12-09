import { Controller, Body, Catch } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { GetUserDto } from "./dto/get-user.dto";
import { GrpcMethod, RpcException } from "@nestjs/microservices";
import { RemoveUserDto } from "./dto/remove-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @GrpcMethod("UserService", "create")
  async create(@Body() createUserDto: CreateUserDto) {
      const name = createUserDto?.name;
      const email = createUserDto?.email;
      const password = createUserDto?.password;
      const age = +createUserDto?.age;
      let serviceResult = await this.usersService.create(name, email, password, age);
      console.log(serviceResult);
      return { msg: "This action adds a new user" };



  }

  @GrpcMethod("UserService", "findAll")
  findAll() {
    return this.usersService.findAll();
  }

  @GrpcMethod("UserService", "findOne")
  findOne(@Body() getUserDto: GetUserDto) {
    let id = +getUserDto?.id;
    return this.usersService.findOne(id);
  }

  @GrpcMethod("UserService", "update")
  update(@Body() updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    const id = +updateUserDto?.id;
    const name = updateUserDto?.name;
    const age = +updateUserDto?.age;
    return this.usersService.update(id, name, age);
  }

  @GrpcMethod("UserService", "remove")
  remove(@Body() removeUserDto: RemoveUserDto) {
    let id = +removeUserDto?.id;
    return this.usersService.remove(id);
  }
}
