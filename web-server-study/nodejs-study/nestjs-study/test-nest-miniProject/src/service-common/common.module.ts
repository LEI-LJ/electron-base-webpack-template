import { Module } from "@nestjs/common";

// 加载子模块
import {commonModules} from './index'

@Module({
  imports:[
    ...commonModules
  ],
  providers: [
  ],

  exports: [
    ...commonModules
  ]

})

export class CommonModule {}