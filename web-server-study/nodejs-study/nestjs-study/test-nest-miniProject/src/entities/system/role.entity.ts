import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class SystemRole extends BaseEntity{

  @ApiProperty({
    description: '角色名称',
    required: false
  })
  @Column({type:'varchar', length: 12, name: 'role_name'})
  roleName: string;

  @ApiProperty({
    description: '角色权限字符',
    required: false
  })
  @Column({type:'varchar', length: 12, name: 'role_key',nullable: true, comment:'角色权限字符' })
  roleKey: string;

  @ApiProperty({
    description: '排序',
    required: false
  })
  @Column({type:'int', name: 'order' })
  order: number;

  @ApiProperty({
    description: '角色状态（0正常 1停用）',
    required: false
  })
  @Column({type:'char', name: 'status',default: 0, comment: '角色状态（0正常 1停用）' })
  status: number;

  @ApiProperty({
    description: '备注',
    required: false
  })
  @Column({type:'varchar', length: 150,nullable: true, name: 'remark' })
  remark:string

}