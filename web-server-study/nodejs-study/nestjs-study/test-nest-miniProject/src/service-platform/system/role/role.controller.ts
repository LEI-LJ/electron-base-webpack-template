import { RoleService } from './role.service';
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SystemRole } from 'src/entities/system/role.entity';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/roles.enum';
import { RoleListDTO } from './dto/role.list.dto';
import { RoleAddDTO } from './dto/add.dto';

@ApiTags('角色管理')
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}
  /**
   * 分页列表
   * @param que 
   * @returns 
   */
  @ApiOperation({
    summary: '角色列表'
  })
  @ApiOkResponse({
    description: '角色列表',
    type: [SystemRole]
  })
  @Roles(Role.Admin)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('list')
  getList(@Query() que: RoleListDTO) {
    return this.roleService.getList(que)
  }

  /**
   * 新增角色
   * @param userdto 
   * @returns 
   */
  @ApiOperation({
    summary: '新增角色'
  })
  @Post('add')
  @Roles(Role.Admin)
  add(@Body() role: RoleAddDTO) {
    return this.roleService.add(role)
  }
  /**
   * 修改角色
   * @param userdto 
   * @returns 
   */
  @ApiOperation({
    summary: '修改角色'
  })
  @Post('update')
  @Roles(Role.Admin)
  update(@Body() role: RoleAddDTO) {
    return this.roleService.update(role)
  }

  /**
   * 删除
   * @param userdto 
   * @returns 
   */
  @ApiOperation({
    summary: '删除角色'
  })
  @Delete('delete')
  @Roles(Role.Admin)
  delMenu(@Query('id') id) {
    return this.roleService.delete(id)
  }

}

