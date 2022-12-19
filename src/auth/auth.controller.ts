import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SignInDto } from './dto/signIn.dto';
import { SignInResponseDto } from './dto/signInResponse.dto';
import { SignUpResponseDto } from './dto/signUpResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'User successfully created.',
    type: SignUpResponseDto,
  })
  @Post('signup')
  async signUp(
    @Body(ValidationPipe) authDto: AuthDto,
  ): Promise<{ email: string; name: string }> {
    return this.authService.signUp(authDto);
  }

  @ApiOkResponse({
    description: 'User successfully logged in.',
    type: SignInResponseDto,
  })
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) signInDto: SignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }
}
