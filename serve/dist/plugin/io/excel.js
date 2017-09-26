//---------------------------------------------------------------------------- Package
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
//---------------------------------------------------------------------------- Plugin
const dir = require('./dir');
const time = require('../util/time');
const sheet = require('../util/sheet');
//---------------------------------------------------------------------------- Exports
/**
 * excel类
 */
module.exports = class {
	//---------------------------------------------------------------------------- Constructor
	/**
  * 构造方法
  * @param {Object} ctx 				上下文对象
  * @param {String} filename 	显示的文件名
  * @param {Array}  data 			数据
  */
	constructor(ctx, filename, data) {
		// 设置对象
		this.filename = filename;
		this.data = data;
		this.ctx = ctx;

		this.result = '';

		// 设置ctx
		this.ctx.type = 'application/vnd.ms-excel';
		this.ctx.attachment(this.filename + '.xls');
	}

	/**
  * 导出xls文件
  * @return {[type]} [description]
  */
	export() {
		for (let row of this.data) {}
	}

	/**
  * 添加一个新列
  * @return {[type]} [description]
  */
	_newColumn() {}

	/**
  * 添加一个新行
  * @return {[type]} [description]
  */
	_newRow() {}

};