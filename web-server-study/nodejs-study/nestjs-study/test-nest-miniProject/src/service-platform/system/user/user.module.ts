import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemUser} from '../../../entities/system/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemUser])],
  controllers: [UserController],
  providers: [UserService],
  exports:[]
})
export class UserModule {}
