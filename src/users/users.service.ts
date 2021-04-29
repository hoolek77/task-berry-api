import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.model';

@Injectable()
export class UsersService {
  readonly saltRounds = 10;

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOne(_id: string): Promise<User> {
    return await this.userModel.findById(_id).exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(user: User): Promise<User> {
    user.password = await bcrypt.hash(user.password, this.saltRounds);
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
}
