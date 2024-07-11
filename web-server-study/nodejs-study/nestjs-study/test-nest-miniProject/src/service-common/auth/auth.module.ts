import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemUser} from 'src/entities/system/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RedisConfigModule } from 'src/libs/redis/redis.config.module';
import { MessageCodeService } from 'src/libs/message/message.code.service';
import { WechatService } from 'src/libs/third-party-login/wechat.service';

@Module({
  imports: [
    RedisConfigModule,

    TypeOrmModule.forFeature([SystemUser]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
        signOptions: { 
          expiresIn: configService.get<string>('jwtExpiresIn')
        }
      })
    })
  ],
  providers: [
    JwtStrategy,
    AuthService,
    MessageCodeService,
    WechatService
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
