import { MenuModule } from './system/menu/menu.module';
import { RoleModule } from './system/role/role.module';
import { UserModule } from './system/user/user.module';

export const platformModules = [
  UserModule,
  MenuModule,
  RoleModule
]