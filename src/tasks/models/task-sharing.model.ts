import { Entity, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { User } from 'src/users/models/user.model';
import { Task } from './task.model';
import { BaseModel } from 'src/helpers/BaseModel';

@Entity('task_sharing')
export class TaskSharing extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @PrimaryColumn()
  taskId: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(type => User, user => user.sharingConnection, { primary: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(type => Task, task => task.sharingConnection, { primary: true })
  @JoinColumn({ name: 'taskId' })
  task: Task;
}