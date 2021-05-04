import { Controller, Post, Body, Logger, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body(ValidationPipe) authDto: AuthDto,
  ): Promise<{ email: string; name: string }> {
    return this.authService.signUp(authDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) signInDto: SignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }
}
