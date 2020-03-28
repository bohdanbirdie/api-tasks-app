import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { UserLoginSuccess } from './dto/user-login-success.dto';
import { GqlLocalAuthGuard } from './gql-local-auth.guard';
import { AuthService } from './auth.service';
import { LocalAuthPayload } from './dto/local-auth-payload.input';

@Resolver('Auth')
export class AuthResolver {

  constructor(private authService: AuthService) {}

  @UseGuards(GqlLocalAuthGuard)
  @Mutation(() => UserLoginSuccess)
  async login(@Args('localAuthPayload') localAuthPayload: LocalAuthPayload) {
    return await this.authService.login(localAuthPayload);
  }

  @Mutation(() => UserLoginSuccess)
  async signup(@Args('localAuthPayload') localAuthPayload: LocalAuthPayload) {
    const res = await this.authService.create(localAuthPayload);
    console.log(res);
    return res;
  }

}
