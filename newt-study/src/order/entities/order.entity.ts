import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "text", name: "name" })
  name: string;

}
