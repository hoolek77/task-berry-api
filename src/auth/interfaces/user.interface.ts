import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Task } from 'src/tasks/interfaces/task.interface';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  salt: string;
  tasks: mongoose.Types.DocumentArray<Task>;
}
