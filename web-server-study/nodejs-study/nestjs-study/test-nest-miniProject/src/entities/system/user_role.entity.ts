import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class SystemUserRole {

  @Column({ name: 'user_id' })
  @PrimaryColumn()
  userId: number;

  @Column({ name: 'role_id' })
  @PrimaryColumn()
  roleId: number;

}