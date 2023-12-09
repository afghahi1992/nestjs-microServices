import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as JWT from 'jsonwebtoken';
import { Request } from 'express';
import * as process from 'process';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import {Repository} from 'typeorm'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: any = JWT.verify(token, process.env.TOKEN_KEY);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
      const oldToken = await this.getTokenFromDB(payload?.email);
      if (oldToken === token) return true;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  private async getTokenFromDB(email: string): Promise<string> {
    const user = await this.authRepository.findOneBy({ email });
    return user.token;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    return request.headers?.authorization;
  }
}
