import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from 'axios';
import { RedisConfigService } from "../redis/redis.config.service";

@Injectable()
export class WechatService{
  constructor(
    private config: ConfigService,
    private redis: RedisConfigService,
  ){}

  /**
   * 通过code获取微信登录凭证校验获取openid和session_key
   * @param code 
   * @returns {
   *    data:{
   *      session_key:'',
   *      unionid:'',
   *      openid:'',
   *    }
   * }
   */
  async getJscode2session(code){
    return await axios({
      method: 'get',
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      params: {
        appid: this.config.get('wxAPPID'),
        secret: this.config.get('wxAPPSecret'),
        js_code: code,
        grant_type: 'authorization_code'
      }
    })
  }

  /**
   * 根据code获取手机号
   * @param token 微信后端接口调用凭证
   * @param code 手机号code
   * @returns {
   *    data:{
          "errcode":0,
          "errmsg":"ok",
          "phone_info": {
              "phoneNumber":"xxxxxx", // 手机号
              "purePhoneNumber": "xxxxxx",
              "countryCode": 86,
              "watermark": {
                  "timestamp": 1637744274,
                  "appid": "xxxx"
              }
          }
        } 
   * }
   */
  async getWechatPhoneNumber(token,code){
    return await axios({
      method: 'post',
      url: 'https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=' + token,
      data: {
        code: code
      }
    })
  }


  /**
   * 获取微信的后端接口调用凭证
   * @returns {
   *    data:{
   *      access_token:''
   *    }
   * }
   */
  async getWechatAccessToken(){
    let localToken = await this.redis.getRedis('wechatAccessToken')
    if(!localToken){
      let info = await axios({
        method: 'get',
        url: 'https://api.weixin.qq.com/cgi-bin/token',
        params: {
          appid: this.config.get('wxAPPID'),
          secret: this.config.get('wxAPPSecret'),
          grant_type: 'client_credential'
        }
      })
      this.redis.setRedis('wechatAccessToken', JSON.stringify(info.data),7000)
      return info.data
    }
    return JSON.parse(localToken)
  }

}