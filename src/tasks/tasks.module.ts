import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './../users/users.service';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { Task } from './models/task.model';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/models/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User]), UsersModule],
  providers: [TasksService, TasksResolver, UsersService]
})
export class TasksModule {}
