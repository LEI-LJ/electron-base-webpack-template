import { HttpException, HttpStatus, Injectable, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SystemUser} from 'src/entities/system/user.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { bcryptCompare, bcryptEncryption } from 'src/utils/crypto';
import { RedisConfigService } from 'src/libs/redis/redis.config.service';
import { MessageCodeService } from 'src/libs/message/message.code.service';
import { MessageType } from '../../shared/enums/index.enum';
import { SystemUserThird } from 'src/entities/system/user.third.entity';
import { WechatService } from 'src/libs/third-party-login/wechat.service';
import { SystemUserRole } from 'src/entities/system/user_role.entity';
import { SystemRole } from 'src/entities/system/role.entity';
import { DataSource } from 'typeorm';
import { SystemMenu } from 'src/entities/system/menu.entity';
import { SystemRoleMenu } from 'src/entities/system/role_menu.entity';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(SystemUser)
    private userRepository,
    @InjectEntityManager()
    private entityManager,
    private mjwtService:JwtService,
    private redis: RedisConfigService,
    private messagecode: MessageCodeService,
    private wechatService: WechatService,
    private dataSource: DataSource
  ) {}

  /**
   * 账号密码登录操作
   * @param phone 账号
   * @param pass 密码
   * @returns jwt access_token
   */
  async signIn(phone, pass) {
    let user = await this.validateUser(phone,pass)
    let userParams = {
      id: user.id,
      phone: user.phone,
      roles: [] as any
    }
    userParams.roles = await this.checkUserRoles(phone)
    const tokens = await this.createLoginToken(userParams)
    return tokens
  }

  /**
   * 校验用户手机账号密码
   */
  async validateUser(phone: string, password: string){
    const user = await this.userRepository.findOne({
      where: {phone: phone}
    })
    if (!user) {
      throw new HttpException('用户名不正确！',HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if(!password){
      throw new HttpException('请输入密码！',HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if (!bcryptCompare(password, user.password)) {
      throw new HttpException('密码错误！',HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return user
  }

  /**
   * 查询当前用户的角色信息
   * @param phone 
   */
  async checkUserRoles(phone){
    const userinfo = await this.entityManager
    .createQueryBuilder(SystemRole,'sysRole')
    .leftJoin(SystemUserRole,'sysUserRole','sysUserRole.roleId = sysRole.id')
    .leftJoin(SystemUser,'sysUser','sysUserRole.userId = sysUser.id')
    .where("sysUser.phone = :phone",{phone: phone})
    .getMany()
    if(!userinfo){
      return []
    }
    return userinfo.map(item=>{return item.roleKey})
  }

  /**
   * 账号验证码登录操作
   * @param phone 账号
   * @param code 验证码
   * @returns jwt access_token
   */
  async codeLogin(phone, code){
    // 判断验证码是否存在
    const mcode = await this.redis.getRedis(MessageType.Login + phone)
    if(code !== mcode){
      throw new HttpException('验证码不正确或已经过期',HttpStatus.INTERNAL_SERVER_ERROR)
    }
    const fUser = await this.userRepository.findOne({
      where: {phone: phone}
    })
    if(!fUser){ // 不存在手机号则提示
      throw new HttpException('该账号未注册,请联系管理员处理',HttpStatus.INTERNAL_SERVER_ERROR)
    }
    // 否则创建并且返回token
    let userParams = {
      id: fUser.id,
      phone: fUser.phone,
      roles: [] as any
    }
    userParams.roles = await this.checkUserRoles(phone)
    const tokens = await this.createLoginToken(userParams)
    return tokens
  }

  /**
   * 微信小程序登录，不关联手机号
   */
  async loginWechat(body){
    let info:any = await this.wechatService.getJscode2session(body.code)
    if(info && info.data && info.data.openid){
      // 检查数据库第三方表中是否存在该openid
      const fOpenid = await this.entityManager
      .createQueryBuilder(SystemUserThird,'third')
      .where('third.wxopenid=:wxopenid', { wxopenid:info.data.openid })
      .getOne()
      // 不存在手机号则注册
      if(!fOpenid){
        await this.entityManager
        .createQueryBuilder(SystemUserThird,'third')
        .insert()
        .into(SystemUserThird)
        .values([{ wxopenid: info.data.openid }])
        .execute();
      }
      // 根据openid创建token
      let userParam = {
        openid: info.data.openid
      }
      let tokens = await this.createLoginToken(userParam)
      return {
        access_token: tokens,
        openid: info.data.openid
      }
    }else{
      throw new HttpException('授权登录失败！',HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  /**
   * 微信小程序登录，关联手机号
   */
  async loginWechatPhone(body){
    let info:any = await this.wechatService.getJscode2session(body.loginCode)
    let token = await this.wechatService.getWechatAccessToken()
    if(info && info.data && info.data.openid){ // 成功获取openid
      // 手机号获取方式一：可以通过iv 和 encryptedData 配合session_key 解密出用户数据
      // 方式二：通过微信获取手机号接口获取
      let userPhone = await this.wechatService.getWechatPhoneNumber(token,body.phoneCode)
      if(userPhone && userPhone.data && userPhone.data.errcode == 0){ // 成功获取手机号
        const wxphone = userPhone.data.phone_info.phoneNumber
        // 检查数据库第三方表中是否存在该手机号
        const fphone = await this.entityManager
        .createQueryBuilder(SystemUserThird,'third')
        .where('third.phone=:phone', { phone: wxphone})
        .getOne()
        // 不存在手机号
        if(!fphone){
          // 找数据库中是否存在该openid
          const fOpenid = await this.entityManager
          .createQueryBuilder(SystemUserThird,'third')
          .where('third.wxopenid = :wxopenid', { wxopenid:info.data.openid })
          .getOne()
          if(!fOpenid){
            await this.entityManager
              .createQueryBuilder(SystemUserThird,'third')
              .insert()
              .into(SystemUserThird)
              .values([{ wxopenid: info.data.openid,phone: wxphone }])
              .execute();
          }else{
            await this.entityManager
              .createQueryBuilder(SystemUserThird,'third')
              .update(SystemUserThird)
              .set({ phone: wxphone })
              .where("third.wxopenid = :wxopenid",{ wxopenid: info.data.openid})
              .execute();
          }
        }
        let userParam = {
          openid: info.data.openid
        }
        let tokens = await this.createLoginToken(userParam)
        return {
          access_token: tokens,
          openid: info.data.openid,
          phone: wxphone
        }
      }else{
        throw new HttpException('授权登录失败！',HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }else{
      throw new HttpException('授权登录失败！',HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  /**
   * 注册初始账号,初始化数据库数据
   * @param user 
   * @returns 
   */
  async initData(phone){
    if(phone != '18800008888'){
      throw new HttpException('初始账号错误',HttpStatus.INTERNAL_SERVER_ERROR)
    }
    const findUser = await this.userRepository.findOne({ where: {phone: '18800008888'}})
    if(!!findUser){
      return '已生成过该内容'
    }
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 初始化超级管理员用户数据
      const userResult = await queryRunner.manager.save(SystemUser,{nickname:'admin',password:bcryptEncryption('admin123456'),phone:'18800008888'})
      // 初始化菜单数据
      // 系统管理
      let systemMenu = {
        menuName: '系统管理', 
        menuType: 'M',
        perms: 'system',
        component: 'Layout',
        order: 1,
        parentId:0,
        icon:'<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M764.416 254.72a351.68 351.68 0 0 1 86.336 149.184H960v192.064H850.752a351.68 351.68 0 0 1-86.336 149.312l54.72 94.72-166.272 96-54.592-94.72a352.64 352.64 0 0 1-172.48 0L371.136 936l-166.272-96 54.72-94.72a351.68 351.68 0 0 1-86.336-149.312H64v-192h109.248a351.68 351.68 0 0 1 86.336-149.312L204.8 160l166.208-96h.192l54.656 94.592a352.64 352.64 0 0 1 172.48 0L652.8 64h.128L819.2 160l-54.72 94.72zM704 499.968a192 192 0 1 0-384 0 192 192 0 0 0 384 0z"></path></svg>'
      }
      const systemMenuResult = await queryRunner.manager.save(SystemMenu,systemMenu)
      // 系统管理-子菜单
      const systemChild = [{
        menuName:'菜单管理',
        path: '/system/menu',
        component: 'system/menu/index',
        order: 2,
        menuType: 'C',
        perms: 'system:menu',
        icon: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H608zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H608z"></path></svg>',
        parentId: systemMenuResult.id
      },{
        menuName:'角色管理',
        path: '/system/role',
        component: 'system/role/index',
        order: 3,
        menuType: 'C',
        perms: 'system:role',
        icon: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0 208 208 0 0 1 416 0z"></path></svg>',
        parentId: systemMenuResult.id
      },{
        menuName:'用户管理',
        path: '/system/user',
        component: 'system/user/index',
        order: 1,
        menuType: 'C',
        perms: 'system:user',
        icon: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"></path></svg>',
        parentId: systemMenuResult.id
      }]
      const systemChildResult = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(SystemMenu)
      .values(systemChild)
      .execute()
      console.log('systemChildResult',systemChildResult.identifiers)
      // 初始化角色
      const roleResult = await queryRunner.manager.save(SystemRole,{roleName:'超级管理员',roleKey:'admin',order: 1})
      // 设置关联表
      let roleMenuList = [{
        roleId:roleResult.id,
        menuId:systemMenuResult.id
      }]
      for(let i = 0;i<systemChildResult.identifiers.length;i++){
        let arr = {
          roleId: roleResult.id,
          menuId: systemChildResult.identifiers[i].id
        }
        roleMenuList.push(arr)
      }
      await queryRunner.manager 
      .createQueryBuilder()
      .insert()
      .into(SystemRoleMenu)
      .values(roleMenuList)
      .execute()

      await queryRunner.manager 
      .createQueryBuilder()
      .insert()
      .into(SystemUserRole)
      .values({
        userId: userResult.id,
        roleId: roleResult.id
      })
      .execute()

      await queryRunner.commitTransaction();
      return 'ok'
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
   * 找回/修改密码
   * @param body 
   */
  async updatePassword(body,id){
    const { phone, newPassword, code } = body
    // 判断验证码是否存在
    const mcode = await this.redis.getRedis(MessageType.Password + phone)
    if(code !== mcode){
      throw new HttpException('验证码不正确或已经过期',HttpStatus.INTERNAL_SERVER_ERROR)
    }
    const newPass = bcryptEncryption(newPassword)
    return await this.userRepository.update({ id: id }, { password: newPass })
  }

  /**
   * 发送手机短信
   */
  messageCode(que){
    if (que.messageType == MessageType.Login){
      return this.messagecode.createMessage(que.phone,MessageType.Login)
    }
    if (que.messageType == MessageType.Password){
      return this.messagecode.createMessage(que.phone,MessageType.Password)
    }
  }

  /**
   * 生成token的操作
   */
  async createLoginToken(userParam){
    return this.mjwtService.sign(userParam)
  }

}
