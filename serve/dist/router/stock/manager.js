'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../../config'),
    MYSQL = _require.MYSQL;

var mysql = require('../../plugin/util/mysql');
var sheet = require('../../plugin/util/sheet');

exports.get = {
  '/manager/list': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var arg, where, limit, sql, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              arg = [];
              where = '';
              limit = ' limit 0,10';

              if (ctx.query.cid) {
                where = where == '' ? ' where cid = ?' : where + ' and cid = ?';
                arg.push(ctx.query.cid);
              }
              if (ctx.query.name) {
                where = where == '' ? ' where name like "%' + ctx.query.name + '%"' : where + ' and name like "%' + ctx.query.name + '%"';
              }
              if (ctx.query.page) {
                limit = ' limit ' + (ctx.query.page - 1) * 10 + ',10';
              }
              sql = ['select * from manager' + where + ' order by id desc ' + limit];
              _context.next = 9;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 9:
              data = _context.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function managerList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),

  '/writer/list': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var sql, data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              sql = ['select * from manager  where type=2 order by id desc '];
              _context2.next = 3;
              return mysql.query(MYSQL.STOCK, sql, [null]);

            case 3:
              data = _context2.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function writerList(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(),

  '/manager/detail/:id': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var id, sql, arg, data;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = ctx.params.id;
              sql = ['select * from manager where id=?'];
              arg = [id];
              _context3.next = 5;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 5:
              data = _context3.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function managerDetailId(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }(),

  '/manager/type': function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var sql, arg, data;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              sql = ['select * from cate_manager'];
              arg = [null];
              _context4.next = 4;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 4:
              data = _context4.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function managerType(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }()
};

exports.post = {
  '/manager/add': function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
      var _ctx$request$body, type, jobnumber, name, head, mobile, idnumber, username, password, company, address, about, enabled, sql, arg, result;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _ctx$request$body = ctx.request.body, type = _ctx$request$body.type, jobnumber = _ctx$request$body.jobnumber, name = _ctx$request$body.name, head = _ctx$request$body.head, mobile = _ctx$request$body.mobile, idnumber = _ctx$request$body.idnumber, username = _ctx$request$body.username, password = _ctx$request$body.password, company = _ctx$request$body.company, address = _ctx$request$body.address, about = _ctx$request$body.about, enabled = _ctx$request$body.enabled;
              sql = ['insert into manager (type, jobnumber, name, head, mobile, idnumber, username, password, company, address, about, enabled) values(?,?,?,?,?,?,?,?,?,?,?,?)'];
              arg = [type, jobnumber, name, head, mobile, idnumber, username, password, company, address, about, enabled];
              _context5.next = 5;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 5:
              result = _context5.sent;

              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function managerAdd(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }(),

  '/vip/add': function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
      var _ctx$request$body2, type, jobnumber, name, head, mobile, idnumber, username, password, company, address, about, enabled, sql, arg, result;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _ctx$request$body2 = ctx.request.body, type = _ctx$request$body2.type, jobnumber = _ctx$request$body2.jobnumber, name = _ctx$request$body2.name, head = _ctx$request$body2.head, mobile = _ctx$request$body2.mobile, idnumber = _ctx$request$body2.idnumber, username = _ctx$request$body2.username, password = _ctx$request$body2.password, company = _ctx$request$body2.company, address = _ctx$request$body2.address, about = _ctx$request$body2.about, enabled = _ctx$request$body2.enabled;
              sql = ['insert into manager (type, jobnumber, name, head, mobile, idnumber, username, password, company, address, about, enabled) values(?,?,?,?,?,?,?,?,?,?,?,?)'];
              arg = [type, jobnumber, name, head, mobile, idnumber, username, password, company, address, about, enabled];
              _context6.next = 5;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 5:
              result = _context6.sent;

              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function vipAdd(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }()
};

exports.put = {
  '/user/update': function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(ctx, next) {
      var _ctx$request$body3, id, head, mobile, password, sql, arg, result;

      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _ctx$request$body3 = ctx.request.body, id = _ctx$request$body3.id, head = _ctx$request$body3.head, mobile = _ctx$request$body3.mobile, password = _ctx$request$body3.password;
              sql = ['update manager set head=?, mobile=?, password=? where id=?'];
              arg = [head, mobile, password, id];
              _context7.next = 5;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 5:
              result = _context7.sent;

              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    }));

    return function userUpdate(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }()
};

exports.delete = {
  '/manager/remove/:id': function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(ctx, next) {
      var id, sql, arg, result;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              id = ctx.params.id;
              sql = ['delete from manager where id=?'];
              arg = [id];
              _context8.next = 5;
              return mysql.query(MYSQL.STOCK, sql, arg);

            case 5:
              result = _context8.sent;

              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    }));

    return function managerRemoveId(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }()
};