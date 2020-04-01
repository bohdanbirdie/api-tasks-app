import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString, IsOptional } from 'class-validator';

@InputType()
export class UpdateTaskDetails {
  @Field(() => Int)
  @IsNumber()
  taskId: number;

  @Field()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;
}