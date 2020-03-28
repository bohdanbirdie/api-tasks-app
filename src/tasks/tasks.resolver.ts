import { TasksService } from './tasks.service';
import { Resolver, Mutation, Int } from '@nestjs/graphql';
import { Task } from './models/task.model';
import { Query, Args } from '@nestjs/graphql';
import { NewTaskInput } from './dto/new-task.input';

@Resolver(() => Task)
export class TasksResolver {
  constructor(
    private tasksService: TasksService,
  ){}

  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Query(() => Task)
  async task(@Args('id', { type: () => Int }) id: number): Promise<Task> {
    return this.tasksService.findTaskById(id);
  }

  @Mutation(() => Task)
  async addTask(
    @Args('newTaskData') newTaskData: NewTaskInput,
  ): Promise<Task> {
    const recipe = await this.tasksService.create(newTaskData);
    return recipe;
  }

  @Mutation(() => Int)
  async removeTask(@Args('id', { type: () => Int }) id: number): Promise<number> {
    await this.tasksService.remove(id);

    return id;
  }
}
