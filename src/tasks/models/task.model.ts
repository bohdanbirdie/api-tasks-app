import { TaskStatusHistoryEvent } from './task-status-history.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/models/user.model';
import { TaskSharing } from './task-sharing.model';
import { TaskStatus } from '../enums/task-status';
import { BaseModel } from 'src/helpers/BaseModel';

@Entity('tasks')
@ObjectType()
export class Task extends BaseModel {
  @Column()
  @Field({ nullable: false })
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @ManyToOne(type => User, user => user.tasks)
  @Field(() => User)
  author: User;

  @Field(() => TaskStatus)
  status: TaskStatus;

  @OneToMany(() => TaskSharing, sc => sc.task)
  sharingConnection: TaskSharing[];

  @OneToMany(() => TaskStatusHistoryEvent, sc => sc.task)
  statusHistoryConnection: TaskStatusHistoryEvent[];
}