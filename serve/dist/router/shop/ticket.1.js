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
              if (ctx.query.number) {
                where = where == '' ? ' where number like "%' + ctx.query.number + '%"' : where + ' and number like "%' + ctx.query.number + '%"';
              }
              if (ctx.query.page > 0) {
                limit = ' limit ' + (ctx.query.page - 1) * 20 + ',20';
              }
              sql = ['select * from ticket_item ' + where + ' order by id ' + limit];
              _context2.next = 9;
              return mysql.query(MYSQL.USER, sql, arg);

            case 9:
              data = _context2.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 12:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function ticketItemList(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }()
};

exports.post = {
  '/ticket/set/add': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var _ctx$request$body, batch, count, cash, sql, arg, ticket_set, create_ticket, numbers, sql_item, arg_item, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, number;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _ctx$request$body = ctx.request.body, batch = _ctx$request$body.batch, count = _ctx$request$body.count, cash = _ctx$request$body.cash;
              sql = ['insert into ticket_set (batch, count, cash) values(?, ?, ?)'];
              arg = [batch, count, cash];
              _context3.next = 5;
              return mysql.query(MYSQL.USER, sql, arg);

            case 5:
              ticket_set = _context3.sent;

              create_ticket = function create_ticket(count, tickets) {
                var count_now = tickets.length;
                for (var i = 0; i < count - count_now; i++) {
                  var number = batch + serial.genmixed(8);
                  tickets.push(number);
                }

                var new_tickets = _.uniq(tickets);
                return new_tickets;
                if (new_tickets.length < count) {
                  return create_ticket(count, new_tickets);
                } else {
                  return new_tickets;
                }
              };

              numbers = create_ticket(count, []);

              console.log(numbers);
              sql_item = [];
              arg_item = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context3.prev = 14;

              for (_iterator = (0, _getIterator3.default)(numbers); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                number = _step.value;

                sql_item.push('insert into ticket_item (tid, number, cash) values (?,?,?)');
                arg_item.push([ticket_set[0].insertId, number, cash]);
              }
              _context3.next = 22;
              break;

            case 18:
              _context3.prev = 18;
              _context3.t0 = _context3['catch'](14);
              _didIteratorError = true;
              _iteratorError = _context3.t0;

            case 22:
              _context3.prev = 22;
              _context3.prev = 23;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 25:
              _context3.prev = 25;

              if (!_didIteratorError) {
                _context3.next = 28;
                break;
              }

              throw _iteratorError;

            case 28:
              return _context3.finish(25);

            case 29:
              return _context3.finish(22);

            case 30:
              _context3.next = 32;
              return mysql.query(MYSQL.USER, sql_item, arg_item);

            case 32:
              sheet[0].data = numbers;
              ctx.body = sheet[0];

            case 34:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[14, 18, 22, 30], [23,, 25, 29]]);
    }));

    return function ticketSetAdd(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }()
};

exports.put = {};

exports.delete = {};