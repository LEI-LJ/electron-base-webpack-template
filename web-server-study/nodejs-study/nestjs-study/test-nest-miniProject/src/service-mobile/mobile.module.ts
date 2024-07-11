import { Module } from "@nestjs/common";

// 加载子模块
import {mobileModules} from './index'

@Module({
  imports:[
    ...mobileModules
  ],
  providers: [
  ],

  exports: [
    ...mobileModules
  ]

})

export class MobileModule {}