import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks() {
    const tasks = await this.tasksService.getTasks();
    return tasks;
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const task = await this.tasksService.getTaskById(id);

    return task;
  }

  @Post()
  async addTask(
    @Body('title') title: string,
    @Body('description') desc: string,
    @Body('color') color: string,
    @Body('date') date: string,
  ) {
    const id = await this.tasksService.addTask(title, desc, color, date);
    return { id };
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body('title') title?: string,
    @Body('description') desc?: string,
    @Body('color') color?: string,
    @Body('date') date?: string,
  ) {
    const task = await this.tasksService.updateTask(
      id,
      title,
      desc,
      color,
      date,
    );

    return task;
  }
}
