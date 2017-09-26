'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');

var _require = require('../../config'),
    MYSQL = _require.MYSQL;

var mysql = require('../../plugin/util/mysql');
var sheet = require('../../plugin/util/sheet');
var log = require('../../plugin/util/log');

exports.get = {};

exports.post = {
	'/manager/login/': function () {
		var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
			var _ctx$request$body, username, password, data;

			return _regenerator2.default.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_ctx$request$body = ctx.request.body, username = _ctx$request$body.username, password = _ctx$request$body.password;
							_context.next = 3;
							return mysql.query(MYSQL.XIONGAN, ['select * from admin where username=? and password=?'], [username, password]);

						case 3:
							data = _context.sent;

							if (!_.isEmpty(data[0])) {
								sheet[0].data = [];
								sheet[0].data = data[0];
								ctx.body = sheet[0];
							} else {
								sheet[10004].data = [];
								sheet[10004].message = '用户名或密码错误';
								ctx.body = sheet[10004];
							}

						case 5:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, undefined);
		}));

		return function managerLogin(_x, _x2) {
			return _ref.apply(this, arguments);
		};
	}()
};

exports.put = {};

exports.delete = {};