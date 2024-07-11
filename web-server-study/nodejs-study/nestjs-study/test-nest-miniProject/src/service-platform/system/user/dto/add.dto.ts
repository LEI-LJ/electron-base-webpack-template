import { SystemUser } from 'src/entities/system/user.entity';
export class UserAddDTO extends SystemUser {
  [roles: string]: any
}