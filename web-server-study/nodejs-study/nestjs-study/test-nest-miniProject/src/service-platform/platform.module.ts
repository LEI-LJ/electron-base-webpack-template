import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
// 加载子模块
import {platformModules} from './index'
// 角色守卫
import { RolesGuard } from '../shared/guard/roles.guard';

@Module({
  imports:[
    ...platformModules
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],

  exports: [
    ...platformModules
  ]

})

export class PlatformModule {}