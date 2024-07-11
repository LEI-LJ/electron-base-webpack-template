import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

import { AutherInfo } from './auther.info.entity';

/* 用户照片表---与信息表进行多对一关联 */
@Entity()
export class AutherPhotos extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    name: 'url',
    comment: '图片路径',
    default: null,
  })
  url: string;

  @Column({
    type: 'varchar',
    name: 'description',
    comment: '图片描述',
    default: null,
  })
  description: string;

  @ManyToOne(() => AutherInfo, (autherinfo) => autherinfo.photos)
  autherinfo: AutherInfo[];
}
