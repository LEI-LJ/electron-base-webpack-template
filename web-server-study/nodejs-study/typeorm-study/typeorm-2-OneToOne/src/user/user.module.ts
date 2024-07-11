import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { UserAccount } from '../entities/user.account.entity';
import { UserInfo } from '../entities/user.info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccount, UserInfo])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
