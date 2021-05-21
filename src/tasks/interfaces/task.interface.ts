import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface Task extends Document {
  title: string;
  description: string;
  label?: string;
  finished: boolean;
  userId: mongoose.Schema.Types.ObjectId;
  color: string;
}
