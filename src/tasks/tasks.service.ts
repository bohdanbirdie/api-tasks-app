import { Task } from './models/task.model';
import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { NewTaskInput } from './dto/new-task.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private tasks: Task[] = [];

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.tasksRepository.find();
    this.logger.log(tasks);
    return tasks;
  }

  async findTaskById(id: number): Promise<Task> {
    const found = this.tasksRepository.findOne({ id });
    this.logger.log(found);
    return found;
  }

  async create(newTaskInput: NewTaskInput): Promise<Task>{
    // const task = { id: uuidv4(), ...newTaskInput }
    // console.log(newTaskInput);
    // this.tasks.push(task);
    const newTask = await this.tasksRepository.create(newTaskInput);
    const created = await this.tasksRepository.save(newTask);
    this.logger.log(newTask);
    this.logger.log(created);

    return created;
  }

  async remove(id: number): Promise<void>{
    await this.tasksRepository.delete({ id });
  }
}
