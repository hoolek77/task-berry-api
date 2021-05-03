import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './interfaces/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/auth/interfaces/user.interface';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private logger = new Logger('TaskService');

  constructor(
    @InjectModel('Task')
    private readonly taskModel: Model<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description, color } = createTaskDto;

    const task = new this.taskModel({
      title,
      description,
      color,
      userId: user._id,
    });

    try {
      await task.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return task;
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    if (String(task.userId) != String(user._id)) {
      throw new UnauthorizedException('This is not your task id');
    }

    return task;
  }

  async getTasks(user: User): Promise<Task[]> {
    try {
      const tasks = this.taskModel.find({ userId: user._id });
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user "${user.email}".}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    try {
      const task = await this.taskModel.findById(id);

      if (String(task.userId) != String(user._id)) {
        throw new UnauthorizedException('This is not your task id');
      }

      await this.taskModel.findByIdAndDelete(id);
      this.logger.verbose(`User "${user.email}" deleted task with ID "${id}".`);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  //TODO: add methods for updating task and changing finished property
}
