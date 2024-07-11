import {
  Body,
  Controller,
  Get,
  Post,
  Query
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, WechatLoginDto } from './dto/login.dto';
import { Public } from 'src/shared/decorators/public.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PasswordDto } from './dto/password.dto';
import { MessageDto } from './dto/message.dto';
import { JwtUser } from 'src/shared/decorators/user.decorator';

@ApiTags('登录授权管理')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOperation({
    summary: '登录'
  })
  @Post('login')
  signIn(@Body() signInDto: LoginDto) {
    if(signInDto.type === 'code'){ // 验证码登录
      return this.authService.codeLogin(signInDto.phone, signInDto.code);
    }else{ // 密码登录
      return this.authService.signIn(signInDto.phone, signInDto.password);
    }
  }

  /**
   * 注册初始账号
   * @param user 
   * @returns
   */
  @ApiOperation({
    summary: '注册初始账号'
  })
  @Public()
  @ApiQuery({ name: 'phone', description: '初始手机号', required: true })
  @Get('register')
  register(@Query() que){
    return this.authService.initData(que.phone)
  }
  
  /**
   * 找回/修改密码
   * @param user 
   * @returns 
   */
  @ApiOperation({
    summary: '找回/修改密码'
  })
  @ApiBody({ type: PasswordDto })
  @Post('updatePassword')
  updatePassword(@Body() body: PasswordDto,@JwtUser('id') id){
    return this.authService.updatePassword(body,id)
  }

  /**
   * 发送手机短信
   */
  @ApiOperation({
    summary: '发送手机短信验证码'
  })
  @ApiQuery({ 
    name: 'phone', 
    description: '手机号', 
    required: true,
    type: MessageDto
  })
  @Public()
  @Get('code')
  getCode(@Query() que){
    return this.authService.messageCode(que)
  }

  /**
   * 微信小程序登录
   * @param body 
   * @returns 
   */
  @Public()
  @ApiOperation({
    summary: '微信小程序登录'
  })
  @ApiBody({ type: WechatLoginDto })
  @Post('wechatLogin')
  signInWechatPhone(@Body() body){
    if(!body.phoneCode){ // 不绑定手机号
      return this.authService.loginWechat(body)
    }else{ // 绑定手机号
      return this.authService.loginWechatPhone(body)
    }
  }
}
