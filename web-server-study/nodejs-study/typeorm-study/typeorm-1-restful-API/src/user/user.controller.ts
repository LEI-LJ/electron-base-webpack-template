import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  /* 查询所有列表 */
  @Get('list')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  /* 查询单个详情 */
  @Get('detail')
  findOne(@Query() query): Promise<User> {
    return this.userService.findOne(query);
  }
  /* 新增数据 */
  @Post('add')
  addOne(@Body() rUser): Promise<String> {
    return this.userService.addOne(rUser);
  }
  /* 修改数据 */
  @Put('update')
  updateOne(@Body() uUser): Promise<String> {
    return this.userService.updateOne(uUser);
  }
  /* 删除数据 */
  @Delete('del')
  delOne(@Query() query): Promise<String> {
    return this.userService.delOne(query);
  }
}
