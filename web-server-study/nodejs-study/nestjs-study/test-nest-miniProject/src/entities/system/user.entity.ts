import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class SystemUser extends BaseEntity{

  @ApiProperty({
    description: '昵称',
    required: false
  })
  @Column({type:'varchar', length: 20, name: 'nickname', nullable: true})
  nickname: string;

  @ApiProperty({
    description: '真实姓名',
    required: false
  })
  @Column({type:'varchar', length: 20, name: 'real_name',nullable: true})
  realName: string;

  @ApiProperty({
    description: '身份证',
    required: false
  })
  @Column({type:'varchar', length: 18, name: 'id_card',nullable: true})
  idCard: string;

  @ApiProperty({
    description: '头像',
    required: false
  })
  @Column({type:'varchar', name: 'avatar',nullable: true})
  avatar: string;

  @ApiProperty({
    description: '性别',
    required: false
  })
  @Column({type:"char", length: 1, name: 'gender',default: 0,comment:'0未知1女2男'})
  gender: string;
  
  @ApiProperty({
    description: '手机号',
    required: false
  })
  @Column({type:'varchar', length: 11, name: 'phone'})
  phone: string;

  @ApiProperty({
    description: '邮箱',
    required: false
  })
  @Column({type:'varchar', length: 50, name: 'email',nullable: true})
  email: string;

  @Exclude()
  @Column({type:'varchar', name: 'password'})
  password: string;

  @Exclude()
  @Column({type:'char', length: 1, name: 'del_flag',default: 0,comment:'0默认1已删除'})
  delFlag: number;

  @ApiProperty({
    description: '状态',
    required: false
  })
  @Column({type:'char', length: 1, name: 'status',default: 1,comment:'0禁用1启用'})
  status: number;
}