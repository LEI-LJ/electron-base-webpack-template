import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AutherInfo } from './../entities/auther.info.entity';
import { AutherPhotos } from './../entities/auther.photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AutherInfo, AutherPhotos])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
