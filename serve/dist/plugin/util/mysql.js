'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');

exports.query = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(pool, sqls, args) {
    var data, i, l;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _assertArgs(sqls, args);
            data = [];
            i = 0, l = sqls.length;

          case 3:
            if (!(i < l)) {
              _context.next = 12;
              break;
            }

            _context.t0 = data;
            _context.next = 7;
            return _exec(pool, sqls[i], _getArg(i, args));

          case 7:
            _context.t1 = _context.sent;

            _context.t0.push.call(_context.t0, _context.t1);

          case 9:
            i++;
            _context.next = 3;
            break;

          case 12:
            return _context.abrupt('return', data);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _exec = function _exec(pool, sql, arg) {
  return new _promise2.default(function (resolve, reject) {
    pool.getConnection(function (err, conn) {
      if (err) throw err;
      conn.query(sql, arg, function (err, result) {
        if (err) throw err;
        conn.release();
        resolve(result);
      });
    });
  });
};

var _assertArgs = function _assertArgs(sqls, args) {
  if (!_.isArray(sqls)) {
    throw new Error('sqls必须为数组！');
  }
  if (!_.isArray(args) && args !== null) {
    throw new Error('args必须为数组或null！');
  }
};

var _getArg = function _getArg(index, args) {
  if (args === null) {
    return null;
  }
  if (_.isArray(args[index])) {
    return args[index];
  } else {
    return args;
  }
};