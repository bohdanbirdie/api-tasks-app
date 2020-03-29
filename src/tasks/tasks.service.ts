import { User } from 'src/users/models/user.model';
import { Task } from './models/task.model';
import { Injectable, Logger, ForbiddenException } from '@nestjs/common';

import { NewTaskInput } from './dto/new-task.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ShareTaskInput } from './dto/share-task.input';
import { TaskSharing } from './models/task-sharing.model';


@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,

    private usersService: UsersService,

    @InjectRepository(TaskSharing)
    private tasksSharingRepository: Repository<TaskSharing>,
  ) { }

  async getAllTasks({ id }: User): Promise<Task[]> {
    const user = await this.usersService.findOneById(id);
    this.logger.log(user);
    const tasks = await this.tasksRepository.find({ relations: ['author'], where: { author: user } });
    this.logger.log(tasks);
    return tasks;
  }

  async getSharedTasks({ id }: User): Promise<Task[]> {
    const user = await this.usersService.findOneById(id);
    const shares = await this.tasksSharingRepository.find({
      where: {
        userId: user.id
      },
    });

    const tasks = await this.tasksRepository.find({
      relations: ['author'],
      where: {
        id: In(shares.map(share => share.taskId))
      }
    });

    return tasks;
  }

  async findTaskById({ id }: User, taskId: number): Promise<Task> {
    const task = await this.tasksRepository.createQueryBuilder('tasks')

      .innerJoinAndSelect('tasks.author', 'author')
      .innerJoinAndSelect('tasks.sharingConnection', 'sharingConnection')

      .where('tasks.id = :taskId', { taskId })
      .andWhere('tasks.author = :authorId', { authorId: id })

      .orWhere('tasks.id = :taskId', { taskId })
      .andWhere('sharingConnection.userId = :userId', { userId: id })

      .getOne()


    console.log(`User: ${id}, task: ${taskId}`);
    if (!task) {
      throw new ForbiddenException();
    }
    this.logger.log(task);

    return task;
  }

  async create(newTaskInput: NewTaskInput, { id }: User): Promise<Task> {
    const user = await this.usersService.findOneById(id);
    const newTask = this.tasksRepository.create({ ...newTaskInput, author: user });

    return await this.tasksRepository.save(newTask);
  }

  async shareTask({ taskId, shareWithId }: ShareTaskInput, { id }: User): Promise<Task> {
    const user = await this.usersService.findOneById(id);
    const task = await this.tasksRepository.findOne({ id: taskId, author: user });
    const shareWithUser = await this.usersService.findOneById(shareWithId);

    if (!shareWithUser) {
      throw new ForbiddenException(`User with id ${shareWithId} doesn't exist`);
    }

    if (!task) {
      throw new ForbiddenException(`Task with id ${taskId} doesn't exist or you are not the author`);
    }

    const sharing = this.tasksSharingRepository.create({ userId: shareWithId, taskId: task.id });
    await this.tasksSharingRepository.save(sharing);

    return task;
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete({ id });
  }
}
