import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, EntityManager } from 'typeorm';

import { AutherInfo } from '../entities/auther.info.entity';
import { AutherPhotos } from 'src/entities/auther.photo.entity';

/* 
  使用Repository<>对象执行增删查改的操作
   // 另一种不使用实体关联而是自建数据表自己关联使用QueryBuilder建立一对多关联查询的方式查看nestjs-study/test-nest-miniProject
*/
@Injectable()
export class UserService {
  constructor(
    /* 
      使用InjectRepository装饰器并引入Repository<>对象
      这样就可以使用typeorm的Repository Api相关的操作
      Repository Api：https://typeorm.biunav.com/zh/repository-api.html#repositoryapi 
      autherinfo是主表对应的实体类
      */
    @InjectRepository(AutherInfo)
    private readonly userRepository: Repository<AutherInfo>,
  ) {}
  /* 
    获取所有用户数据列表
  */
  async findAll(): Promise<AutherInfo[]> {
    /*
      第一种方式直接调用Repository Api的相关方法
      联表查询：
      第一个参数：relations: ['autherinfo'] 属性
      (注意：autherinfo字段来源于autherinfo实体类中的autherinfo字段)
    */
    // let list = await this.userRepository.find({ relations: ['autherinfo'] });
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
    // AutherInfo、AutherPhotos 指的是实体类的名称
    let list = await getRepository(AutherInfo)
      .createQueryBuilder('AutherInfo')
      .leftJoinAndSelect('AutherInfo.photos', 'AutherPhotos.autherinfo')
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
  async findOne(query): Promise<AutherInfo> {
    /*
      联表查询：
      第一个参数：传递{id:xx}
      第二个参数：传递{relations: ['photos'] } --->  photos 指的是AutherInfo中的photos
    */
    let list = await this.userRepository.findOne(
      { id: query.id },
      { relations: ['photos'] },
    );
    return list;
  }
  /* 
    新增作者信息
    rUser：用户传递的内容
    manager：实体管理对象，参考官网实体管理器api
    rUser格式 
    {
      "name": "用户2",
      "age": "22",
      "photos": [
        {
          "description":"图片1号",
          "url":"..../xxx1111.jpg"
        },
        {
          "description":"图片2号",
          "url":"..../xxx2222.jpg"
        }
      ]
    }
  */
  async addOne(rUser, manager: EntityManager): Promise<String> {
    // 第一种方式(以new XX()对象，然后将获取到的数据进行保存的)(推荐使用，毕竟typeorm官方示例都是如此)
    // 先保存副表图片数据，后绑定关联，再保存主表作者数据
    let photos = []; // 用于保存已存的图片内容
    for (let i = 0; i < rUser.photos.length; i++) {
      let photo = new AutherPhotos();
      photo.url = rUser.photos[i].url;
      photo.description = rUser.photos[i].description;
      // 保存至数据库
      await manager.save(AutherPhotos, photo);
      // 保存已存在内容
      photos.push(photo);
    }
    console.log('photos', photos);
    let auther = new AutherInfo();
    auther.name = rUser.name;
    auther.age = rUser.age;
    // 绑定关联
    auther.photos = photos;
    // 保存
    await manager.save(AutherInfo, auther);
    return '新增成功!';

    /*   
      // 第二种方式：先保存主表作者数据，然后存好返回的内容，再保存图片数据并且绑定id

      // 新增作者信息
      let auther = new AutherInfo();
      auther.name = rUser.name;
      auther.age = rUser.age;
      const accountInfo: { [propName: string]: any } = await manager.save(AutherInfo,auther);

      // 注：使用rUser.photos.forEach会报一个PromisejectionWarning的警告错误,而用for没问题
      for (let i = 0; i < rUser.photos.length; i++) {
        let photo = new AutherPhotos();
        photo.url = rUser.photos[i].url;
        photo.description = rUser.photos[i].description;
        photo.autherinfo = accountInfo.id;
        await manager.save(AutherPhotos,photo);
      }
      return '新增成功!'; 
    */
  }
  /* 
    修改
    uUser格式
    {
      "id":4,
      "name": "用户2",
      "age": "22",
      "photos": [
        {
          "id":1,
          "description":"图片1号",
          "url":"..../xxx1111.jpg"
        },
        {
          "description":"图片3号",
          "url":"..../xxx333333.jpg"
        }
      ]
    }
  */
  async updateOne(uUser, manager: EntityManager): Promise<String> {
    /*
      修改也可以有新增的那两种方式，这里不做太多的累述
    */

    // 先修改主表作者信息，后修改副表图片信息
    let auther = new AutherInfo();
    auther.id = uUser.id;
    auther.name = uUser.name;
    auther.age = uUser.age;
    const accountInfo: { [propName: string]: any } = await manager.save(
      AutherInfo,
      auther,
    );

    // 判断是否带有图片信息--因为修改时候可能将所有的图片都移除掉了，或者移除了某一张，修改了另一张等
    if (Object.keys(uUser.photos).length != 0) {
      // 查询该作者下当前数据库的图片数据 --- 用于后续对比删除，有的保存，没的删除掉，不留垃圾数据
      const photolist = await manager.find(AutherPhotos, {
        autherinfo: accountInfo.id,
      });
      // 循环传递过来的图片数据
      for (let i = 0; i < uUser.photos.length; i++) {
        let photo = new AutherPhotos();
        photo.url = uUser.photos[i].url;
        photo.description = uUser.photos[i].description;
        photo.autherinfo = accountInfo.id;
        // 如果有id则是修改操作
        if (!!uUser.photos[i].id) {
          photo.id = uUser.photos[i].id;
          await manager.save(AutherPhotos, photo);
        } else {
          // 否则是新增图片操作
          await manager.save(AutherPhotos, photo);
        }
      }
      // 对比该作者下的所有图片数据删除不需要的数据
      for (let i = 0; i < photolist.length; i++) {
        let photoitem = uUser.photos.find((item) => {
          return item.id == photolist[i].id;
        });
        console.log('photoitem', photoitem);
        if (!photoitem) {
          // 找不到，则删除该数据
          await manager.delete(AutherPhotos, {
            id: photolist[i].id,
          });
        }
      }
    }
    return '修改成功!';
  }
  /* 
    删除
  */
  async delOne(query, manager): Promise<String> {
    // 先删除带外键的副表的数据
    await manager.delete(AutherPhotos, { autherinfo: query.id });
    // 然后在删除主表的数据
    await manager.delete(AutherInfo, { id: query.id });
    return '删除成功!';
  }
}
