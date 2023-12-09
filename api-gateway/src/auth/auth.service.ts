import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignUpAuthDto } from './dto/signUp-auth.dto';
import { SignInAuthDto } from './dto/signIn-auth.dto';
import * as bcrypt from 'bcrypt';
import { type } from '../users/enum/roles.enum';
import * as JWT from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as process from 'process';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
  ) {}
  async signUpUser({ name, email, age, password }: SignUpAuthDto) {


    console.log(name);
    return {name};
    // const user = await this.userRepository.findOneBy({ email });
    // if (user) throw new ConflictException('User Exist', 'user already exist');
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const userModel = {
    //   name,
    //   email,
    //   age,
    //   password: hashedPassword,
    //   type: type.USER,
    // };
    // const result = await this.userRepository.save(userModel);
    // const token = await this.generateToken(email, userModel.type, result.id);
    // await this.authRepository.save({ token, email });
    // return { token };
  }

  async signInUser({ email, password }: SignInAuthDto) {

    console.log(email);
    return {email};

    // const user = await this.userRepository.findOneBy({ email });
    // if (!user)
    //   throw new NotFoundException(
    //     'User Not Found',
    //     'please enter the correct email',
    //   );
    // const isUserValid = await bcrypt.compare(password, user.password);
    // if (!isUserValid) throw new HttpException('Invalid Credential', 400);
    // const token = await this.generateToken(email, user.type, user.id);
    // await this.authRepository
    //   .createQueryBuilder()
    //   .update(Auth)
    //   .set({ token })
    //   .where('email = :email', { email })
    //   .execute();
    // return { token };
  }

  async generateToken(email: string, type: string, id: number) {
    const token = JWT.sign(
      {
        email,
        type,
        id,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: 7 * 3600 * 24,
      },
    );
    return token;
  }
}
