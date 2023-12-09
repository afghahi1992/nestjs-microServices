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

  async create(name: string, email: string, password: string, age: number) {

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: User = new User();
    user.name = name;
    user.age = age;
    user.email = email;
    user.password = hashedPassword;
    user.type = type.USER;
    return await this.userRepository.save(user);

  }

  async findAll() {

    let list = await this.userRepository.find();
    return { users: list };
  }

  async findOne(id: number) {
    console.log("==============");
    console.log(id);
    let user = await this.userRepository.findOneBy({ id });
    console.log(user);
    return user;
    //return { msg: `This action returns a #${id} user` };
  }

  async update(id: number, name: string, age: number) {

    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ name, age })
      .where("id = :id", { id })
      .execute();

    return { msg: `This action updates a user` };
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return { msg: `This action removes a #${id} user` };
  }
}
