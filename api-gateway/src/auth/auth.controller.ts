import { Body, Controller, Post } from '@nestjs/common';
import { SignUpAuthDto } from './dto/signUp-auth.dto';
import { SignInAuthDto} from './dto/signIn-auth.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signUp')
  signUp(@Body() signUpAuthDto: SignUpAuthDto) {
    return this.authService.signUpUser(signUpAuthDto);
  }

  @Public()
  @Post('signIn')
  signIn(@Body() signInAuthDto: SignInAuthDto) {
    return this.authService.signInUser(signInAuthDto);
  }
}
