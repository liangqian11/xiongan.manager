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
   * 企业报道列表
   */
  '/company/list': async (ctx, next) => {
    let arg = [];
    let where = '';
    let limit = ' limit 0,16';
    if (ctx.query.page > 0) {
      limit = ' limit ' + (ctx.query.page - 1) * 16 + ',16';
    }
    let sql = ['select * from company order by id desc ' + limit];
    let data = await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].data = data[0];
    ctx.body = sheet[0];
  },
  /**
   * 企业报道详情
   */
  '/company/detail/:id': async (ctx, next) => {
    let data = await mysql.query(MYSQL.XIONGAN, ['select * from company where id=?'], [ctx.params.id]);
    sheet[0].data = data[0][0];
    ctx.body = sheet[0];
  }
  //---------------------------------------------------------------------------- POST
};exports.post = {
  /**
   * 添加企业报道
   */
  '/company/add': async (ctx, next) => {
    let { name, author, img_big, img_small, img_recommend, summary, content, isbanner, istop } = ctx.request.body;
    let time = _.now().toString().substr(0, 10);
    let sql = ['insert into company (name, author, time, img_big, img_small, img_recommend, summary, content, isbanner, istop) values(?,?,?,?,?,?,?,?,?,?)'];
    let arg = [name, author, time, img_big, img_small, img_recommend, summary, content, isbanner, istop];
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '添加成功!';
    ctx.body = sheet[0];
  }
  //---------------------------------------------------------------------------- PUT
};exports.put = {
  /**
   * 行更新企业报道
   */
  '/company/uprow': async (ctx, next) => {
    if (!_.isArray(ctx.request.body)) {
      ctx.request.body = [ctx.request.body];
    }
    let sql = [];
    let arg = [];
    for (let item of ctx.request.body) {
      let { id, name, author, isbanner, istop } = item;
      sql.push('update company set name=?, author=?, isbanner=?, istop=? where id=?');
      arg.push([name, author, isbanner, istop, id]);
    }
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '更新成功!';
    ctx.body = sheet[0];
  },
  /**
   * 编辑企业报道
   */
  '/company/update': async (ctx, next) => {
    let { id, name, author, img_big, img_small, img_recommend, summary, content, isbanner, istop } = ctx.request.body;
    let sql = ['update company set name=?, author=?, img_big=?, img_small=?, img_recommend=?, summary=?, content=?, isbanner=?, istop=? where id=?'];
    let arg = [name, author, img_big, img_small, img_recommend, summary, content, isbanner, istop, id];
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '更新成功!';
    ctx.body = sheet[0];
  }
  //---------------------------------------------------------------------------- DELETE
};exports.delete = {
  /**
   * 删除企业报道
   */
  '/company/remove/:ids': async (ctx, next) => {
    let ids = ctx.params.ids;
    ids = ids.replace(/[|]/g, ',');
    let sql = ['delete from company where id in (' + ids + ')'];
    let arg = null;
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '删除成功!';
    ctx.body = sheet[0];
  }
};