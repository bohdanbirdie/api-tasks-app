import { Profile } from './models/user.model';
import { User } from 'src/users/models/user.model';
import { Resolver, Query } from '@nestjs/graphql';
import { CurrentUser } from './current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from 'src/auth/gql-jwt-auth.guard';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
  ) { }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => User)
  async me(@CurrentUser() user: User): Promise<User> {
    const fullUser = await this.usersService.findOneById(user.id);

    return fullUser;
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => [Profile])
  async profiles(@CurrentUser() user: User): Promise<Profile[]> {
    return await this.usersService.getProfiles(user.id);
  }
}
