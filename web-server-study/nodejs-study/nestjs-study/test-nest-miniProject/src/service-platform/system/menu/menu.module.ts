import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { SystemMenu } from 'src/entities/system/menu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SystemMenu])],
  providers: [MenuService],
  controllers: [MenuController]
})
export class MenuModule {}
