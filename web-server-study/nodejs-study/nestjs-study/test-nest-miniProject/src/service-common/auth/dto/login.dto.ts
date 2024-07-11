import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ description: '手机号', required: true })
  phone: string;
  @ApiProperty({ description: '密码(根据类型决定是否传值)', required: false })
  password: string;
  @ApiProperty({ description: '验证码(根据类型决定是否传值)', required: false })
  code: string;
  @ApiProperty({ description: '类型(code:验证码/password:密码)', required: true })
  type: string;
}

export class WechatLoginDto {
  @ApiProperty({ description: '微信登录code(wx.login获取)', required: true })
  loginCode: string;
  @ApiProperty({ description: '微信手机号code(不传则使用普通微信授权)', required: true })
  phoneCode: string;
  @ApiProperty({ description: '微信用户信息的加密数据', required: false })
  encryptedData: string;
  @ApiProperty({ description: '微信加密算法的初始向量', required: false })
  iv: string;
}