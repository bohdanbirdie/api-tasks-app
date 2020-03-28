import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './models/user.model';
import { LocalAuthPayload } from 'src/auth/dto/local-auth-payload.input';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    return await this.users.findOne({ username });
  }

  async findOneById(id: number): Promise<User> {
    return await this.users.findOne({ id });
  }

  async create({ username, password }: LocalAuthPayload): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.users.create({ username, password: hashedPassword });
    const created = await this.users.save(user);

    return created;   
  }
}