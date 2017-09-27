'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

exports.get = {
  '/area/list': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var area;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return mysql.query(MYSQL.XIONGAN, ['select * from area'], [null]);

            case 2:
              area = _context.sent;

              sheet[0].data = area[0];
              ctx.body = sheet[0];

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function areaList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),

  '/swiper/list': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var swiper;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return mysql.query(MYSQL.XIONGAN, ['select * from swiper'], [null]);

            case 2:
              swiper = _context2.sent;

              sheet[0].data = swiper[0];
              ctx.body = sheet[0];

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function swiperList(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(),

  '/user/login/:username/:password': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var username, password, data;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              username = ctx.params.username;
              password = ctx.params.password;
              _context3.next = 4;
              return mysql.query(MYSQL.XIONGAN, ['select * from admin where username=? and password = ?'], [username, password]);

            case 4:
              data = _context3.sent;

              if (data.length > 0) {
                sheet[0].data = data;
                ctx.body = sheet[0];
              } else {
                sheet[1004].data = data;
                sheet[1004].massage = '账号或密码错误';
                ctx.body = sheet[1004];
              }

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function userLoginUsernamePassword(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }()
};

exports.post = {
  '/add/area': function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var name, data;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              name = ctx.request.body.name;
              _context4.next = 3;
              return mysql.query(MYSQL.XIONGAN, ['insert into area (name) values (?) '], [name]);

            case 3:
              data = _context4.sent;

              sheet[0].message = '添加成功';
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function addArea(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }(),

  '/swiper/add': function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
      var _ctx$request$body, url, sort, sql, arg;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _ctx$request$body = ctx.request.body, url = _ctx$request$body.url, sort = _ctx$request$body.sort;
              sql = ['insert into swiper ( sort, url ) values(?,?)'];
              arg = [sort, url];
              _context5.next = 5;
              return mysql.query(MYSQL.XIONGAN, sql, arg);

            case 5:
              sheet[0].message = '添加成功';
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function swiperAdd(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }()
};

exports.put = {
  '/edit/area': function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
      var sql, arg, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, name, id;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!_.isArray(ctx.request.body)) {
                ctx.request.body = [ctx.request.body];
              }
              sql = [];
              arg = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context6.prev = 6;

              for (_iterator = (0, _getIterator3.default)(ctx.request.body); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                item = _step.value;
                name = item.name, id = item.id;

                sql.push('update area set name=? where id =?');
                arg.push([name, id]);
              }
              _context6.next = 14;
              break;

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6['catch'](6);
              _didIteratorError = true;
              _iteratorError = _context6.t0;

            case 14:
              _context6.prev = 14;
              _context6.prev = 15;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 17:
              _context6.prev = 17;

              if (!_didIteratorError) {
                _context6.next = 20;
                break;
              }

              throw _iteratorError;

            case 20:
              return _context6.finish(17);

            case 21:
              return _context6.finish(14);

            case 22:
              _context6.next = 24;
              return mysql.query(MYSQL.XIONGAN, sql, arg);

            case 24:
              sheet[0].message = '更新成功';
              ctx.body = sheet[0];

            case 26:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function editArea(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }(),

  '/edit/swiper': function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(ctx, next) {
      var sql, arg, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, item, sort, id;

      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!_.isArray(ctx.request.body)) {
                ctx.request.body = [ctx.request.body];
              }
              sql = [];
              arg = [];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context7.prev = 6;

              for (_iterator2 = (0, _getIterator3.default)(ctx.request.body); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                item = _step2.value;
                sort = item.sort, id = item.id;

                sql.push('update swiper set sort=? where id =?');
                arg.push([sort, id]);
              }
              _context7.next = 14;
              break;

            case 10:
              _context7.prev = 10;
              _context7.t0 = _context7['catch'](6);
              _didIteratorError2 = true;
              _iteratorError2 = _context7.t0;

            case 14:
              _context7.prev = 14;
              _context7.prev = 15;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 17:
              _context7.prev = 17;

              if (!_didIteratorError2) {
                _context7.next = 20;
                break;
              }

              throw _iteratorError2;

            case 20:
              return _context7.finish(17);

            case 21:
              return _context7.finish(14);

            case 22:
              _context7.next = 24;
              return mysql.query(MYSQL.XIONGAN, sql, arg);

            case 24:
              sheet[0].message = '更新成功';
              ctx.body = sheet[0];

            case 26:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined, [[6, 10, 14, 22], [15,, 17, 21]]);
    }));

    return function editSwiper(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }()

};

exports.delete = {
  '/swiper/remove/:ids': function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(ctx, next) {
      var ids, sql, arg;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              ids = ctx.params.ids;

              ids = ids.replace(/[|]/g, ',');
              sql = ['delete from swiper where id in (' + ids + ')'];
              arg = null;
              _context8.next = 6;
              return mysql.query(MYSQL.XIONGAN, sql, arg);

            case 6:
              sheet[0].message = '删除成功';
              ctx.body = sheet[0];

            case 8:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    }));

    return function swiperRemoveIds(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }()
};