import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

/* 类别表 */
@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'type', comment: '类别名' })
  type: string;

  @Column({ type: 'varchar', name: 'value', comment: '类别值' })
  value: string;
}
