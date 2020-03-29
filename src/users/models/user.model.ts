import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Task } from 'src/tasks/models/task.model';
import { TaskSharing } from 'src/tasks/models/task-sharing.model';


@Entity('users')
@ObjectType('User')
export class User {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

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
}