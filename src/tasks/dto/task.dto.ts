import { Task, TaskWithoutDocument } from '../interfaces/task.interface';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDto implements TaskWithoutDocument {
  @ApiProperty({
    example: 'Clean the house',
  })
  title: string;

  @ApiProperty({
    example: 'Clean the house and wash the dishes',
  })
  description: string;

  @ApiProperty({
    example: 'Home',
  })
  label?: string;

  @ApiProperty({
    example: false,
  })
  finished: boolean;

  @ApiProperty({
    example: '5f9f1c5b9b9b9b9b9b9b9b9b',
  })
  userId: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    example: '#000000',
  })
  color: string;
}
