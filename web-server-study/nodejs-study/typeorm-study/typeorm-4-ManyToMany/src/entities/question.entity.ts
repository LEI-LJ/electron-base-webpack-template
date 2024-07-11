import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinTable,
  ManyToMany,
  RelationId,
} from 'typeorm';

import { Category } from './category.entity';

/* 问题表---主表带有@JoinTable */
@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '标题' })
  title: string;

  @ManyToMany(() => Category, (category) => category.questions)
  @JoinTable()
  categories: Category[];
}
