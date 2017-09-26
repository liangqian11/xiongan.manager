//---------------------------------------------------------------------------- Package
const _ = require('lodash');
//---------------------------------------------------------------------------- Config
const { MYSQL } = require('../../config');
//---------------------------------------------------------------------------- Plugin
const mysql = require('../../plugin/util/mysql');
const sheet = require('../../plugin/util/sheet');
//---------------------------------------------------------------------------- GET
exports.get = {
  /**
   * 文化列表
   */
  '/culture/list': async (ctx, next) => {
    let limit = ' limit 0,15';
    if (ctx.query.page > 0) {
      limit = ' limit ' + (ctx.query.page - 1) * 15 + ',15';
    }
    let sql = ['select * from culture order by sort,id desc' + limit];
    let data = await mysql.query(MYSQL.XIONGAN, sql, null);
    sheet[0].data = data[0];
    ctx.body = sheet[0];
  },
  /**
   * 文化详情
   */
  '/culture/detail/:id': async (ctx, next) => {
    let data = await mysql.query(MYSQL.XIONGAN, ['select * from culture where id=?'], [ctx.params.id]);
    sheet[0].data = data[0][0];
    ctx.body = sheet[0];
  },
  /**
   * 文化图片列表
   */
  '/culture/img/list/:cid': async (ctx, next) => {
    let limit = ' limit 0,15';
    if (ctx.query.page > 0) {
      limit = ' limit ' + (ctx.query.page - 1) * 15 + ',15';
    }
    let sql = ['select * from culture_img where cid=? order by sort, id desc'];
    let arg = [ctx.params.cid];
    let data = await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].data = data[0];
    ctx.body = sheet[0];
  },
  /**
   * 文化图片详情
   */
  '/culture/img/detail/:id': async (ctx, next) => {
    let data = await mysql.query(MYSQL.XIONGAN, ['select * from culture_img where id=?'], [ctx.params.id]);
    sheet[0].data = data[0][0];
    ctx.body = sheet[0];
  }
  //---------------------------------------------------------------------------- POST
};exports.post = {
  /**
   * 添加文化
   */
  '/culture/add': async (ctx, next) => {
    let { name, name_english, img, sort } = ctx.request.body;
    let sql = ['insert into culture (name, name_english, img, sort) values(?, ?, ?, ?)'];
    let arg = [name, name_english, img, sort];
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '添加成功!';
    ctx.body = sheet[0];
  },
  /**
   * 添加文化图片
   */
  '/culture/img/add': async (ctx, next) => {
    let { cid, img, content, sort } = ctx.request.body;
    let sql = ['insert into culture_img (cid, img, content, sort) values(?, ?, ?, ?)'];
    let arg = [cid, img, content, sort];
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '添加成功!';
    ctx.body = sheet[0];
  }
  //---------------------------------------------------------------------------- PUT
};exports.put = {
  /**
   * 行更新文化
   */
  '/culture/uprow': async (ctx, next) => {
    if (!_.isArray(ctx.request.body)) {
      ctx.request.body = [ctx.request.body];
    }
    let sql = [];
    let arg = [];
    for (let item of ctx.request.body) {
      let { id, name, name_english, sort } = item;
      sql.push('update culture set name=?, name_english=?, sort=? where id=?');
      arg.push([name, name_english, sort, id]);
    }
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '更新成功';
    ctx.body = sheet[0];
  },
  /**
   * 编辑文化
   */
  '/culture/update': async (ctx, next) => {
    let { id, name, name_english, img, sort } = ctx.request.body;
    let sql = ['update culture set name=?, name_english=?, img=?, sort=? where id=?'];
    let arg = [name, name_english, img, sort, id];
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '更新成功';
    ctx.body = sheet[0];
  },
  /**
   * 行更新文化图片
   */
  '/culture/img/uprow': async (ctx, next) => {
    if (!_.isArray(ctx.request.body)) {
      ctx.request.body = [ctx.request.body];
    }
    let sql = [];
    let arg = [];
    for (let item of ctx.request.body) {
      let { id, sort } = item;
      sql.push('update culture_img set sort=? where id=?');
      arg.push([sort, id]);
    }
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '更新成功';
    ctx.body = sheet[0];
  },
  /**
   * 编辑文化图片
   */
  '/culture/img/update': async (ctx, next) => {
    let { id, img, content, sort } = ctx.request.body;
    let sql = ['update culture_img set content=?, img=?, sort=? where id=?'];
    let arg = [content, img, sort, id];
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '更新成功';
    ctx.body = sheet[0];
  }
  //---------------------------------------------------------------------------- DELETE
};exports.delete = {
  /**
   * 删除文化(连带删除文化图片)
   */
  '/culture/remove/:ids': async (ctx, next) => {
    let ids = ctx.params.ids;
    ids = ids.replace(/[|]/g, ',');
    let sql = ['delete from culture where id in (' + ids + ')', 'delete from culture_img where cid in (' + ids + ')'];
    let arg = [null, null];
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '删除成功!';
    ctx.body = sheet[0];
  },
  /**
   * 删除文化图片
   */
  '/culture/img/remove/:ids': async (ctx, next) => {
    let ids = ctx.params.ids;
    ids = ids.replace(/[|]/g, ',');
    let sql = ['delete from culture_img where id in (' + ids + ')'];
    let arg = null;
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '删除成功!';
    ctx.body = sheet[0];
  }
};