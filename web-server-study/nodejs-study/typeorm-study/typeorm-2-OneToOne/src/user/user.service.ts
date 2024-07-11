import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, EntityManager } from 'typeorm';

import { UserInfo } from 'src/entities/user.info.entity';
import { UserAccount } from '../entities/user.account.entity';

/* 
  使用Repository<>对象执行增删查改的操作
   // 另一种不使用实体关联而是自建数据表自己关联使用QueryBuilder建立一对一关联查询的方式查看nestjs-study/test-nest-miniProject
*/
@Injectable()
export class UserService {
  constructor(
    /* 
      使用InjectRepository装饰器并引入Repository<>对象
      这样就可以使用typeorm的Repository Api相关的操作
      Repository Api：https://typeorm.biunav.com/zh/repository-api.html#repositoryapi 
      UserAccount是主表对应的实体类
      */
    @InjectRepository(UserAccount)
    private readonly userRepository: Repository<UserAccount>,
  ) {}
  /* 
    获取所有用户数据列表
  */
  async findAll(): Promise<UserAccount[]> {
    /*
      第一种方式直接调用Repository Api的相关方法
      联表查询：
      第一个参数：relations: ['userinfo'] 属性
      (注意：userinfo字段来源于UserAccount实体类中的userinfo字段)
    */

    // let list = await this.userRepository.find({ relations: ['userinfo'] });

    /*
      第二种方式构建QueryBuilder查询
      // 这里讲个个人理解：getConnection()、getManager()、getRepository()三者的区别
      // getConnection().manager === getManager()
      // getConnection().getRepository() === getRepository()
      // getManager().getRepository() === getRepository()
      // getConnection()获取连接，其实就是将数据库连接所有的内容都拿到了
      // getManager()获取实体存储库集合，这样就可以管理任何实体，并且随意使用任何实体
      // getRepository()获取具体实体，然后可以对具体实体操作
      // 开发中三者使用方式：三个都能使用.createQueryBuilder()方法构建内容，但是构建的结构有所区别
      // 例如：
      /* 获取user表所有数据getConnection()方式
        getConnection()
        .createQueryBuilder()
        .select('user')
        .from(User, 'user')
        .getMany();
      */
    /* 获取user表所有数据getManager()方式
        getManager()
        .createQueryBuilder(User,'user')
        .getMany();
      */
    /* 获取user表所有数据getRepository()方式
        getRepository(User)
        .createQueryBuilder('user')
        .getMany();
      */

    let list = await getRepository(UserAccount)
      .createQueryBuilder('UserAccount')
      .leftJoinAndSelect('UserAccount.userinfo', 'UserInfo.id')
      .getMany();

    /*
      第三种方式直接使用getManager().query("sql语句")执行原生sql操作即可。
      补充：
      1.三种方式中以第一种和第二种方式使用最多，
        争取能用第一种就用第一种，否则可选择第二种，实在不行则使用第三种。
      2.相关方法的参数请参考官网
    */
    return list;
  }
  /* 
    获取单个用户详情
  */
  async findOne(query): Promise<UserAccount> {
    /*
      联表查询：
      第一个参数：传递{id:xx}
      第二个参数：传递{relations: ['userinfo'] }
    */
    let list = await this.userRepository.findOne(
      { id: query.id },
      { relations: ['userinfo'] },
    );
    return list;
  }
  /* 
    新增用户
    rUser：用户传递的内容
    manager：实体管理对象，参考官网实体管理器api
    rUser格式
    {
      "account": "admin1",
      "password": "000000",
      "userinfo": {
          "name": "zhang1",
          "age": 12,
          "phone": "15622222211"
      }
    }
  */
  async addOne(rUser, manager: EntityManager): Promise<String> {
    // 第一种方式：常规新增方式(typeorm的示例)---先增副表，绑定关联后再增主表
    // 副表新增
    let muser = new UserInfo();
    muser.name = rUser.userinfo.name;
    muser.age = rUser.userinfo.age;
    muser.phone = rUser.userinfo.phone;
    await manager.save(UserInfo, muser);
    // 主表新增
    let mAccount = new UserAccount();
    mAccount.account = rUser.account;
    mAccount.password = rUser.password;
    // 绑定关联
    mAccount.userinfo = muser;
    // 保存。注意：只能是save方法，如果用inset将导致副表无外键(即关联无用)
    await manager.save(UserAccount, mAccount);

    /*
      // 另一种方式，先增主表，然后得到主表信息后，再增副表
      let mAccount = new UserAccount();
      mAccount.account = rUser.account;
      mAccount.password = rUser.password;
      // 新增主表信息，并保存
        // 注意：
        // save方法保存后返回的是一个对象{ id: 12, account: 'awqe9527', password: '123654' }
        // 而insert方法保存后则返回的是一个
        // {
        //   identifiers: [ { id: 12 } ],
        //   generatedMaps: [ { id: 12, account: 'awqe9527', password: '123654' } ],
        //   raw: OkPacket {
        //     fieldCount: 0,
        //     affectedRows: 1,
        //     insertId: 12,
        //     serverStatus: 3,
        //     warningCount: 0,
        //     message: '',
        //     protocol41: true,
        //     changedRows: 0
        //   }
        // }
      const accountInfo: { [propName: string]: any } = await manager.save(
        UserAccount,
        mAccount,
      );
      console.log('accountInfo', accountInfo);
      // 副表新增
      let muser = new UserInfo();
      muser.name = rUser.userinfo.name;
      muser.age = rUser.userinfo.age;
      muser.phone = rUser.userinfo.phone;
      // 设置外键id内容
      muser.account = accountInfo.id;
      await manager.insert(UserInfo, muser);
    */
    return '新增成功!';
  }
  /* 
    修改用户
    uUser：用户传递的内容
    manager：实体管理对象，参考官网实体管理器api
    uUser格式
    {
      "id": "14",
      "account": "admin21112222",
      "password": "00000022",
      "userinfo": {
          "id":'10',
          "name": "zhang111222",
          "age": 12,
          "phone": "156222222"
      }
    }
  */
  async updateOne(uUser, manager: EntityManager): Promise<String> {
    // 修改则无顺序要求，只需要拿到对应的id，然后到对应的表中修改数据即可，
    let muser = new UserInfo();
    muser.name = uUser.userinfo.name;
    muser.age = uUser.userinfo.age;
    muser.phone = uUser.userinfo.phone;
    await manager.update(UserInfo, uUser.userinfo.id, muser);

    let mAccount = new UserAccount();
    mAccount.account = uUser.account;
    mAccount.password = uUser.password;
    await manager.update(UserAccount, uUser.id, mAccount);

    return '修改成功!';
  }
  /* 
    删除用户
  */
  async delOne(query, manager): Promise<String> {
    /* 
      1.为什么这里传入的是account而不是accountId：注意前面注入的是实体类UserInfo，因此传入实体类中对应的account即可
      2.删除必须先删副表，再删主表
      3.使用remove方法可以做到一个方法连带删除
    */
    manager.delete(UserInfo, { account: query.id });
    manager.delete(UserAccount, query.id); // 这里的第二个参数等同于{ id: query.id }
    return '删除成功!';
  }
}
