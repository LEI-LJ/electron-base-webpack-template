import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Req, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { SystemUser} from '../../../entities/system/user.entity';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserListDTO } from './dto/user.list.dto';
import { JwtUser } from 'src/shared/decorators/user.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/roles.enum';
import { UserAddDTO } from './dto/add.dto';

@ApiTags('用户管理')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * 检测手机号是否已注册
   * @param id 
   * @returns SystemUser
   */
  @ApiOperation({
    summary: '检测手机号是否已注册'
  })
  @ApiQuery({ name: 'phone', description: '手机号', required: true })
  @Get('checkedByPhone')
  checkByPhone(@Query() que): Promise<Boolean> {
    return this.userService.checkByPhone(que.phone);
  }

  /**
   * 分页列表
   * @param que 
   * @returns 
   */
  @ApiOperation({
    summary: '用户分页列表'
  })
  @ApiOkResponse({
    description: '用户列表',
    type: [SystemUser]
  })
  @Roles(Role.Admin)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('list')
  getList(@Query() que: UserListDTO) {
    return this.userService.getList(que)
  }

  /**
   * 获取当前token用户的获取详情
   */
  @ApiOperation({
    summary: '获取当前token用户的获取详情'
  })
  @ApiOkResponse({
    description: '响应结果',
    type: SystemUser
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get("detail")
  detail(@JwtUser() user){
    return this.userService.findDetail(user.id)
  }

  /**
   * 根据id获取详情
   */
   @ApiOperation({
    summary: '根据id获取详情'
  })
  @ApiOkResponse({
    description: '响应结果',
    type: SystemUser
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get("detailById")
  @Roles(Role.Admin)
  detailById(@Query() user){
    return this.userService.findDetailById(user.id)
  }

  /**
   * 新增
   * @param userdto 
   * @returns 
   */
  @ApiOperation({
    summary: '用户新增'
  })
  @Post('add')
  @Roles(Role.Admin)
  addUser(@Body() userdto: UserAddDTO) {
    return this.userService.addUser(userdto)
  }

  /**
   * 修改
   * @param user 
   * @returns 
   */
  @ApiOperation({
    summary: '用户信息修改'
  })
  @Roles(Role.Admin)
  @ApiBody({ type: SystemUser })
  @Put('update')
  updateUser(@Body() user: SystemUser) {
    return this.userService.updateUser(user)
  }

  /**
   * 重置用户密码
   * @param que 
   * @returns 
   */
  @ApiOperation({
    summary: '重置用户密码'
  })
  @Roles(Role.Admin)
  @ApiQuery({ name: 'id', type: Number, description: '用户ID', required: true })
  @Get('resetPassword')
  resetUser(@Query() que) {
    return this.userService.resetUser(que.id,que.password)
  }
}
