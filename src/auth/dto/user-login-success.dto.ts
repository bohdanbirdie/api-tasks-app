import { User } from '../../users/models/user.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('UserLoginSuccess')
export class UserLoginSuccess extends User {
  @Field({ nullable: false })
  access_token: string;
}