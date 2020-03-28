  
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ShareTaskInput {
  @Field(() => Int)
  taskId: number;

  @Field(() => Int)
  shareWithId: number;
}