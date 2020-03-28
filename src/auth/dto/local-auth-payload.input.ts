  
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LocalAuthPayload {
  @Field()
  username: string;

  @Field()
  password: string;
}