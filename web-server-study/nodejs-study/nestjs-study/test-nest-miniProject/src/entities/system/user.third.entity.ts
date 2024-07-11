import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base/base.entity";


@Entity()
export class SystemUserThird extends BaseEntity{

  @ApiProperty({
    description: '手机号',
    required: false
  })
  @Column({type:'varchar', length: 11, name: 'phone'})
  phone: string;

  @ApiProperty({
    description: '微信昵称',
    required: false
  })
  @Column({type:'varchar', length: 50, name: 'nick_name'})
  nickname: string;

  @ApiProperty({
    description: '微信头像',
    required: false
  })
  @Column({type:'varchar', name: 'avatar'})
  avatar: string;

  @ApiProperty({
    description: '微信openid',
    required: false
  })
  @Column({type:'varchar', name: 'wx_openid',nullable: true})
  wxopenid: string;

  @ApiProperty({
    description: '微信unionid',
    required: false
  })
  @Column({type:'varchar', name: 'wx_unionid'})
  wxunionid: string;

}