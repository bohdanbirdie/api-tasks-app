import { TasksService } from './tasks.service';
import { Resolver, Mutation, Int, Parent, ResolveField } from '@nestjs/graphql';
import { Task } from './models/task.model';
import { Query, Args } from '@nestjs/graphql';
import { NewTaskInput } from './dto/new-task.input';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from 'src/auth/gql-jwt-auth.guard';
import { CurrentUser } from 'src/users/current-user.decorator';
import { User } from 'src/users/models/user.model';
import { ShareTaskInput } from './dto/share-task.input';

@Resolver(() => Task)
export class TasksResolver {
  constructor(
    private tasksService: TasksService,
  ){}

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => [Task])
  async tasks(@CurrentUser() user: User): Promise<Task[]> {
    return this.tasksService.getAllTasks(user);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => [Task])
  async sharedTasks(@CurrentUser() user: User): Promise<Task[]> {
    return this.tasksService.getSharedTasks(user);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => Task)
  async task(@Args('id', { type: () => Int }) id: number, @CurrentUser() user: User): Promise<Task> {
    return this.tasksService.findTaskById(user, id);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Task)
  async addTask(
    @Args('newTaskData') newTaskData: NewTaskInput,
    @CurrentUser() user: User,
  ): Promise<Task> {
    return await this.tasksService.create(newTaskData, user);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Task)
  async shareTask(
    @Args('shareTaskInput') shareTaskInput: ShareTaskInput,
    @CurrentUser() user: User,
  ): Promise<Task> {
    return await this.tasksService.shareTask(shareTaskInput, user);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Int)
  async removeTask(@Args('id', { type: () => Int }) id: number): Promise<number> {
    await this.tasksService.remove(id);

    return id;
  }
}
