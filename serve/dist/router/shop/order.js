'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');
var request = require('request');

var _require = require('../../config'),
    MYSQL = _require.MYSQL;

var mysql = require('../../plugin/util/mysql');
var sheet = require('../../plugin/util/sheet');
var log = require('../../plugin/util/log');

var print_bill = function print_bill(params) {
  return new _promise2.default(function (resolve, reject) {
    var url = 'http://feiyin.mod.hesq.com.cn/print.php';
    request.post({ url: url, form: params }, function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(error, response, body) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!error && response.statusCode === 200) {
                  resolve(body);
                } else {
                  reject(error);
                }

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }());
  });
};

exports.get = {
  '/order/list': function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
      var arg, where, limit, sql, data;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              arg = [];
              where = '';
              limit = ' limit 0,15';

              if (ctx.query.status) {
                where = where == '' ? ' where status = ?' : where + ' and status = ?';
                arg.push(ctx.query.status);
              }
              if (ctx.query.paytype) {
                where = where == '' ? ' where paytype = ?' : where + ' and paytype = ?';
                arg.push(ctx.query.paytype);
              }
              if (ctx.query.orderid) {
                where = where == '' ? ' where orderid like "%' + ctx.query.orderid + '%"' : where + ' and orderid like "%' + ctx.query.orderid + '%"';
              }
              if (ctx.query.take_name) {
                where = where == '' ? ' where take_name like "%' + ctx.query.take_name + '%"' : where + ' and take_name like "%' + ctx.query.take_name + '%"';
              }
              if (ctx.query.take_mobile) {
                where = where == '' ? ' where take_mobile like "%' + ctx.query.take_mobile + '%"' : where + ' and take_mobile like "%' + ctx.query.take_mobile + '%"';
              }
              if (ctx.query.take_address) {
                where = where == '' ? ' where take_address like "%' + ctx.query.take_address + '%"' : where + ' and take_address like "%' + ctx.query.take_address + '%"';
              }
              if (ctx.query.page > 0) {
                limit = ' limit ' + (ctx.query.page - 1) * 15 + ',15';
              }
              sql = ['select * from `order`' + where + ' order by id desc ' + limit];
              _context2.next = 13;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 13:
              data = _context2.sent;

              sheet[0].data = data[0];
              ctx.body = sheet[0];

            case 16:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function orderList(_x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }(),

  '/order/detail/:id': function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
      var id, sql, arg, data;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = ctx.params.id;
              sql = ['select * from `order` where id=?', 'select * from item where oid=?'];
              arg = [[id], [id]];
              _context3.next = 5;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 5:
              data = _context3.sent;

              sheet[0].data = [data[0][0], data[1]];
              ctx.body = sheet[0];

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function orderDetailId(_x6, _x7) {
      return _ref3.apply(this, arguments);
    };
  }(),

  '/order/amount/:aid/:time_start/:time_end': function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
      var aid, time_start, time_end, sql, arg, data;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              aid = ctx.params.aid;
              time_start = ctx.params.time_start;
              time_end = ctx.params.time_end;
              sql = ['select sum(amount) as amount from `order` where aid=? and time_submit>? and time_submit<? and status in(2,3)', 'select sum(returned) as returned from `order` where aid=? and time_submit>? and time_submit<? and status in(2,3)'];
              arg = [[aid, time_start, time_end], [aid, time_start, time_end]];
              _context4.next = 7;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 7:
              data = _context4.sent;

              sheet[0].data = data;
              ctx.body = sheet[0];

            case 10:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined);
    }));

    return function orderAmountAidTime_startTime_end(_x8, _x9) {
      return _ref4.apply(this, arguments);
    };
  }()
};

exports.post = {};

exports.put = {
  '/order/dispatch': function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
      var _ctx$request$body, id, eid, express, express_mobile, params, print, json_obj, sql, arg;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _ctx$request$body = ctx.request.body, id = _ctx$request$body.id, eid = _ctx$request$body.eid, express = _ctx$request$body.express, express_mobile = _ctx$request$body.express_mobile;
              params = {
                id: id,
                express: express
              };
              _context5.next = 4;
              return print_bill(params);

            case 4:
              print = _context5.sent;

              console.log(print);
              json_obj = JSON.parse(print);

              if (!(json_obj.return == 0)) {
                _context5.next = 15;
                break;
              }

              sql = ['update `order` set eid=?, express=?, express_mobile=?, status=?, isprint_express=? where id=?'];
              arg = [eid, express, express_mobile, 2, 1, id];
              _context5.next = 12;
              return mysql.query(MYSQL.SHOP, sql, arg);

            case 12:
              ctx.body = sheet[0];
              _context5.next = 16;
              break;

            case 15:
              if (json_obj.return == 20002) {
                sheet[20002].message = '订单状态已经发生改变, 无法进行操作!';
                ctx.body = sheet[20002];
              } else {
                sheet[70001].message = '打印失败!';
                ctx.body = sheet[70001];
              }

            case 16:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function orderDispatch(_x10, _x11) {
      return _ref5.apply(this, arguments);
    };
  }(),

  '/order/returncash': function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
      var _ctx$request$body2, id, cash, content, time, order_data;

      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _ctx$request$body2 = ctx.request.body, id = _ctx$request$body2.id, cash = _ctx$request$body2.cash, content = _ctx$request$body2.content;
              time = _.now().toString().substr(0, 10);
              _context6.next = 4;
              return mysql.query(MYSQL.SHOP, ['select * from `order` where id=?'], [id]);

            case 4:
              order_data = _context6.sent;

              if (!(order_data[0][0].status == 0)) {
                _context6.next = 9;
                break;
              }

              sheet[10004].message = '操作失败:该订单为未支付订单';
              ctx.body = sheet[10004];
              return _context6.abrupt('return');

            case 9:
              if (!(cash + order_data[0][0].returned > order_data[0][0].amount + order_data[0][0].fare)) {
                _context6.next = 13;
                break;
              }

              sheet[20004].message = '操作失败:退款金额超过订单额';
              ctx.body = sheet[20004];
              return _context6.abrupt('return');

            case 13:
              _context6.next = 15;
              return mysql.query(MYSQL.SHOP, ['update `order` set returned=returned+?, content=? where id=?'], [cash, content, id]);

            case 15:
              _context6.next = 17;
              return mysql.query(MYSQL.USER, ['update user set cash=cash+? where id=?', 'insert into cash_exchange (uid, cash, description, time) values (?,?,?,?)'], [[cash, order_data[0][0].uid], [order_data[0][0].uid, cash, '退单返余额', time]]);

            case 17:
              ctx.body = sheet[0];

            case 18:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function orderReturncash(_x12, _x13) {
      return _ref6.apply(this, arguments);
    };
  }(),

  '/order/cancel': function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(ctx, next) {
      var id, time, orderdata, cash;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              id = ctx.request.body.id;
              time = _.now().toString().substr(0, 10);
              _context7.next = 4;
              return mysql.query(MYSQL.SHOP, ['select * from `order` where id=?'], [id]);

            case 4:
              orderdata = _context7.sent;
              cash = orderdata[0][0].pay_cash;

              if (orderdata[0][0].ispay == 1) {
                cash += orderdata[0][0].pay_online;
              }
              cash -= orderdata[0][0].returned;
              _context7.next = 10;
              return mysql.query(MYSQL.SHOP, ['update `order` set status=?,returned=?,time_cancel=? where id=?'], [4, cash, time, id]);

            case 10:
              _context7.next = 12;
              return mysql.query(MYSQL.USER, ['update user set cash=cash+? where id=?', 'insert into cash_exchange (uid, cash, description, time) values (?,?,?,?)'], [[cash, orderdata[0][0].uid], [orderdata[0][0].uid, cash, '取消订单返还余额', time]]);

            case 12:

              ctx.body = sheet[0];
              return _context7.abrupt('return');

            case 14:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    }));

    return function orderCancel(_x14, _x15) {
      return _ref7.apply(this, arguments);
    };
  }()
};

exports.delete = {};