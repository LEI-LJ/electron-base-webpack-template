import { SystemMenu } from './system/menu.entity';
import { SystemRole } from './system/role.entity';
import { SystemRoleMenu } from './system/role_menu.entity';
import { SystemUser} from './system/user.entity';
import { SystemUserThird } from './system/user.third.entity';
import { SystemUserRole } from './system/user_role.entity';

export const entities = [
  SystemUser,
  SystemUserThird,
  SystemRole,
  SystemRoleMenu,
  SystemMenu,
  SystemUserRole
]