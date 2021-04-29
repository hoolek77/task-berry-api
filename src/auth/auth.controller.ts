import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/users/user.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: User) {
    return this.authService.register(user);
  }

  @Post('login')
  async login(@Body() user) {
    return this.authService.login(user);
  }
}
