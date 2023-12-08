import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return { msg: "This action adds a new user" };
  }

  findAll() {
    const users = {
      users: [
        {
          id: 1,
          name: "ali",
          email: "ali@yahoo.com",
          age: 24,
          password: "123"
        },
        {
          id: 2,
          name: "reza",
          email: "reza@yahoo.com",
          age: 24,
          password: "123"
        }
      ]
    };
    return users;
  }

  findOne(id: number) {
    return { msg: `This action returns a #${id} user` };
  }

  update(updateUserDto: UpdateUserDto) {
    return { msg: `This action updates a user` };
  }

  remove(id: number) {
    return { msg: `This action removes a #${id} user` };
  }
}
