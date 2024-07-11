import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
// typeOrm模块
import { TypeOrmModule } from '@nestjs/typeorm';
// Jwt守卫
import { JwtAuthGuard } from 'src/shared/guard/jwt.guard';
// 配置模块
import config from 'src/config/env.index';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
// 实体类加载
import { entities } from './entities/index';
// redis模块
import { RedisConfigModule } from 'src/libs/redis/redis.config.module';

// 子模块加载
import { PlatformModule } from './service-platform/platform.module';
import { CommonModule } from './service-common/common.module';
import { MobileModule } from './service-mobile/mobile.module';

@Module({
  imports: [
    // redis配置模块
    RedisConfigModule,
    // 环境变量配置模块
    ConfigModule.forRoot({
      isGlobal: true, // 作用于全局
      load: [config], // 加载自定义配置项
    }),
    // 数据库配置
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // 数据库类型
        host: configService.get('db.host'),
        port: configService.get('db.port'),
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        synchronize: true, // 生产环境要关闭
        entities: [...entities], // 扫描本项目中.entity.ts或者.entity.js的文件
        timezone: '+08:00', // 东八区
      }),
    }),
    // 子模块加载
    PlatformModule,
    CommonModule,
    MobileModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
