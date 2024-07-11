import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

/* 单表 */
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'name',default:'' })
  name: string;

  @Column({ type: 'varchar', name: 'age',default:'' })
  age: string;

  @Column({ type: 'varchar', name: 'account',default:'' })
  account: string;

  @Column({ type: 'varchar', name: 'password',default:'' })
  password: string;
}
