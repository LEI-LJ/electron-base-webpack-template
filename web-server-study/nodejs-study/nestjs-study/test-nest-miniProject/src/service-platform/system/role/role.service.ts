import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemRole } from 'src/entities/system/role.entity';
import { DataSource, Like, Repository } from 'typeorm';
import { RoleListDTO } from './dto/role.list.dto';
import { RoleAddDTO } from './dto/add.dto';
import { SystemRoleMenu } from 'src/entities/system/role_menu.entity';

@Injectable()
export class RoleService {
  constructor(   
    @InjectRepository(SystemRole)
    private roleRepository: Repository<SystemRole>,
    private dataSource: DataSource
  ){}

  /**
   * 分页列表
   * @param que 
   * @returns 
   */
  async getList(que: RoleListDTO) {
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
   * 新增角色
   * @param role
   */
  async add(role: RoleAddDTO){
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if(role.menus.length !== 0){
        let result = await queryRunner.manager.save(SystemRole,role)
        let iValues = []
        for(let i=0;i<role.menus.length;i++){
          let arr = { roleId: result.id, menuId: role.menus[i] }
          iValues.push(arr)
        }
        await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(SystemRoleMenu)
        .values(iValues)
        .execute();
      }else{
        throw new HttpException('请选择菜单',HttpStatus.INTERNAL_SERVER_ERROR)
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException('操作失败',HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  /**
   * 修改角色
   * @param role
   */
  async update(role: RoleAddDTO){
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if(role.menus.length !== 0){
        // 保存角色信息
        let result = await queryRunner.manager.save(SystemRole,role)
        // 处理菜单关联
        await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(SystemRoleMenu)
        .where("roleId = :roleId", { roleId: result.id })
        .execute();
        let iValues = []
        for(let i=0;i<role.menus.length;i++){
          let arr = { roleId: result.id, menuId: role.menus[i] }
          iValues.push(arr)
        }
        await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(SystemRoleMenu)
        .values(iValues)
        .execute();
      }else{
        throw new HttpException('请选择菜单',HttpStatus.INTERNAL_SERVER_ERROR)
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException('操作失败',HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }


  /**
   * 删除角色
   * @param id 
   */
  async delete(id){
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try{
      // 删除指定角色
      await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(SystemRole)
      .where("id = :id", { id: id })
      .execute();
      // 删除关联表指定信息
      await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(SystemRoleMenu)
      .where("roleId = :id", { id: id })
      .execute();
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException('操作失败',HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

}
