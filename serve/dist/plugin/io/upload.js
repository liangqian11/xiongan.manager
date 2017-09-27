'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var dir = require('./dir');
var time = require('../util/time');
var sheet = require('../util/sheet');

module.exports = function () {
	function _class(ctx, uploadPath) {
		(0, _classCallCheck3.default)(this, _class);

		this.ctx = ctx;
		this.uploadPath = uploadPath || path.join(process.cwd(), 'upload');
		this.contentTypes = {
			img: 'image/jpg, image/jpeg, image/gif, image/png',
			zip: 'application/x-zip-compressed, application/octet-stream',
			doc: 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/x-ppt, application/vnd.ms-excel, application/x-xls'
		};
	}

	(0, _createClass3.default)(_class, [{
		key: 'working',
		value: function working() {
			var fields = this.ctx.request.fields;

			var validArgs = this._validArgs(fields);
			if (validArgs !== sheet[0]) {
				return validArgs;
			}

			var files = this._getRawFiles(fields);
			this._validFiles(fields, files);

			var fileValidOkCount = 0;
			for (var i = 0, l = files.length; i < l; i++) {
				if (files[i].valid) {
					fileValidOkCount++;
				}
			}
			if (fileValidOkCount === 0) {
				return sheet[50004];
			}

			if (fields.type === 'compressimg') {
				sheet[0].data = this._saveBase64Files(fields, files);
			} else {
				sheet[0].data = this._saveNormalFiles(fields, files);
			}

			return sheet[0];
		}
	}, {
		key: '_validArgs',
		value: function _validArgs(fields) {
			if (fields === undefined) {
				return sheet[10001];
			}

			var args = ['project', 'category', 'max', 'type'];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = (0, _getIterator3.default)(args), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var arg = _step.value;

					if (fields[arg] === undefined || _.trim(fields[arg]) === '') {
						return sheet[10002];
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			if (!fields.file_0) {
				return sheet[50003];
			}

			return sheet[0];
		}
	}, {
		key: '_validFiles',
		value: function _validFiles(fields, files) {
			for (var i = 0, l = files.length; i < l; i++) {
				var tmp = fields.type === 'compressimg' ? 'img' : fields.type;
				var contentTypes = _.split(this.contentTypes[tmp], ',');

				var typeFlag = false;
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = (0, _getIterator3.default)(contentTypes), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var contentType = _step2.value;

						if (files[i].type === _.trim(contentType)) {
							typeFlag = true;
							break;
						}
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}

				var sizeFlag = files[i].size <= fields.max ? true : false;

				if (typeFlag && sizeFlag) {
					files[i].valid = true;
				}
			}
		}
	}, {
		key: '_getRawFiles',
		value: function _getRawFiles(fields) {
			var count = 0;
			for (var i = 0, l = 1000; i < l; i++) {
				if (!fields['file_' + i]) {
					count = i;
					break;
				}
			}

			var files = [];

			if (fields.type === 'compressimg') {
				for (var _i = 0, _l = count; _i < _l; _i++) {
					var type = this._getBase64ContentType(fields['file_' + _i]);
					var ext = this._getBase64Ext(type);
					files.push({
						type: type,
						ext: '.' + ext,
						name: 'file_' + _i + '.' + ext,
						size: fields['file_' + _i].length / 1024,
						data: fields['file_' + _i],
						valid: false
					});
				}
			} else {
				for (var _i2 = 0, _l2 = count; _i2 < _l2; _i2++) {
					files.push({
						type: fields['file_' + _i2][0].type,
						ext: path.extname(fields['file_' + _i2][0].name),
						name: fields['file_' + _i2][0].name,
						size: fields['file_' + _i2][0].size,
						path: fields['file_' + _i2][0].path,
						valid: false
					});
				}
			}

			return files;
		}
	}, {
		key: '_getBase64ContentType',
		value: function _getBase64ContentType(base64Data) {
			var reg = /image\/\w+/;
			var result = reg.exec(base64Data);
			return result ? result[0] : null;
		}
	}, {
		key: '_getBase64Ext',
		value: function _getBase64Ext(contentType) {
			var ext = '';
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
	}, {
		key: '_getNonceStr',
		value: function _getNonceStr() {
			var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;

			var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
			var maxPos = chars.length;
			var nonceStr = '';
			for (var i = 0; i < length; i++) {
				nonceStr += chars.charAt(Math.floor(Math.random() * maxPos));
			}
			return nonceStr;
		}
	}, {
		key: '_saveBase64Files',
		value: function _saveBase64Files(fields, files) {
			var _this = this;

			var data = [];

			var _loop = function _loop(i, l) {
				var base64Data = files[i].data.replace(/^data:image\/\w+;base64,/, "");
				base64Data = base64Data.replace(/\s/g, "+");
				var dataBuffer = new Buffer(base64Data, 'base64');

				var result = _this._getSavePath(fields, files[i]);

				fs.writeFile(result.path, dataBuffer, function (err) {
					if (err) {
						console.log('上传Base64类型文件失败');
						data.push({ success: false });
					} else {
						data.push({ success: true, url: result.dirname + path.sep + result.filename });
					}
				});
			};

			for (var i = 0, l = files.length; i < l; i++) {
				_loop(i, l);
			}

			return data;
		}
	}, {
		key: '_saveNormalFiles',
		value: function _saveNormalFiles(fields, files) {
			var _this2 = this;

			var data = [];

			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				var _loop2 = function _loop2() {
					var file = _step3.value;

					var result = _this2._getSavePath(fields, file);

					fs.rename(file.path, result.path, function (err) {
						if (err) {
							console.log('上传文件移动失败！');
							data.push({ success: false });
						} else {
							data.push({ success: true, url: result.dirname + path.sep + result.filename });
						}
					});
				};

				for (var _iterator3 = (0, _getIterator3.default)(files), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					_loop2();
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			return data;
		}
	}, {
		key: '_getSavePath',
		value: function _getSavePath(fields, file) {
			var timestamp = time.time13();
			var nonce = this._getNonceStr();

			var result = {
				path: '',
				dirname: time.format('yyyyMMdd', timestamp),
				filename: timestamp + nonce + file.ext
			};

			result.path = this.uploadPath + path.sep + fields.project + path.sep + fields.category + path.sep + result.dirname;
			if (!fs.existsSync(result.path)) {
				dir.mkdirSync(result.path);
			}

			result.path += path.sep + result.filename;
			return result;
		}
	}]);
	return _class;
}();