import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from "@nestjs/common";
import * as JWT from "jsonwebtoken";
import * as process from "process";
import { IS_PUBLIC_KEY } from "./decorators/public.decorator";
import { Reflector } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "./entities/auth.entity";
import { Repository } from "typeorm";
import { GrpcUnauthenticatedException } from "nestjs-grpc-exceptions";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (isPublic) {
      return true;
    }

    const token = context.switchToHttp().getRequest()?.token;

    console.log('=======token=======');
    console.log(token);
    console.log('=======token=======');


    if (!token)
      throw new GrpcUnauthenticatedException("token does not exist, please login first!");

    try {
      const payload: any = JWT.verify(token, process.env.TOKEN_KEY);
      const oldToken = await this.getTokenFromDB(payload?.email);
      if (oldToken === token) return true;
    } catch {
      throw new GrpcUnauthenticatedException("invalid token, please login again!");
    }
    return true;
  }

  private async getTokenFromDB(email: string): Promise<string> {
    const user = await this.authRepository.findOneBy({ email });
    return user.token;
  }
}
