import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
} from 'typeorm';

import { Question } from './question.entity';

/* 类别表 */
@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'name', comment: '类别名称' })
  name: string;

  @ManyToMany(() => Question, (question) => question.categories)
  questions: Question[];
}
