import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';

import { Question } from './../entities/question.entity';
import { Category } from './../entities/category.entity';

/* 
  使用Repository<>对象执行增删查改的操作
  // 另一种不使用实体关联而是自建数据表自己关联使用QueryBuilder建立多对多关联查询的方式查看nestjs-study/test-nest-miniProject
*/
@Injectable()
export class UserService {
  constructor() {}
  /* 
    获取所有用户数据列表
  */
  async findAll(): Promise<Question[]> {
    /*
    构建QueryBuilder查询
    */
    let list = await getRepository(Question)
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.categories', 'category')
      .getMany();
    return list;
  }
  /* 
    获取单个用户详情
  */
  async findOne(query): Promise<Question> {
    let list = await getRepository(Question)
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.categories', 'category')
      .where('question.id = :id', { id: query.id })
      .getOne();
    return list;
  }
  /* 
    新增用户
    rUser格式
    {
      "title": "问题5",
      "categorylist": [
          1,
          3
      ]
    }
  */
  async addOne(rUser, manager): Promise<String> {
    let lists = []; // 用于保存拥有的categories
    // 目的用于获取关联信息相关的内容
    if (Object.keys(rUser.categorylist).length != 0) {
      for (let i = 0; i < rUser.categorylist.length; i++) {
        let listOne = await manager.findOne(Category, {
          id: rUser.categorylist[i],
        });
        lists.push(listOne);
      }
    }
    const question = new Question();
    question.title = rUser.title;
    // 此处为关联表内容新增的关键
    question.categories = lists;
    await manager.save(Question, question);
    return '新增成功!';
  }
  /* 
    修改用户
    uUser格式
    {
      "id":3,
      "title": "问题555",
      "categorylist": [
          1,
          2
      ]
    }
  */
  async updateOne(uUser, manager): Promise<String> {
    let lists = []; // 用于保存拥有的categories
    // 目的用于获取关联信息相关的内容
    if (Object.keys(uUser.categorylist).length != 0) {
      for (let i = 0; i < uUser.categorylist.length; i++) {
        let listOne = await manager.findOne(Category, {
          id: uUser.categorylist[i],
        });
        lists.push(listOne);
      }
    }
    const question = new Question();
    // 此处给了id并且categories赋了新内容，这样就会自动更新关联表中的数据(删除旧的新增新的)
    question.id = uUser.id;
    question.title = uUser.title;
    // 此处为关联表内容新增的关键
    question.categories = lists;
    await manager.save(Question, question);
    return '修改成功!';
  }
  /* 
    删除用户
  */
  async delOne(query, manager): Promise<String> {
    // 删除时候关联信息会自动删除
    await manager.delete(Question, { id: query.id });
    return '删除成功!';
  }
}
