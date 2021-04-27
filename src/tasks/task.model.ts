import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    minLength: 6,
    maxLength: 255,
  },
  color: {
    type: String,
    minLength: 7,
    maxLength: 7,
    required: true,
  },
  date: {
    type: Date,
    requierd: true,
  },
  finished: {
    type: Boolean,
    default: false,
  },
});

export interface Task extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  color: string;
  date: Date;
  finished?: boolean;
}
