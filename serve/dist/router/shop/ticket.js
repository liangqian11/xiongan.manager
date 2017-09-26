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
var serial = require('../../plugin/util/serial');
var log = require('../../plugin/util/log');

exports.get = {
  '/ticket/set/list': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var arg, limit, sql, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              arg = [];
              limit = ' limit 0,10';

              if (ctx.query.page > 0) {
                limit = ' limit ' + (ctx.query.page - 1) * 10 + ',10';
              }
              sql = ['select * from ticket_set order by id desc' + limit];
              _context.next = 6;
              return mysql.query(MYSQL.USER, sql, arg);

            case 6:
              data = _context.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function ticketSetList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),

  '/ticket/item/list': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var arg, where, limit, sql, data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              arg = [];
              where = '';
              limit = ' limit 0,20';

              if (ctx.query.uid > 0) {
                where = where == '' ? ' where uid = ?' : where + ' and uid = ?';
                arg.push(ctx.query.uid);
              }
              if (ctx.query.time > 0) {
                where = where == '' ? ' where time > 0' : where + ' and time > 0';
                arg.push(ctx.query.time);
              }
              if (ctx.query.number) {
                where = where == '' ? ' where number like "%' + ctx.query.number + '%"' : where + ' and number like "%' + ctx.query.number + '%"';
              }
              if (ctx.query.page > 0) {
                limit = ' limit ' + (ctx.query.page - 1) * 20 + ',20';
              }
              sql = ['select * from ticket_item ' + where + ' order by id ' + limit];
              _context2.next = 10;
              return mysql.query(MYSQL.USER, sql, arg);

            case 10:
              data = _context2.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function ticketItemList(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(),

  '/ticket/item/:id': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var sql, arg, data;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              sql = ['select * from ticket_item where id=?', 'select cash from ticket_set where id=(select tid from ticket_item where id=?)'];
              arg = [[ctx.params.id], [ctx.params.id]];
              _context3.next = 4;
              return mysql.query(MYSQL.USER, sql, arg);

            case 4:
              data = _context3.sent;

              sheet[0].data = data;
              ctx.body = sheet[0];

            case 7:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function ticketItemId(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }()
};

exports.post = {
  '/ticket/set/add': function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var _ctx$request$body, batch, count, cash, sql, arg, ticket_set, create_ticket, numbers, sql_item, arg_item, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, number;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _ctx$request$body = ctx.request.body, batch = _ctx$request$body.batch, count = _ctx$request$body.count, cash = _ctx$request$body.cash;
              sql = ['insert into ticket_set (batch, count, cash) values(?, ?, ?)'];
              arg = [batch, count, cash];
              _context4.next = 5;
              return mysql.query(MYSQL.USER, sql, arg);

            case 5:
              ticket_set = _context4.sent;

              create_ticket = function create_ticket(count, tickets) {
                var count_now = tickets.length;
                for (var i = 0; i < count - count_now; i++) {
                  var number = batch + serial.genmixed(8);
                  tickets.push(number);
                }

                var new_tickets = _.uniq(tickets);
                if (new_tickets.length < count) {
                  return create_ticket(count, new_tickets);
                } else {
                  return new_tickets;
                }
              };

              numbers = create_ticket(count, []);
              sql_item = [];
              arg_item = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context4.prev = 13;

              for (_iterator = (0, _getIterator3.default)(numbers); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                number = _step.value;

                sql_item.push('insert into ticket_item (tid, number, cash) values (?,?,?)');
                arg_item.push([ticket_set[0].insertId, number, 0]);
              }
              _context4.next = 21;
              break;

            case 17:
              _context4.prev = 17;
              _context4.t0 = _context4['catch'](13);
              _didIteratorError = true;
              _iteratorError = _context4.t0;

            case 21:
              _context4.prev = 21;
              _context4.prev = 22;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 24:
              _context4.prev = 24;

              if (!_didIteratorError) {
                _context4.next = 27;
                break;
              }

              throw _iteratorError;

            case 27:
              return _context4.finish(24);

            case 28:
              return _context4.finish(21);

            case 29:
              _context4.next = 31;
              return mysql.query(MYSQL.USER, sql_item, arg_item);

            case 31:
              sheet[0].data = numbers;
              ctx.body = sheet[0];

            case 33:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[13, 17, 21, 29], [22,, 24, 28]]);
    }));

    return function ticketSetAdd(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }()
};

exports.put = {
  '/ticket/update': function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
      var time, _ctx$request$body2, id, uid, number, ticket_item, ticket_set, sql, arg;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              time = _.now().toString().substr(0, 10);
              _ctx$request$body2 = ctx.request.body, id = _ctx$request$body2.id, uid = _ctx$request$body2.uid, number = _ctx$request$body2.number;
              _context5.next = 4;
              return mysql.query(MYSQL.USER, ['select * from ticket_item where number=?'], [number]);

            case 4:
              ticket_item = _context5.sent;

              if (!(uid == 0)) {
                _context5.next = 9;
                break;
              }

              sheet[20004].message = '操作失败:请输入正确的用户号';
              ctx.body = sheet[20004];
              return _context5.abrupt('return');

            case 9:
              if (!(ticket_item[0][0].time > 0)) {
                _context5.next = 13;
                break;
              }

              sheet[20004].message = '操作失败:该卡券已经兑换过,请不要重复兑换';
              ctx.body = sheet[20004];
              return _context5.abrupt('return');

            case 13:
              _context5.next = 15;
              return mysql.query(MYSQL.USER, ['select * from ticket_set where id=(select tid from ticket_item where number=?)'], [number]);

            case 15:
              ticket_set = _context5.sent;
              sql = [];
              arg = [];

              sql.push('update ticket_item set uid=?, cash=?, time=? where number=?');
              arg.push([uid, ticket_set[0][0].cash, time, number]);
              sql.push('update user set cash=cash+? where id=?');
              arg.push([ticket_set[0][0].cash, uid]);
              sql.push('insert into cash_exchange (uid, cash, description, time) values (?,?,?,?)');
              arg.push([uid, ticket_set[0][0].cash, 'VIP卡兑换余额', time]);
              _context5.next = 26;
              return mysql.query(MYSQL.USER, sql, arg);

            case 26:
              sheet[0].message = '兑换成功';
              ctx.body = sheet[0];

            case 28:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function ticketUpdate(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }()
};

exports.delete = {};