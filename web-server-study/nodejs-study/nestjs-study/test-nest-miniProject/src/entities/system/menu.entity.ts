import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class SystemMenu extends BaseEntity{

  @ApiProperty({
    description: '菜单名称',
    required: false
  })
  @Column({type:'varchar', length: 12, name: 'menu_name'})
  menuName: string;

  @ApiProperty({
    description: '菜单路由',
    required: false
  })
  @Column({type:'varchar', length: 200, name: 'path',comment:'菜单路由',nullable: true})
  path: string;

  @ApiProperty({
    description: '菜单组件路径',
    required: false
  })
  @Column({type:'varchar', length: 200, name: 'component', comment:'项目中组件路径',nullable: true})
  component: string;

  @ApiProperty({
    description: '菜单类型（M目录 C菜单 F按钮）',
    required: false
  })
  @Column({type:'char', name: 'menu_type', comment:'菜单类型（M目录 C菜单 F按钮）'})
  menuType: string;

  @ApiProperty({
    description: '菜单状态（0显示 1隐藏）',
    required: false
  })
  @Column({type:'char', name: 'visible', comment:'菜单状态（0显示 1隐藏）', default: 0})
  visible: number;
  
  @ApiProperty({
    description: '权限标识',
    required: false
  })
  @Column({type:'varchar', length: 100, name: 'perms', comment:'权限标识'})
  perms: string;

  @ApiProperty({
    description: '菜单图标',
    required: false
  })
  @Column({type:'text', name: 'icon', comment:'菜单图标',nullable: true})
  icon: string;

  @ApiProperty({
    description: '排序',
    required: false
  })
  @Column({type:'int', name: 'order'})
  order: number;

  @ApiProperty({
    description: '父id',
    required: false
  })
  @Column({type:'int', name: 'parent_id'})
  parentId: number;

}