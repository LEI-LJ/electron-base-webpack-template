import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { bcryptEncryption } from 'src/utils/crypto';
import { DataSource, Like, Repository } from 'typeorm';
import { SystemUser} from '../../../entities/system/user.entity';
import { UserListDTO } from './dto/user.list.dto';
import { UserAddDTO } from './dto/add.dto';
import { SystemUserRole } from 'src/entities/system/user_role.entity';
import { SystemRole } from 'src/entities/system/role.entity';
import { SystemMenu } from 'src/entities/system/menu.entity';
import { SystemRoleMenu } from 'src/entities/system/role_menu.entity';
import { handleTree } from 'src/utils/tools';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(SystemUser)
    private userRepository: Repository<SystemUser>,
    private dataSource: DataSource,
    @InjectEntityManager()
    private entityManager,
  ) {}

  /**
   * 检测手机号是否已注册
   * @param id 
   * @returns User
   */
  async checkByPhone(phone): Promise<Boolean>{
    const fUser = await this.userRepository.findOne({
      where: {phone: phone}
    })
    if(!fUser){
      return true
    }else{
      return false
    }
  }

  /**
   * 分页列表
   * @param que 
   * @returns 
   */
  async getList(que: UserListDTO) {
    let { pageSize, pageNum, orderBy, sort, ...params } = que;
    orderBy = que.orderBy || 'create_time';
    sort = que.sort || 'DESC';
    pageSize = Number(que.pageSize || 10);
    pageNum = Number(que.pageNum || 1);
    // 将查询参数分别包裹处理
    const queryParams = {} as any;
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        queryParams[key] = Like(`%${params[key]}%`); // 所有字段支持模糊查询、%%之间不能有空格
      }
    });
    // 创建查询
    const qb = await this.userRepository.createQueryBuilder('agent');
    qb.where(queryParams);
    qb.orderBy(`agent.${orderBy}`, sort);
    qb.skip(pageSize * (pageNum - 1));
    qb.take(pageSize);

    return {
      list: await qb.getMany(),
      total: await qb.getCount(), // 总的数量
      pageSize,
      pageNum,
    };
  }

  /**
   * 根据id获取详情
   * @returns 
   */
  async findDetailById(id) {
    return await this.entityManager
    .createQueryBuilder(SystemUser,'sysUser')
    .leftJoin(SystemUserRole,'sysUserRole','sysUserRole.userId = sysUser.id')
    .leftJoinAndMapMany('sysUser.roles',SystemRole,'userRoles','userRoles.id = sysUserRole.roleId')
    .where("sysUser.id = :id",{id: id})
    .getOne()
  }

  /** 
   * 获取当前token用户详情
   * @returns 
   */
  async findDetail(id) {
     let userInfo = await this.entityManager
      .createQueryBuilder(SystemUser,'sysUser')
      .where("sysUser.id = :id",{id: id})
      .getOne()
    let userRole = await this.entityManager
    .createQueryBuilder(SystemRole,'sysRole')
    .leftJoin(SystemUserRole,'sysUserRole','sysUserRole.roleId = sysRole.id')
    .where("sysUserRole.userId = :userId",{userId: id})
    .getMany()

    let userButtons = await this.entityManager
    .createQueryBuilder(SystemMenu,'sysMenu')
    .leftJoin(SystemRoleMenu,'sysRoleMenu','sysRoleMenu.menuId = sysMenu.id')
    .leftJoin(SystemUserRole,'sysUserRole','sysRoleMenu.roleId = sysUserRole.roleId')
    .where("sysUserRole.userId = :userId",{userId: id})
    .andWhere("sysMenu.menuType = :type", { type: "F" })
    .getMany()
    return {
      user: userInfo,
      roles: userRole,
      permissions: userButtons && userButtons.length>0 ? userButtons.map(item=>{return item.perms}) : []
    }
  }

  /**
   * 新增
   */
  async addUser(userlogindto: UserAddDTO) {
    let isRegister = await this.checkByPhone(userlogindto.phone)
    if(!isRegister){
      throw new HttpException('账号已注册！',HttpStatus.INTERNAL_SERVER_ERROR)
    }
    userlogindto.password = bcryptEncryption(userlogindto.password)
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let result = await queryRunner.manager.save(SystemUser,userlogindto)
      if(userlogindto.roles && userlogindto.roles.length != 0){
        let iValues = []
        for(let i=0;i<userlogindto.roles.length;i++){
          let arr = { userId: result.id, roleId: userlogindto.roles[i] }
          iValues.push(arr)
        }
        await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(SystemUserRole)
        .values(iValues)
        .execute();
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
   * 修改
   * @param userlogindto 
   * @returns 
   */
  async updateUser(userlogindto: UserAddDTO) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let result = await queryRunner.manager.save(SystemUser,userlogindto)
      if(userlogindto.roles && userlogindto.roles.length != 0){
        await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(SystemUserRole)
        .where("userId = :userId", { userId: result.id })
        .execute();
        let iValues = []
        for(let i=0;i<userlogindto.roles.length;i++){
          let arr = { userId: result.id, roleId: userlogindto.roles[i] }
          iValues.push(arr)
        }
        await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(SystemUserRole)
        .values(iValues)
        .execute();
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
   * 重置密码
   * @param id 
   * @returns 
   */
  async resetUser(id,resetPass) {
    let pass = bcryptEncryption(resetPass?resetPass:'123456')
    return await this.userRepository.update({ id: id }, {password: pass})
  }
}
