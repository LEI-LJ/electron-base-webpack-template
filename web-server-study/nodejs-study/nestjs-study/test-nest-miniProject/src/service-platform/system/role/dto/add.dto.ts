import { ApiProperty } from '@nestjs/swagger'
import { SystemRole } from 'src/entities/system/role.entity';
export class RoleAddDTO extends SystemRole {
  [menus: string]: any
}