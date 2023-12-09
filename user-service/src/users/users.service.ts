import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import { type } from "./enum/roles.enum";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
  }

  async create(createUserDto: CreateUserDto) {

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user: User = new User();
    user.name = createUserDto.name;
    user.age = createUserDto.age;
    user.email = createUserDto.email;
    user.password = hashedPassword;
    user.type = type.USER;
    await this.userRepository.save(user);
    return { msg: "This action adds a new user" };
  }

  async findAll() {

    let list = await this.userRepository.find();
    return { users: list };
  }

  async findOne(id: number) {
    console.log(id);
    let user = await this.userRepository.findOneBy({ id });
    console.log(user);
    return { user: user };
    //return { msg: `This action returns a #${id} user` };
  }

  update(updateUserDto: UpdateUserDto) {
    return { msg: `This action updates a user` };
  }

  remove(id: number) {
    return { msg: `This action removes a #${id} user` };
  }
}
