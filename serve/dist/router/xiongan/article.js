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
   * 服务列表
   */
  '/article/list': async (ctx, next) => {
    let where = '';
    let limit = ' limit 0,15';
    if (ctx.query.page > 0) {
      limit = ' limit ' + (ctx.query.page - 1) * 15 + ',15';
    }
    if (ctx.query.name) {
      where = where + ' and A.name like "%' + ctx.query.name + '%"';
    }
    if (ctx.query.cid > 0) {
      where = 'and A.cid = ' + ctx.query.cid;
    }
    let sql = ['select A.*,B.name as cname from article A, article_cat B where A.cid = B.id ' + where + ' order by sort, id desc' + limit];
    let data = await mysql.query(MYSQL.XIONGAN, sql, null);
    sheet[0].data = data[0];
    ctx.body = sheet[0];
  },
  /**
  * 服务类别列表
  */
  '/article/category': async (ctx, next) => {
    let sql = ['select * from article_cat order by sort, id desc'];
    let data = await mysql.query(MYSQL.XIONGAN, sql, null);
    sheet[0].data = data[0];
    ctx.body = sheet[0];
  },
  /**
   * 轮播图列表
   */
  '/swiper/list': async (ctx, next) => {
    let sql = ['select * from swiper order by sort, id desc'];
    let data = await mysql.query(MYSQL.XIONGAN, sql, null);
    sheet[0].data = data[0];
    ctx.body = sheet[0];
  },

  /**
   * 服务详情
   */
  '/article/detail/:id': async (ctx, next) => {
    let data = await mysql.query(MYSQL.XIONGAN, ['select * from article where id=?'], [ctx.params.id]);
    sheet[0].data = data[0][0];
    ctx.body = sheet[0];
  },
  /**
  * 服务详情
  */
  '/cat/detail/:id': async (ctx, next) => {
    let data = await mysql.query(MYSQL.XIONGAN, ['select * from article_cat where id=?'], [ctx.params.id]);
    sheet[0].data = data[0][0];
    ctx.body = sheet[0];
  }
  //---------------------------------------------------------------------------- POST
};exports.post = {
  /**
   * 添加服务
   */
  '/article/add': async (ctx, next) => {
    let { cid, title, name, img, content, img_small, sort } = ctx.request.body;
    let sql = ['insert into article (cid,title,name, content, sort,img,img_small) values(?,?,?,?,?,?,?)'];
    let arg = [cid, title, name, content, sort, img, img_small];
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '添加成功';
    ctx.body = sheet[0];
  },
  /**
   * 添加轮播图
   */
  '/swiper/add': async (ctx, next) => {
    let { img, sort } = ctx.request.body;
    let sql = ['insert into swiper ( sort,img) values(?,?)'];
    let arg = [sort, img];
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '添加成功';
    ctx.body = sheet[0];
  },
  /**
   * 添加服务类别
   */
  '/cat/add': async (ctx, next) => {
    let { name, sort } = ctx.request.body;
    let sql = ['insert into article_cat (name, sort) values(?,?)'];
    let arg = [name, sort];
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '添加成功';
    ctx.body = sheet[0];
  }
  //---------------------------------------------------------------------------- PUT
};exports.put = {
  /**
   * 行更新服务
   */
  '/article/uprow': async (ctx, next) => {
    if (!_.isArray(ctx.request.body)) {
      ctx.request.body = [ctx.request.body];
    }
    let sql = [];
    let arg = [];
    for (let item of ctx.request.body) {
      let { id, title, name, sort } = item;
      sql.push('update article set name=?,title=?, sort=? where id=?');
      arg.push([name, title, sort, id]);
    }
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '更新成功';
    ctx.body = sheet[0];
  },
  /**
  * 行更新服务类别
  */
  '/cat/uprow': async (ctx, next) => {
    if (!_.isArray(ctx.request.body)) {
      ctx.request.body = [ctx.request.body];
    }
    let sql = [];
    let arg = [];
    for (let item of ctx.request.body) {
      let { id, name, sort } = item;
      sql.push('update article_cat set name=?,sort=? where id=?');
      arg.push([name, sort, id]);
    }
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '更新成功';
    ctx.body = sheet[0];
  },
  /**
   * 编辑服务
   */
  '/article/update': async (ctx, next) => {
    console.log(ctx.request.body);
    let { id, cid, name, img, img_small, title, content, sort } = ctx.request.body;
    let sql = ['update article set cid=?, name=?,title=?, img=?,img_small=?,content=?, sort=? where id=?'];
    let arg = [cid, name, title, img, img_small, content, sort, id];
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '更新成功';
    ctx.body = sheet[0];
  }
  //---------------------------------------------------------------------------- DELETE
};exports.delete = {
  /**
   * 删除服务
   */
  '/article/remove/:ids': async (ctx, next) => {
    let ids = ctx.params.ids;
    ids = ids.replace(/[|]/g, ',');
    let sql = ['delete from article where id in (' + ids + ')'];
    let arg = null;
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '删除成功';
    ctx.body = sheet[0];
  },
  /**
   * 删除服务类别
   */
  '/cat/remove/:ids': async (ctx, next) => {
    let ids = ctx.params.ids;
    ids = ids.replace(/[|]/g, ',');
    let data = await mysql.query(MYSQL.XIONGAN, ['select * from article where cid in (' + ids + ')'], null);
    if (data[0].length > 0) {
      sheet[20001].message = '该类别下存在服务, 不能删除';
      ctx.body = sheet[20001];
      return;
    } else {
      let sql = ['delete from article_cat where id in (' + ids + ')'];
      let arg = null;
      await mysql.query(MYSQL.XIONGAN, sql, arg);
      sheet[0].message = '删除成功';
      ctx.body = sheet[0];
    }
  },
  /**
   * 删除服务
   */
  '/swiper/remove/:ids': async (ctx, next) => {
    let ids = ctx.params.ids;
    ids = ids.replace(/[|]/g, ',');
    let sql = ['delete from swiper where id in (' + ids + ')'];
    let arg = null;
    await mysql.query(MYSQL.XIONGAN, sql, arg);
    sheet[0].message = '删除成功';
    ctx.body = sheet[0];
  }
};