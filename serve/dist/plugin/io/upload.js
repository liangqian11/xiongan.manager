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
 * 注意，临时目录是在main.js中定义的
 * 前端post过来的结构：{
 * 		project: 'project',
 * 		category: 'category',
 * 		max: max,
 * 		type: type,
 * 		file_1: Base64Data or Object,
 * 		任意多个file_n
 * }
 */
module.exports = class {
	//---------------------------------------------------------------------------- Constructor
	/**
  * 构造方法
  * @param {Object} ctx 上传的上下文
  * @param {String} uploadPath 上传目录的根路径，默认root/upload
  */
	constructor(ctx, uploadPath) {
		this.ctx = ctx;
		this.uploadPath = uploadPath || path.join(process.cwd(), 'upload');
		this.contentTypes = {
			img: 'image/jpg, image/jpeg, image/gif, image/png',
			zip: 'application/x-zip-compressed, application/octet-stream',
			doc: 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/x-ppt, application/vnd.ms-excel, application/x-xls'
		};
	}
	//---------------------------------------------------------------------------- Working
	/**
  * 实际上传操作，公开方法
  */
	working() {

		// 取出fields
		let fields = this.ctx.request.fields;

		// 验证参数是否合法
		let validArgs = this._validArgs(fields);
		if (validArgs !== sheet[0]) {
			return validArgs;
		}

		// 制作files数组，并将所有文件进行验证
		let files = this._getRawFiles(fields);
		this._validFiles(fields, files);

		// 判断是否有文件满足要求，如果没有文件满足要求，则返回错误
		let fileValidOkCount = 0;
		for (let i = 0, l = files.length; i < l; i++) {
			if (files[i].valid) {
				fileValidOkCount++;
			}
		}
		if (fileValidOkCount === 0) {
			return sheet[50004];
		}

		// 根据不同类型的文件进行保存。注意，此处返回一个data数据，用于返回给前端
		if (fields.type === 'compressimg') {
			sheet[0].data = this._saveBase64Files(fields, files);
		} else {
			sheet[0].data = this._saveNormalFiles(fields, files);
		}

		// 返回上传提示
		return sheet[0];
	}
	//---------------------------------------------------------------------------- _ValidArgs
	/**
  * 验证参数
  * @param Object fields ctx.request.fields对象
  * @return Boolean 参数验证成功返回true，失败返回false
  */
	_validArgs(fields) {

		// 无参数
		if (fields === undefined) {
			return sheet[10001];
		}

		// 缺失子参数
		let args = ['project', 'category', 'max', 'type'];
		for (let arg of args) {
			if (fields[arg] === undefined || _.trim(fields[arg]) === '') {
				return sheet[10002];
			}
		}

		// 无上传文件
		if (!fields.file_0) {
			return sheet[50003];
		}

		// 返回成功
		return sheet[0];
	}
	//---------------------------------------------------------------------------- _ValidFiles
	/**
  * 验证单个上传文件
  * @param {Array} 	exts 		允许上传的扩展类型数组
  * @param {Number} 	max 		允许上传的文件大小
  * @param {Object} 	file 		单个上传文件对象
  * @return {Object} 				验证成功返回sheet[0]，否则返回其它数值
  */
	_validFiles(fields, files) {
		for (let i = 0, l = files.length; i < l; i++) {

			// 获取允许的contentTypes
			let tmp = fields.type === 'compressimg' ? 'img' : fields.type;
			let contentTypes = _.split(this.contentTypes[tmp], ',');

			// 验证type
			let typeFlag = false;
			for (let contentType of contentTypes) {
				if (files[i].type === _.trim(contentType)) {
					typeFlag = true;
					break;
				}
			}

			// 验证尺寸
			let sizeFlag = files[i].size <= fields.max ? true : false;

			// 判断type与size都为true，则更改valid值为true
			if (typeFlag && sizeFlag) {
				files[i].valid = true;
			}
		}
	}
	//---------------------------------------------------------------------------- _GetRowFiles
	/**
  * 获取上传文件的数组
  * @param  {Object} fields  post过来的fields对象
  * @return {Array}       		上传文件的数组
  */
	_getRawFiles(fields) {

		// 取出上传文件的个数
		let count = 0;
		for (let i = 0, l = 1000; i < l; i++) {
			if (!fields[`file_${i}`]) {
				count = i;
				break;
			}
		}

		// 声明需要返回的files数组
		let files = [];

		// 如果是base64数据，则构造新的file对象
		// 如果是普通对象，则将原结构改造成: {
		// 		name: name,			// 文件全名
		// 		ext: ext,				// 扩展名
		// 		type: type,			// contentType
		// 		size: size,			// 尺寸
		// 		data: data,			// 数据（仅用于compressimg类型）
		// 		path: path,			// 路径（仅用于其它类型）
		// 		valid: false		// 是否已通过验证，默认false
		// }
		if (fields.type === 'compressimg') {
			for (let i = 0, l = count; i < l; i++) {
				// 获取base64的类型，定义base64的新file字段
				let type = this._getBase64ContentType(fields[`file_${i}`]);
				let ext = this._getBase64Ext(type);
				files.push({
					type: type,
					ext: '.' + ext,
					name: `file_${i}.${ext}`,
					size: fields[`file_${i}`].length / 1024,
					data: fields[`file_${i}`],
					valid: false
				});
			}
		} else {
			for (let i = 0, l = count; i < l; i++) {
				files.push({
					type: fields[`file_${i}`][0].type,
					ext: path.extname(fields[`file_${i}`][0].name),
					name: fields[`file_${i}`][0].name,
					size: fields[`file_${i}`][0].size,
					path: fields[`file_${i}`][0].path,
					valid: false
				});
			}
		}

		// 返回
		return files;
	}
	//---------------------------------------------------------------------------- _GetBase64ContentType
	/**
  * 获取Base64类型数据的contentType值
  * @param  {String} base64Data 上传对象的Base64数据
  * @return {String}            成功返回contentType，否则返回null
  */
	_getBase64ContentType(base64Data) {
		let reg = /image\/\w+/;
		let result = reg.exec(base64Data);
		return result ? result[0] : null;
	}
	//---------------------------------------------------------------------------- _GetBase64Ext
	/**
  * 获取Base64类型数据的扩展名
  * @param  {String} contentType contentType类型
  * @return {String}      				扩展名
  */
	_getBase64Ext(contentType) {
		let ext = '';
		switch (contentType) {
			case 'image/png':
				ext = 'png';
				break;
			case 'image/gif':
				ext = 'gif';
				break;
			default:
				ext = 'jpg';
				break;
		}
		return ext;
	}
	//---------------------------------------------------------------------------- _GetNonceStr
	/**
  * 生成4位随机数字
  * @return {[type]} [description]
  */
	_getNonceStr(length = 4) {
		let chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
		let maxPos = chars.length;
		let nonceStr = '';
		for (let i = 0; i < length; i++) {
			nonceStr += chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return nonceStr;
	}
	//---------------------------------------------------------------------------- _SaveBase64Files
	/**
  * 保存Base64数据为图片文件
  */
	_saveBase64Files(fields, files) {

		// 声明返回的data
		let data = [];

		// 遍历files
		for (let i = 0, l = files.length; i < l; i++) {

			// 注意，base64过来的文件，
			// 1、将其头部去除
			// 2、将空格替换成+号
			// 3、转换为二进制buffer
			let base64Data = files[i].data.replace(/^data:image\/\w+;base64,/, "");
			base64Data = base64Data.replace(/\s/g, "+");
			let dataBuffer = new Buffer(base64Data, 'base64');

			// 取文件名等操作，包含：
			// path: 保存文件时的全路径
			// dirname: 按时间命名的最后一级目录名
			// filename: 按时间戳和随机字符串组成的文件名 
			let result = this._getSavePath(fields, files[i]);

			// 保存文件，注意成功与失败处理（填写不同的success值，如果成功，则添加url属性）
			fs.writeFile(result.path, dataBuffer, function (err) {
				if (err) {
					console.log('上传Base64类型文件失败');
					data.push({ success: false });
				} else {
					data.push({ success: true, url: result.dirname + path.sep + result.filename });
				}
			});
		}

		// 返回
		return data;
	}
	//---------------------------------------------------------------------------- _SaveNormalFiles
	/**
  * 保存普通文件
  */
	_saveNormalFiles(fields, files) {

		// 声明返回的data
		let data = [];

		// 将文件从临时目录转移到上传目录
		for (let file of files) {

			// 取文件名等操作，包含：
			// path: 保存文件时的全路径
			// dirname: 按时间命名的最后一级目录名
			// filename: 按时间戳和随机字符串组成的文件名 
			let result = this._getSavePath(fields, file);

			// 保存文件
			fs.rename(file.path, result.path, err => {
				if (err) {
					console.log('上传文件移动失败！');
					data.push({ success: false });
				} else {
					data.push({ success: true, url: result.dirname + path.sep + result.filename });
				}
			});
		}

		// 返回
		return data;
	}
	//---------------------------------------------------------------------------- _GetSavePath
	/**
  * 获取上传文件的最终目录和文件路径
  * @param  {Object} fields 	上传时传递过来的的字段结构
  * @param  {String} ext 		文件的扩展名
  * @return {Object} 				返回的目录名、返回的文件名
  */
	_getSavePath(fields, file) {

		// 取当前时间戳和随机4位字符串
		let timestamp = time.time13();
		let nonce = this._getNonceStr();

		// 声明返回值
		let result = {
			path: '',
			dirname: time.format('yyyyMMdd', timestamp),
			filename: timestamp + nonce + file.ext

			// 获取保存文件的目录，并递归生成
		};result.path = this.uploadPath + path.sep + fields.project + path.sep + fields.category + path.sep + result.dirname;
		if (!fs.existsSync(result.path)) {
			dir.mkdirSync(result.path);
		}

		// 修正result的path属性，并返回
		result.path += path.sep + result.filename;
		return result;
	}
};