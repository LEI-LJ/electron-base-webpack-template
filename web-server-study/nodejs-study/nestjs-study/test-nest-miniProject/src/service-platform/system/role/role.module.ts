import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemRole } from 'src/entities/system/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemRole])],
  providers: [RoleService],
  controllers: [RoleController]
})
export class RoleModule {}
