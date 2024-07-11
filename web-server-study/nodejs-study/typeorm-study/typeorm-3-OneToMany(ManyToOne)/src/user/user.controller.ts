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

import { AutherInfo } from '../entities/auther.info.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* 
    查询所有列表 
    @params 无
  */
  @Get('list')
  findAll(): Promise<AutherInfo[]> {
    return this.userService.findAll();
  }
  /* 
    查询单个详情
    @Query ?id=xxx
   */
  @Get('detail')
  findOne(@Query() query): Promise<AutherInfo> {
    return this.userService.findOne(query);
  }
  /* 
    新增账号和用户信息数据
    新增时候由于有可能出现两张表同时进行操作的情况
    因此开启事务事件：为了让同时进行的表操作要么一起完成，要么都失败
    @Transaction()和 @TransactionManager() manager: EntityManager 是事务的装饰器和对象
    @Body 
    {
      "name": "用户2",
      "age": "22",
      "photos": [
        {
          "description":"图片1号",
          "url":"..../xxx1111.jpg"
        },
        {
          "description":"图片2号",
          "url":"..../xxx2222.jpg"
        }
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
      "id":4,
      "name": "用户2",
      "age": "22",
      "photos": [
        {
          "id":1,
          "description":"图片1号",
          "url":"..../xxx1111.jpg"
        },
        {
          "description":"图片3号",
          "url":"..../xxx333333.jpg"
        }
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
