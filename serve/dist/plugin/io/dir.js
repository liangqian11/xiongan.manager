'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var os = require('os');
var path = require('path');

exports.mkdirSync = function (dirpath, mode) {
  if (!fs.existsSync(dirpath)) {
    var pathtmp = os.platform() == 'linux' ? '/' : null;

    var arr = dirpath.split(path.sep);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(arr), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var dirname = _step.value;

        if (dirname != '') {
          if (pathtmp) {
            pathtmp = path.join(pathtmp, dirname);
          } else {
            pathtmp = dirname;
          }

          if (!fs.existsSync(pathtmp)) {
            fs.mkdirSync(pathtmp, mode);
          }
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
  }

  return true;
};