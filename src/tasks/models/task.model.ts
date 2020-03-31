import { TaskStatusHistoryEvent } from './task-status-history.model';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/models/user.model';
import { TaskSharing } from './task-sharing.model';
import { TaskStatus } from '../enums/task-status';

@Entity('tasks')
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

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