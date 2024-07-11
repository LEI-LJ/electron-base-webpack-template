import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './../entities/category.entity';
import { Question } from './../entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Category])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
