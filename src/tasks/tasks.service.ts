import { TaskStatusHistoryEvent } from './models/task-status-history.model';
import { User } from 'src/users/models/user.model';
import { Task } from './models/task.model';
import { Injectable, Logger, ForbiddenException } from '@nestjs/common';

import { NewTaskInput } from './dto/new-task.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ShareTaskInput } from './dto/share-task.input';
import { TaskSharing } from './models/task-sharing.model';
import { ChangeTaskStatusInput } from './dto/change-task-status.input';
import { TaskStatus } from './enums/task-status';


@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,

    private usersService: UsersService,

    @InjectRepository(TaskSharing)
    private tasksSharingRepository: Repository<TaskSharing>,

    @InjectRepository(TaskStatusHistoryEvent)
    private tasksHistoryEvents: Repository<TaskStatusHistoryEvent>,
  ) { }

  async getAllTasks({ id }: User): Promise<Task[]> {
    const user = await this.usersService.findOneById(id);
    const tasks = await this.tasksRepository.find({ relations: ['author'], where: { author: user }, order: { id: 'DESC' } });

    return tasks;
  }

  async getSharedTasks({ id }: User): Promise<Task[]> {
    const user = await this.usersService.findOneById(id);
    const shares = await this.tasksSharingRepository.find({
      where: {
        userId: user.id
      },
    });

    if (!shares.length) {
      return [];
    }

    const tasks = await this.tasksRepository.find({
      relations: ['author'],
      where: {
        id: In(shares.map(share => share.taskId))
      },
      order: { id: 'DESC' }
    });

    return tasks;
  }

  async validateAccessToTask(userId: number, taskId: number): Promise<Task> {
    const task = await this.tasksRepository.createQueryBuilder('tasks')

      .leftJoinAndSelect('tasks.author', 'author')
      .leftJoinAndSelect('tasks.sharingConnection', 'sharingConnection')

      .where('tasks.id = :taskId', { taskId })
      .andWhere('tasks.author = :authorId', { authorId: userId })

      .orWhere('tasks.id = :taskId', { taskId })
      .andWhere('sharingConnection.userId = :userId', { userId })

      .getOne();

      console.log('validate', task, userId, taskId);

    if (!task) {
      throw new ForbiddenException();
    }

    return task;
  }

  async findTaskById({ id }: User, taskId: number): Promise<Task> {
    return await this.validateAccessToTask(id, taskId);
  }

  async create(newTaskInput: NewTaskInput, currentUser: User): Promise<Task> {
    const user = await this.usersService.findOneById(currentUser.id);
    const newTaskPayload = this.tasksRepository.create({ ...newTaskInput, author: user });
    const newTask = await this.tasksRepository.save(newTaskPayload);

    await this.changeTaskStatus({ taskId: newTask.id, status: TaskStatus.READY }, currentUser);

    return newTask
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

  async changeTaskStatus({ taskId, status }: ChangeTaskStatusInput, { id }: User): Promise<Task> {
    const task = await this.validateAccessToTask(id, taskId);

    const historyEvent = this.tasksHistoryEvents.create({
      taskId,
      userId: id,
      status
    });

    await this.tasksHistoryEvents.save(historyEvent);
    
    return task;
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete({ id });
  }

  async getTaskStatus(task: Task): Promise<TaskStatus> {
    const event = await this.tasksHistoryEvents.findOne({  where: { taskId: task.id }, order: { id: 'DESC' } });

    return event ? event.status : TaskStatus.READY;
  }
}
