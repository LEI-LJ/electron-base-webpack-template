import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtSecret'),
    } as StrategyOptions);
  }

  /**
   * 校验荷载信息，可自由操作如:配合redis拉黑某个id的用户禁止登录等
   * 每个Controller中的get,post...等请求方法中都包含user字段为荷载信息,使用(@JwtUser() user)即可获得jwt荷载信息
   * @param payload 荷载信息如： {id:"xx",role:'xx',...}
   * @returns 
   */
  async validate(payload: any) {
    return { ...payload };
  }
}