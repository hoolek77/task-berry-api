import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    color: {
      type: String,
      minLength: 7,
      maxLength: 7,
      required: true,
    },
    finished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
