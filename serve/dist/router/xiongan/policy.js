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
  * 政策列表
  */
	'/policy/list': async (ctx, next) => {
		let arg = [];
		let where = '';
		let limit = ' limit 0,16';
		if (ctx.query.title) {
			where = where == '' ? ' where title like "%' + ctx.query.title + '%"' : where + ' and title like "%' + ctx.query.title + '%"';
		}
		if (ctx.query.page > 0) {
			limit = ' limit ' + (ctx.query.page - 1) * 16 + ',16';
		}
		let sql = ['select * from policy' + where + ' order by id desc ' + limit];
		let data = await mysql.query(MYSQL.XIONGAN, sql, arg);
		sheet[0].data = data[0];
		ctx.body = sheet[0];
	},
	/**
  * 政策详情
  */
	'/policy/detail/:id': async (ctx, next) => {
		let data = await mysql.query(MYSQL.XIONGAN, ['select * from policy where id=?'], [ctx.params.id]);
		sheet[0].data = data[0][0];
		ctx.body = sheet[0];
	}
	//---------------------------------------------------------------------------- POST
};exports.post = {
	/**
  * 添加政策
  */
	'/policy/add': async (ctx, next) => {
		let { title, author, img_big, img_small, img_recommend, summary, content, isbanner, istop } = ctx.request.body;
		let time = _.now().toString().substr(0, 10);
		let sql = ['insert into policy (title, author, time, img_big, img_small, img_recommend, summary, content, isbanner, istop) values(?,?,?,?,?,?,?,?,?,?)'];
		let arg = [title, author, time, img_big, img_small, img_recommend, summary, content, isbanner, istop];
		await mysql.query(MYSQL.XIONGAN, sql, arg);
		sheet[0].message = '添加成功!';
		ctx.body = sheet[0];
	}
	//---------------------------------------------------------------------------- PUT
};exports.put = {
	/**
  * 行更新政策
  */
	'/policy/uprow': async (ctx, next) => {
		if (!_.isArray(ctx.request.body)) {
			ctx.request.body = [ctx.request.body];
		}
		let sql = [];
		let arg = [];
		for (let item of ctx.request.body) {
			let { id, title, author, isbanner, istop } = item;
			sql.push('update policy set title=?, author=?, isbanner=?, istop=? where id=?');
			arg.push([title, author, isbanner, istop, id]);
		}
		await mysql.query(MYSQL.XIONGAN, sql, arg);
		sheet[0].message = '更新成功!';
		ctx.body = sheet[0];
	},
	/**
  * 编辑政策
  */
	'/policy/update': async (ctx, next) => {
		let { id, title, author, img_big, img_small, img_recommend, summary, content, isbanner, istop } = ctx.request.body;
		let sql = ['update policy set title=?, author=?, img_big=?, img_small=?, img_recommend=?, summary=?, content=?, isbanner=?, istop=? where id=?'];
		let arg = [title, author, img_big, img_small, img_recommend, summary, content, isbanner, istop, id];
		await mysql.query(MYSQL.XIONGAN, sql, arg);
		sheet[0].message = '更新成功';
		ctx.body = sheet[0];
	}
	//---------------------------------------------------------------------------- DELETE
};exports.delete = {
	/**
  * 删除政策
  */
	'/policy/remove/:ids': async (ctx, next) => {
		let ids = ctx.params.ids;
		ids = ids.replace(/[|]/g, ',');
		let sql = ['delete from policy where id in (' + ids + ')'];
		let arg = null;
		await mysql.query(MYSQL.XIONGAN, sql, arg);
		sheet[0].message = '删除成功!';
		ctx.body = sheet[0];
	}
};