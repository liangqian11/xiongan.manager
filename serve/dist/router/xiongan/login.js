//---------------------------------------------------------------------------- Package
const _ = require('lodash');
//---------------------------------------------------------------------------- Config
const { MYSQL } = require('../../config');
//---------------------------------------------------------------------------- Plugin
const mysql = require('../../plugin/util/mysql');
const sheet = require('../../plugin/util/sheet');
const log = require('../../plugin/util/log');
//---------------------------------------------------------------------------- GET
exports.get = {};
//---------------------------------------------------------------------------- POST
exports.post = {
	'/manager/login/': async (ctx, next) => {
		let { username, password } = ctx.request.body;
		let data = await mysql.query(MYSQL.XIONGAN, ['select * from admin where username=? and password=?'], [username, password]);
		if (!_.isEmpty(data[0])) {
			sheet[0].data = [];
			sheet[0].data = data[0];
			ctx.body = sheet[0];
		} else {
			sheet[10004].data = [];
			sheet[10004].message = '用户名或密码错误';
			ctx.body = sheet[10004];
		}
	}

	//---------------------------------------------------------------------------- PUT
};exports.put = {};
//---------------------------------------------------------------------------- DELETE
exports.delete = {};