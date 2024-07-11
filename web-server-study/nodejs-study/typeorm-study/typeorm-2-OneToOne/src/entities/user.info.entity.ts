import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { UserAccount } from './user.account.entity';

/* 用户信息表---与账号信息建立一对一双向关联 */
@Entity()
export class UserInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
    length: 20,
    default: null,
    comment: '姓名',
  })
  name: string;

  @Column({ type: 'int', name: 'age', default: null, comment: '年龄' })
  age: Number;

  @Column({
    type: 'varchar',
    name: 'phone',
    length: 12,
    default: null,
    comment: '手机号',
  })
  phone: Number;

  @OneToOne(() => UserAccount, (m) => m.userinfo)
  @JoinColumn()
  account: UserAccount;
}
