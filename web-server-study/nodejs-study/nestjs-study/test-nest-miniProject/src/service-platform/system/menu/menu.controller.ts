import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Post, Query, UseInterceptors } from '@nestjs/common';

import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SystemMenu } from 'src/entities/system/menu.entity';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/roles.enum';
import { MenuListDTO } from './dto/menu.list.dto';
import { MenuService } from './menu.service';
import { JwtUser } from 'src/shared/decorators/user.decorator';


@ApiTags('菜单管理')
@ApiBearerAuth()
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  /**
 * 分页列表
 * @param que 
 * @returns 
 */
  @ApiOperation({
    summary: '菜单列表'
  })
  @ApiOkResponse({
    description: '菜单列表',
    type: [SystemMenu]
  })
  @Roles(Role.Admin)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('list')
  getList(@Query() que: MenuListDTO) {
    return this.menuService.getList(que)
  }
  /**
   * 菜单树列表
   * @param que 
   * @returns 
   */
  @ApiOperation({
    summary: '菜单树列表(根据角色id获取对应的菜单树列表)'
  })
  @ApiOkResponse({
    description: '菜单树列表',
    type: [SystemMenu]
  })
  @Roles(Role.Admin)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiQuery({ name: 'roleId', description: '角色id(传空字符串默认查询所有)', required: true })
  @Get('treeList')
  treeList(@Query('roleId') roleId) {
    return this.menuService.getTreeList(roleId)
  }

  /**
   * 获取当前用户路由列表
   * @param que 
   * @returns 
   */
   @ApiOperation({
    summary: '获取当前用户路由列表'
  })
  @ApiOkResponse({
    description: '获取当前用户路由列表',
    type: [SystemMenu]
  })
  @Get('getRouters')
  getRouters(@JwtUser() user) {
    return this.menuService.getTreeRouters(user.id)
  }

  /**
   * 新增
   * @param userdto 
   * @returns 
   */
  @ApiOperation({
    summary: '新增菜单'
  })
  @Post('add')
  @Roles(Role.Admin)
  addMenu(@Body() menus: SystemMenu) {
    return this.menuService.addMenu(menus)
  }

  /**
   * 修改
   * @param userdto 
   * @returns 
   */
  @ApiOperation({
    summary: '修改菜单'
  })
  @Post('update')
  @Roles(Role.Admin)
  updateMenu(@Body() menus: SystemMenu) {
    return this.menuService.updateMenu(menus)
  }

  /**
   * 删除
   * @param userdto 
   * @returns 
   */
  @ApiOperation({
    summary: '删除菜单'
  })
  @Post('delete')
  @Roles(Role.Admin)
  delMenu(@Body() menus: SystemMenu) {
    return this.menuService.deleteMenu(menus)
  }

}
