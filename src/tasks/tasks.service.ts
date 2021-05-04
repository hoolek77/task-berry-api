import {
  Injectable,
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
import { CANT_FIND_MSG, NOT_AUTHORIZED_MSG } from 'src/constants';

@Injectable()
export class TasksService {
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
      throw new NotFoundException(CANT_FIND_MSG);
    }

    if (!this.isAuthorized(user._id, task.userId)) {
      throw new UnauthorizedException(NOT_AUTHORIZED_MSG);
    }

    return task;
  }

  async getTasks(user: User): Promise<Task[]> {
    try {
      const tasks = this.taskModel.find({ userId: user._id });

      return tasks;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const task = await this.taskModel.findById(id);

    if (!task) {
      throw new NotFoundException(CANT_FIND_MSG);
    }

    if (!this.isAuthorized(user._id, task.userId)) {
      throw new UnauthorizedException(NOT_AUTHORIZED_MSG);
    }

    await this.taskModel.findByIdAndDelete(id);
  }

  async updateTask(
    id: string,
    user: User,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const { title, description, color } = updateTaskDto;

    const task = await this.taskModel.findById(id);

    if (!task) {
      throw new NotFoundException(CANT_FIND_MSG);
    }

    if (!this.isAuthorized(user._id, task.userId)) {
      throw new UnauthorizedException(NOT_AUTHORIZED_MSG);
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.color = color ?? task.color;

    await task.save();

    return task;
  }

  async changeFinished(id: string, user: User): Promise<Task> {
    const task = await this.taskModel.findById(id);

    if (!task) {
      throw new NotFoundException(CANT_FIND_MSG);
    }

    if (!this.isAuthorized(user._id, task.userId)) {
      throw new UnauthorizedException(NOT_AUTHORIZED_MSG);
    }

    task.finished = !task.finished;
    await task.save();
    return task;
  }

  private isAuthorized(userId, userIdFromTask): boolean {
    return String(userId) != String(userIdFromTask) ? false : true;
  }
}
