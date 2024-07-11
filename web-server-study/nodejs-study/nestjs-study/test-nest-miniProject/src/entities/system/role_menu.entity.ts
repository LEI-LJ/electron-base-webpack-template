import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class SystemRoleMenu {

  @Column({ name: 'role_id' })
  @PrimaryColumn()
  roleId: number;

  @Column({ name: 'menu_id' })
  @PrimaryColumn()
  menuId: number;

}