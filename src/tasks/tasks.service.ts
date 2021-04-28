import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CANT_FIND_MSG } from 'src/constants';

import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async getTasks(): Promise<Task[]> {
    const tasks = await this.taskModel.find();
    return tasks;
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.findTaskById(id);

    return task;
  }

  async addTask(
    title: string,
    description: string,
    color: string,
    date: string,
  ): Promise<string> {
    const dateFormatted = new Date(date);

    const task = new this.taskModel({
      title,
      description,
      color,
      date: dateFormatted,
    });

    const result = await task.save();
    return result.id;
  }

  async updateTask(
    id: string,
    title?: string,
    description?: string,
    color?: string,
    date?: string,
  ): Promise<Task> {
    const task = await this.findTaskById(id);

    if (title) {
      task.title = title;
    }

    if (description) {
      task.description = description;
    }

    if (color) {
      task.color = color;
    }

    if (date) {
      task.date = new Date(date);
    }

    await task.save();
    return task;
  }

  async findTaskById(id: string): Promise<Task> {
    try {
      const task = await this.taskModel.findById(id);

      if (!task) throw new NotFoundException(CANT_FIND_MSG);

      return task;
    } catch (ex) {
      throw new NotFoundException(CANT_FIND_MSG);
    }
  }

  async deleteTask(id: string) {
    let product;
    try {
      product = await this.taskModel.findById(id);
    } catch (ex) {
      if (!product) throw new NotFoundException(CANT_FIND_MSG);
    }

    await this.taskModel.findByIdAndDelete(id);
  }

  //TODO: add ability to mark task as finished
}
