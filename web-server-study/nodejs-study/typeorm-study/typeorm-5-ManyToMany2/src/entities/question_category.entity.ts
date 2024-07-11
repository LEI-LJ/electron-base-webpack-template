import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

/* 问题和类别---关联表 */
@Entity()
export class QuestionCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '问题id',
    name: 'questionId',
  })
  questionId: string;

  @Column({
    comment: '类别id',
    name: 'categoryId',
  })
  categoryId: string;
}
