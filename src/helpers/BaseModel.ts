import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType('BaseModel')
export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @CreateDateColumn({ type: "timestamp" })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: "timestamp" })
  @Field()
  updatedAt: string;
}