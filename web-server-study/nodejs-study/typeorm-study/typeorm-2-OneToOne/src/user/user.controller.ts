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

import { UserAccount } from '../entities/user.account.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* 
    查询所有列表 
    @params 无
  */
  @Get('list')
  findAll(): Promise<UserAccount[]> {
    return this.userService.findAll();
  }
  /* 
    查询单个详情
    @Query ?id=xxx
   */
  @Get('detail')
  findOne(@Query() query): Promise<UserAccount> {
    return this.userService.findOne(query);
  }
  /* 
    新增账号和用户信息数据
    新增时候由于有可能出现两张表同时进行操作的情况
    因此开启事务事件：为了让同时进行的表操作要么一起完成，要么失败
    @Transaction()和 @TransactionManager() manager: EntityManager 是事务的装饰器和对象
    @Body 
    {
      "account": "admin1",
      "password": "000000",
      "userinfo": {
          "name": "zhang1",
          "age": 12,
          "phone": "15622222211"
      }
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
    @Body 
    {
      "id": "14",
      "account": "admin21112222",
      "password": "00000022",
      "userinfo": {
          "id":'10',
          "name": "zhang111222",
          "age": 12,
          "phone": "156222222"
      }
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
