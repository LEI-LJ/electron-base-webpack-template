import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

/* 问题表 */
@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '标题',
    name: 'title',
  })
  title: string;

  @Column({
    comment: '描述',
    name: 'description',
    nullable: true,
  })
  description: string;
}
