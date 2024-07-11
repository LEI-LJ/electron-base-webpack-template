import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';

import { AutherPhotos } from './auther.photo.entity';

/* 用户信息表---与照片表进行一对多关联 */
@Entity()
export class AutherInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'name', comment: '姓名', default: null })
  name: string;

  @Column({ type: 'varchar', name: 'age', comment: '年龄', default: null })
  age: string;

  @OneToMany(() => AutherPhotos, (photo) => photo.autherinfo)
  photos: AutherPhotos[];
}
