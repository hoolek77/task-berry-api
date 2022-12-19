import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface TaskWithoutDocument {
  title: string;
  description: string;
  label?: string;
  finished: boolean;
  userId: mongoose.Schema.Types.ObjectId;
  color: string;
}

export type Task = TaskWithoutDocument & Document;
