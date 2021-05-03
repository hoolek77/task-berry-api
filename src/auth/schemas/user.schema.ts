import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../interfaces/user.interface';
import { TaskSchema } from '../../tasks/schemas/task.schema';

export interface UserObject extends User {
  validatePassword: (str: string) => boolean;
}

export const UserSchema: any = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  salt: String,
  tasks: [TaskSchema],
});

UserSchema.methods.validatePassword = async function(
  password: string,
): Promise<boolean> {
  const hash = await bcrypt.hash(password, this.salt);
  return hash === this.password;
};
