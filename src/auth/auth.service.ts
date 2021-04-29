import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  //TODO: add error catching
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    const match = await bcrypt.compare(pass, user.password);
    if (match) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(user: User) {
    return await this.usersService.create(user);
  }

  async login(user: any) {
    const result = await this.validateUser(user.email, user.password);
    if (result === null) {
      return { statusCode: 401, message: 'Unauthorized' };
    }
    const payload = { username: result.email, sub: result._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
