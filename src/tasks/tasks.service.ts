import { User } from 'src/users/models/user.model';
import { Task } from './models/task.model';
import { Injectable, Logger, ForbiddenException } from '@nestjs/common';

import { NewTaskInput } from './dto/new-task.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ShareTaskInput } from './dto/share-task.input';


@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private usersService: UsersService,
  ) {}

  async getAllTasks({ id }: User): Promise<Task[]> {
    const user = await this.usersService.findOneById(id);
    this.logger.log(user);
    const tasks = await this.tasksRepository.find({ author: user });
    this.logger.log(tasks);
    return tasks;
  }

  async findTaskById(id: number): Promise<Task> {
    const found = this.tasksRepository.findOne({ id });
    this.logger.log(found);

    return found;
  }

  async create(newTaskInput: NewTaskInput, { id }: User): Promise<Task>{
    const user = await this.usersService.findOneById(id);
    const newTask = this.tasksRepository.create({ ...newTaskInput, author: user });

    return await this.tasksRepository.save(newTask);
  }

  async shareTask({ taskId, shareWithId }: ShareTaskInput, { id }: User): Promise<Task>{
    const user = await this.usersService.findOneById(id);
    const task = await this.tasksRepository.findOne({ id: taskId, author: user });
    
    const shareWithUser = await this.usersService.findOneById(shareWithId);
    console.log(shareWithUser);

    if (!shareWithUser) {
      throw new ForbiddenException(`User with id ${shareWithId} doesn't exist`);
    }

    if (!task) {
      throw new ForbiddenException(`Task with id ${taskId} doesn't exist`);
    }

    if (!task.shared) {
      task.shared = [];
    }

    task.shared.push(shareWithUser);
    await this.tasksRepository.save(task);

    return task;
  }

  async remove(id: number): Promise<void>{
    await this.tasksRepository.delete({ id });
  }
}
