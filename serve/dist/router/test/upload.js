'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../../config'),
    MYSQL = _require.MYSQL;

var Upload = require('../../plugin/io/upload');
var mysql = require('../../plugin/util/mysql');
var sheet = require('../../plugin/util/sheet');

exports.post = {
  '/upload': function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
      var upload;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              upload = new Upload(ctx);

              ctx.body = upload.working();

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function upload(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
};