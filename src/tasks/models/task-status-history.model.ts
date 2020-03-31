import { Entity, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, JoinColumn, Column } from 'typeorm';
import { User } from 'src/users/models/user.model';
import { Task } from './task.model';
import { TaskStatus } from '../enums/task-status';
import { BaseModel } from 'src/helpers/BaseModel';

@Entity('task_status_history')
export class TaskStatusHistoryEvent extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @PrimaryColumn()
  taskId: number;

  @PrimaryColumn()
  userId: number;

  @Column({
    type: "enum",
    enum: TaskStatus,
    default: TaskStatus.READY
  })
  status: TaskStatus;

  @ManyToOne(type => User, user => user.sharingConnection, { primary: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(type => Task, task => task.sharingConnection, { primary: true })
  @JoinColumn({ name: 'taskId' })
  task: Task;
}