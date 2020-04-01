import { Entity, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, JoinColumn, Column } from 'typeorm';
import { User } from 'src/users/models/user.model';
import { Task } from './task.model';
import { TaskStatus } from '../enums/task-status';
import { BaseModel } from 'src/helpers/BaseModel';
import { ObjectType, Int, Field } from '@nestjs/graphql';

@Entity('task_status_history')
@ObjectType('TaskStatusHistoryEvent')
export class TaskStatusHistoryEvent extends BaseModel {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number

  @PrimaryColumn()
  @Field(() => Int)
  taskId: number;

  @PrimaryColumn()
  @Field(() => Int)
  userId: number;

  @Column({
    type: "enum",
    enum: TaskStatus,
    default: TaskStatus.READY
  })
  @Field(() => TaskStatus)
  status: TaskStatus;

  @ManyToOne(type => User, user => user.sharingConnection, { primary: true })
  @JoinColumn({ name: 'userId' })
  @Field(() => User)
  user: User;

  @ManyToOne(type => Task, task => task.sharingConnection, { primary: true })
  @JoinColumn({ name: 'taskId' })
  task: Task;
}