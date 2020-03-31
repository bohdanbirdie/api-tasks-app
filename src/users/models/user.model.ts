import { BaseModel } from './../../helpers/BaseModel';
import { TaskStatusHistoryEvent } from './../../tasks/models/task-status-history.model';
import { Field, ObjectType, Int, HideField } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Task } from 'src/tasks/models/task.model';
import { TaskSharing } from 'src/tasks/models/task-sharing.model';


@Entity('users')
@ObjectType('User')
export class User extends BaseModel {
  @Column()
  @Field({ nullable: false })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Field(type => [Task])
  @OneToMany(type => Task, task => task.author)
  tasks: Task[];

  @OneToMany(() => TaskSharing, sc => sc.user)
  sharingConnection: TaskSharing[];

  @OneToMany(() => TaskStatusHistoryEvent, sc => sc.user)
  statusHistoryConnection: TaskStatusHistoryEvent[];
}

@ObjectType('Profile')
export class Profile implements Pick<User, "id" | "username"> {
  @Field(type => Int)
  id: number;

  @Field()
  username: string;

  static fromUser(user: User): Profile {
    const profile = new Profile();
    profile.id = user.id;
    profile.username = user.username;

    return profile;
  }
}