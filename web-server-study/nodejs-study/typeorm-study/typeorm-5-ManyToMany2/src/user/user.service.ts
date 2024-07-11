import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';

import { Question } from './../entities/question.entity';
import { Category } from './../entities/category.entity';
import { QuestionCategory } from './../entities/question_category.entity';

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
    // 构建QueryBuilder查询
    /* 
      1.Question、Category,QuestionCategory 指的是实体类的名称
      2.innerJoin()是对关联表进行关联，quescate，question，category都是别名 
      ------ 三个参数含义分别是：实体对象，别名，关联关系
      3.innerJoinAndMapMany()中的question.list是为了给question增加一个list字段用于保存Category的所有内容
      ------ 四个参数含义分别是：展示列表名,实体对象，别名，关联关系
    */
    let list = await getRepository(Question)
      .createQueryBuilder('question')
      .innerJoin(
        QuestionCategory,
        'quescate',
        'question.id = quescate.questionId',
      )
      .innerJoinAndMapMany(
        'question.list',
        Category,
        'category',
        'category.id = quescate.categoryId',
      )
      .getMany();
    return list;
    /*
      另一种使用getManager().query("sql语句")执行原生sql操作即可。
      补充：联表查询建议使用QueryBuilder自由构建出所需要的查询内容
    */
  }
  /* 
    获取单个用户详情
  */
  async findOne(query): Promise<Question> {
    let list = await getRepository(Question)
      .createQueryBuilder('question')
      .innerJoin(
        QuestionCategory,
        'quescate',
        'question.id = quescate.questionId',
      )
      .innerJoinAndMapMany(
        'question.list',
        Category,
        'category',
        'category.id = quescate.categoryId',
      )
      .where('question.id = :id', { id: query.id })
      .getOne();
    return list;
  }
  /* 
    新增用户
    rUser格式：注意先给category表随便加三条数据
    {
      "title": "问题1",
      "description": "这是1号问题的描述",
      "list": [1,3]
    }
  */
  async addOne(rUser, manager): Promise<String> {
    // 先保存问题的数据
    let question = new Question();
    question.title = rUser.title;
    question.description = rUser.description;
    const que = await manager.save(Question, question);
    if (Object.keys(rUser.list).length != 0) {
      // 后保存关联表的数据
      for (let i = 0; i < rUser.list.length; i++) {
        let qescat = new QuestionCategory();
        qescat.categoryId = rUser.list[i];
        qescat.questionId = que.id;
        await manager.save(QuestionCategory, qescat);
      }
      return '新增成功!';
    }
  }
  /* 
    修改用户:有数据id则修改否则新增，然后对比数据库数据进行多余的删除
    uUser格式
    {
      "id": 1,
      "title": "问题1.111",
      "description": "问题1.111的描述",
      "list": [1,2]
    }
  */
  async updateOne(uUser, manager): Promise<String> {
    // 先修改问题表的数据
    let question = new Question();
    question.id = uUser.id;
    question.title = uUser.title;
    question.description = uUser.description;
    await manager.update(Question, { id: question.id }, question);
    // 在根据问题的id删除关联表中对应的数据
    await manager.delete(QuestionCategory, { questionId: uUser.id });
    // 之后在将新的关联数据添加进关联表
    for (let i = 0; i < uUser.list.length; i++) {
      let qescat = new QuestionCategory();
      qescat.categoryId = uUser.list[i];
      qescat.questionId = uUser.id;
      await manager.save(QuestionCategory, qescat);
    }
    return '修改成功!';
  }
  /* 
    删除用户
  */
  async delOne(query, manager): Promise<String> {
    // 先删除关联表内容
    await manager.delete(QuestionCategory, { questionId: query.id });
    // 然后在删除主表内容
    await manager.delete(Question, { id: query.id });
    return '删除成功!';
  }
}
