import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { SystemMenu } from 'src/entities/system/menu.entity';
import { Repository, Like } from 'typeorm';
import { MenuListDTO } from './dto/menu.list.dto';
import { handleTree } from 'src/utils/tools';
import { SystemRoleMenu } from 'src/entities/system/role_menu.entity';
import { SystemUserRole } from 'src/entities/system/user_role.entity';

@Injectable()
export class MenuService {
  constructor(   
    @InjectRepository(SystemMenu)
    private roleRepository: Repository<SystemMenu>,
    @InjectEntityManager()
    private entityManager,
  ){}

  /**
   * 菜单列表
   * @param que 
   * @returns 
   */
  async getList(que: MenuListDTO) {
    let { orderBy, sort, ...params } = que;
    orderBy = que.orderBy || 'create_time';
    sort = que.sort || 'DESC';
    // 将查询参数分别包裹处理
    const queryParams = {} as any;
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams[key] = Like(`%${params[key]}%`); // 所有字段支持模糊查询、%%之间不能有空格
      }
    });
    // 创建查询
    const qb = await this.roleRepository.createQueryBuilder('agent');
    qb.where(queryParams);
    qb.orderBy(`agent.${orderBy}`, sort);

    return {
      list: await qb.getMany()
    };
  }
  
  /**
   * 获取菜单树结构
   */
  async getTreeList(roleId){
    if(!roleId){
      const list = await this.roleRepository.find()
      return handleTree(list,'id','parentId','children')
    }else{
      const list = await this.entityManager
      .createQueryBuilder(SystemMenu,'sysMenu')
      .leftJoinAndSelect(SystemRoleMenu,'sysRoleMenu','sysRoleMenu.menuId = sysMenu.id')
      .where("sysRoleMenu.roleId = :roleId",{roleId: roleId})
      .getMany()
      return list
    }
  }
  /**
   * 获取当前用户路由列表
   * @param id 
   */
  async getTreeRouters(id){
    let userMenu = await this.entityManager
    .createQueryBuilder(SystemMenu,'sysMenu')
    .leftJoin(SystemRoleMenu,'sysRoleMenu','sysRoleMenu.menuId = sysMenu.id')
    .leftJoin(SystemUserRole,'sysUserRole','sysRoleMenu.roleId = sysUserRole.roleId')
    .where("sysUserRole.userId = :userId",{userId: id})
    .andWhere("sysMenu.menuType != :type", { type: "F" })
    .getMany()
    return handleTree(userMenu)
  }

  /**
   * 新增菜单
   */
  async addMenu(menu:SystemMenu){
    return await this.roleRepository.save(menu)
  }

  /**
   * 修改菜单
   */
  async updateMenu(menu:SystemMenu){
    return await this.roleRepository.save(menu)
  }
  /**
   * 删除菜单
   * @param id 
   * @returns 
   */
  async deleteMenu(menus: SystemMenu){
    let findInfo = await this.roleRepository.findOne({
      where: {parentId: menus.id}
    }) 
    console.log('f',findInfo)
    if(!findInfo){
      return await this.roleRepository.delete({id: menus.id})
    }else{
      throw new HttpException('删除失败,请检查是否存在子菜单未删除',HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
