import {
  Injectable,
  Logger,
  InternalServerErrorException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn.dto';
import { UserObject } from './schemas/user.schema';
import { JwtPayload } from './jwt-payload.interface';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserObject>,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signUp(authDto: AuthDto): Promise<{ email: string; name: string }> {
    const { name, email, password } = authDto;

    const user = new this.userModel();
    user.name = name;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    const isExist = await this.userModel.findOne({ email: user.email });
    if (isExist) {
      throw new BadRequestException(
        `User with email: ${user.email} already exist!`,
      );
    }

    try {
      await user.save();
      return { email: user.email, name: user.name };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async validateUserPassword(
    signInDto: SignInDto,
  ): Promise<{ email: string; name: string }> {
    const { email, password } = signInDto;
    const user = await this.userModel.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return { email: user.email, name: user.name };
    } else {
      return null;
    }
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; email: string; name: string }> {
    const { email, name } = await this.validateUserPassword(signInDto);
    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email, name };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken, email, name };
  }
}
