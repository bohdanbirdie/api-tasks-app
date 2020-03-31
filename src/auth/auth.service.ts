/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginSuccess } from './dto/user-login-success.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { username: string, password: string }): Promise<UserLoginSuccess> {
    const found = await this.usersService.findOne(user.username);

    const payload = { username: found.username, sub: found.id };
    const access_token = await this.jwtService.sign(payload);

    return { ...found, access_token };
  }

  validateToken(token: string) {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      return error.name;
    }
  }

  async create(user: { username: string, password: string }): Promise<UserLoginSuccess> {
    const found = await this.usersService.findOne(user.username);

    if (found) {
      throw new ForbiddenException(`Username ${user.username} already used`);
    }
    const created = await this.usersService.create(user);

    return await this.login(created);
  }
}