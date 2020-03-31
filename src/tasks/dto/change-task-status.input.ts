import { TaskStatus } from './../enums/task-status';
  
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsEnum } from 'class-validator';

@InputType()
export class ChangeTaskStatusInput {
  @Field(() => Int)
  @IsNumber()
  taskId: number;

  @Field(() => TaskStatus)
  @IsEnum(TaskStatus)
  status: TaskStatus;
}