import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Put,
} from '@nestjs/common';

import { Transaction, TransactionManager, EntityManager } from 'typeorm';

import { UserService } from './user.service';

import { Question } from '../entities/question.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* 
    查询所有列表 
    @Query 无
  */
  @Get('list')
  findAll(): Promise<Question[]> {
    return this.userService.findAll();
  }
  /* 
    查询单个详情
    @Query ?id=xxx
   */
  @Get('detail')
  findOne(@Query() query): Promise<Question> {
    return this.userService.findOne(query);
  }
  /* 
    新增账号和用户信息数据
    新增时候由于有可能出现两张表同时进行操作的情况
    因此开启事务事件：为了让同时进行的表操作要么一起完成，要么都失败
    @Transaction()和 @TransactionManager() manager: EntityManager 是事务的装饰器和对象
    @Body 
    {
      "title": "问题5",
      "categorylist": [
          1,
          3
      ]
    }
  */
  @Post('add')
  @Transaction()
  addOne(
    @Body() rUser,
    @TransactionManager() manager: EntityManager,
  ): Promise<String> {
    return this.userService.addOne(rUser, manager);
  }
  /* 
    修改账号和用户信息数据
    事务同上
    @Body 有数据id则修改否则新增，然后对比数据库数据进行多余的删除
    {
      "id":3,
      "title": "问题555",
      "categorylist": [
          1,
          2
      ]
    }
  */
  @Put('update')
  @Transaction()
  updateOne(
    @Body() uUser,
    @TransactionManager() manager: EntityManager,
  ): Promise<String> {
    return this.userService.updateOne(uUser, manager);
  }
  /* 
    删除数据
    事务同上
    @Query ?id=xxx
   */
  @Delete('del')
  @Transaction()
  delOne(
    @Query() query,
    @TransactionManager() manager: EntityManager,
  ): Promise<String> {
    return this.userService.delOne(query, manager);
  }
}
