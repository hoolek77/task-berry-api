import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  UseGuards,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/auth/interfaces/user.interface';
import { Task } from './interfaces/task.interface';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    console.log(user);
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Get()
  getTasks(@GetUser() user: User): Promise<Task[]> {
    return this.tasksService.getTasks(user);
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tasksService.deleteTaskById(id, user);
  }

  @Put(':id/edit')
  @UsePipes(ValidationPipe)
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ) {
    return this.tasksService.updateTask(id, user, updateTaskDto);
  }

  @Put(':id/update-finished')
  updateStatus(@Param('id') id: string, @GetUser() user: User) {
    return this.tasksService.changeFinished(id, user);
  }
}
