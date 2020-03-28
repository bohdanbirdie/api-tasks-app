import { LocalAuthPayload } from './dto/local-auth-payload.input';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Injectable()
export class GqlLocalAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    
    if (!gqlContext) {
      throw new UnauthorizedException();
    }
    const { username, password } = gqlContext.getArgs<{localAuthPayload: LocalAuthPayload }>().localAuthPayload;
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}