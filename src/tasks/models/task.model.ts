import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}