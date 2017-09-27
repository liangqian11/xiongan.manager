'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.get = {
  '/live/list/manager': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var arg, where, live;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              arg = [];
              where = '';

              if (ctx.name) {
                where = where == '' ? ' where name = ?' : where + ' and name = ?';
                arg.push(ctx.name);
              }
              _context.next = 5;
              return $.mysql.query($.conf.mysql.main, 'select * from live' + where, [arg]);

            case 5:
              live = _context.sent;

              ctx.result.ok.data = live;
              $.flush(ctx, ctx.result.ok);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function liveListManager(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),

  '/live/detail/manager/:id': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var id, detail;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = ctx.params.id;
              _context2.next = 3;
              return $.mysql.query($.conf.mysql.main, 'select * from live where id = ?', [id]);

            case 3:
              detail = _context2.sent;

              ctx.result.ok.data = detail;
              $.flush(ctx, ctx.result.ok);

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function liveDetailManagerId(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(),

  '/live/one': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var data;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return $.mysql.query($conf.mysql.main, 'select * from live where ishome = 1', [null]);

            case 2:
              data = _context3.sent;

              if (data.length != 1) {
                ctx.result.e4001.errmsg = '已经设置过了';
                $.flush(ctx, ctx.result.e4001);
              }
              ctx.result.ok.data = data;
              $.flush(ctx, ctx.result.ok);

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function liveOne(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }()
};

exports.post = {
  '/live/add': function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var _ctx$post, name, img, href, time, end_time, ishome, status, data;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _ctx$post = ctx.post, name = _ctx$post.name, img = _ctx$post.img, href = _ctx$post.href, time = _ctx$post.time, end_time = _ctx$post.end_time, ishome = _ctx$post.ishome, status = _ctx$post.status;
              _context4.next = 3;
              return $.mysql.push($.conf.mysql.main, 'insert into live (name,img,href,time,end_time,ishome,status) values(?,?,?,?,?,?,?)', [name, img, href, time, end_time, ishome, status]);

            case 3:
              data = _context4.sent;

              ctx.result.ok.data = data;
              $.flush(ctx, ctx.result.ok);

            case 6:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function liveAdd(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }()
};

exports.put = {
  '/live/edit/manager': function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
      var _ctx$put, name, img, href, time, end_time, ishome, status, id, data;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _ctx$put = ctx.put, name = _ctx$put.name, img = _ctx$put.img, href = _ctx$put.href, time = _ctx$put.time, end_time = _ctx$put.end_time, ishome = _ctx$put.ishome, status = _ctx$put.status, id = _ctx$put.id;
              _context5.next = 3;
              return $.mysql.push($.conf.mysql.main, 'update live name=?, img=?, href=?, time=?, end_time=?, ishome=?, status=? where id=?', [name, img, href, time, end_time, ishome, status, id]);

            case 3:
              data = _context5.sent;

              ctx.result.ok.data = data;
              $.flush(ctx, ctx.result.ok);

            case 6:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function liveEditManager(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }()
};

exports.delete = {
  '/live/delete/manager/:id': function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
      var id, data;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              id = ctx.params.id;
              _context6.next = 3;
              return $.mysql.push($.conf.mysql.main, 'delete from live where id = ?', [id]);

            case 3:
              data = _context6.sent;

              ctx.result.ok.data = data;
              $.flush(ctx, ctx.result.ok);

            case 6:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function liveDeleteManagerId(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }()
};