import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  @ApiProperty({
    description: 'id',
    required: false
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'create_by',
    type: 'varchar',
    nullable: true
  })
  createBy: string;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'NOW()'
  })
  updateTime: Date;

  @Column({
    name: 'update_by',
    type: 'varchar',
    nullable: true
  })
  updateBy: string;

}
