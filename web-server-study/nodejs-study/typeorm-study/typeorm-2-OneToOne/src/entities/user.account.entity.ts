import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
} from 'typeorm';

import { UserInfo } from './user.info.entity';

/* 
  关于主表和副表的概念：
  主表就是你经常操作的那个表。比如：user_account就是主表,UserAccount就是主表对应的实体类
  而操作：
  getRepository(UserAccount)
    .createQueryBuilder('user_account')
    .leftJoinAndSelect('user_account.userinfo', 'user_info.id')
    .getMany();
  上面建立表关联查询
  外键 即 @JoinColumn() 通常是放在副表里面
  
  双向关联：允许你使用QueryBuilder从双方加入关系
*/

/* 账号信息表---与用户信息建立一对一双向关联 */
@Entity()
export class UserAccount extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    name: 'account',
    length: 20,
    default: null,
    comment: '账号',
  })
  account: string;

  @Column({
    type: 'varchar',
    name: 'password',
    length: 20,
    default: null,
    comment: '密码',
  })
  password: string;

  @OneToOne(() => UserInfo, (m) => m.account)
  userinfo: UserInfo;
}
