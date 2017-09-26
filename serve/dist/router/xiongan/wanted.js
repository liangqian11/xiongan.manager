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
   * 招聘列表
   */
  '/wanted/list': async (ctx, next) => {
    let limit = ' limit 0,15';
    if (ctx.query.page > 0) {
      limit = ' limit ' + (ctx.query.page - 1) * 15 + ',15';
    }
    let sql = ['select * from wanted order by sort, id desc' + limit];
    let data = await mysql.query(MYSQL.XIONGAN, sql, null);
    sheet[0].data = data[0];
    ctx.body = sheet[0];
  },
  /**
   * 招聘详情
   */
  '/wanted/detail/:id': async (ctx, next) => {
    let data = await mysql.query(MYSQL.XIONGAN, ['select * from wanted where id=?'], [ctx.params.id]);
    sheet[0].data = data[0][0];
    ctx.body = sheet[0];
  },
  /**
   * 招聘岗位列表
   */
  '/wanted/job/list/:wid': async (ctx, next) => {
    let limit = ' limit 0,15';
    if (ctx.query.page > 0) {
      limit = ' limit ' + (ctx.query.page - 1) * 15 + ',15';
    }
    let sql = ['select * from wanted_job where wid=? order by sort,id desc' + limit];
    let arg = [ctx.params.wid];
    let data = await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].data = data[0];
    ctx.body = sheet[0];
  },
  /**
   * 招聘岗位详情
   */
  '/wanted/job/detail/:id': async (ctx, next) => {
    let data = await mysql.query(MYSQL.XIONGAN, ['select * from wanted_job where id=?'], [ctx.params.id]);
    sheet[0].data = data[0][0];
    ctx.body = sheet[0];
  }
  //---------------------------------------------------------------------------- POST
};exports.post = {
  /**
   * 添加招聘
   */
  '/wanted/add': async (ctx, next) => {
    let { company, img, type, city, size, welfare, tel, address, content, sort } = ctx.request.body;
    let sql = ['insert into wanted (company, img, type, city, size, welfare, tel, address, content, sort) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'];
    let arg = [company, img, type, city, size, welfare, tel, address, content, sort];
    let data = await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].data = data;
    sheet[0].message = '添加成功!';
    ctx.body = sheet[0];
  },
  /**
   * 添加招聘岗位
   */
  '/wanted/job/add': async (ctx, next) => {
    let { wid, name, pay, count, content, sort } = ctx.request.body;
    let time = _.now().toString().substr(0, 10);
    let sql = ['insert into wanted_job (wid, name, pay, count, content, time, sort) values(?, ?, ?, ?, ?, ?, ?)'];
    let arg = [wid, name, pay, count, content, time, sort];
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '添加成功!';
    ctx.body = sheet[0];
  }
  //---------------------------------------------------------------------------- PUT
};exports.put = {
  /**
   * 行更新招聘
   */
  '/wanted/uprow': async (ctx, next) => {
    if (!_.isArray(ctx.request.body)) {
      ctx.request.body = [ctx.request.body];
    }
    let sql = [];
    let arg = [];
    for (let item of ctx.request.body) {
      let { id, company, type, city, size, tel, address, sort } = item;
      sql.push('update wanted set company=?, type=?, city=?, size=?, tel=?, address=?, sort=? where id=?');
      arg.push([company, type, city, size, tel, address, sort, id]);
    }
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '更新成功';
    ctx.body = sheet[0];
  },
  /**
   * 编辑招聘
   */
  '/wanted/update': async (ctx, next) => {
    let { id, company, img, type, city, size, welfare, tel, address, content, sort } = ctx.request.body;
    let sql = ['update wanted set company=?, img=?, type=?, city=?, size=?, welfare=?, tel=?, address=?, content=?, sort=? where id=?'];
    let arg = [company, img, type, city, size, welfare, tel, address, content, sort, id];
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '更新成功';
    ctx.body = sheet[0];
  },
  /**
   * 行更新招聘岗位
   */
  '/wanted/job/uprow': async (ctx, next) => {
    if (!_.isArray(ctx.request.body)) {
      ctx.request.body = [ctx.request.body];
    }
    let time = _.now().toString().substr(0, 10);
    let sql = [];
    let arg = [];
    for (let item of ctx.request.body) {
      let { id, name, pay, count, sort } = item;
      sql.push('update wanted_job set name=?, pay=?, count=?, sort=?, time=? where id=?');
      arg.push([name, pay, count, sort, time, id]);
    }
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '更新成功';
    ctx.body = sheet[0];
  },
  /**
   * 编辑招聘岗位
   */
  '/wanted/job/update': async (ctx, next) => {
    let { id, name, pay, count, content, sort } = ctx.request.body;
    let time = _.now().toString().substr(0, 10);
    let sql = ['update wanted_job set name=?, pay=?, count=?, content=?, sort=?, time=? where id=?'];
    let arg = [name, pay, count, content, sort, time, id];
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '更新成功';
    ctx.body = sheet[0];
  }
  //---------------------------------------------------------------------------- DELETE
};exports.delete = {
  /**
   * 删除招聘(连带删除招聘岗位)
   */
  '/wanted/remove/:ids': async (ctx, next) => {
    let ids = ctx.params.ids;
    ids = ids.replace(/[|]/g, ',');
    let sql = ['delete from wanted where id in (' + ids + ')', 'delete from wanted_job where wid in (' + ids + ')'];
    let arg = [null, null];
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '删除成功!';
    ctx.body = sheet[0];
  },
  /**
   * 删除招聘岗位
   */
  '/wanted/job/remove/:ids': async (ctx, next) => {
    let ids = ctx.params.ids;
    ids = ids.replace(/[|]/g, ',');
    let sql = ['delete from wanted_job where id in (' + ids + ')'];
    let arg = null;
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '删除成功!';
    ctx.body = sheet[0];
  }
};