'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var xml2js = require('xml2js');

exports.toXml = function (obj) {
  var builder = new xml2js.Builder({ allowSurrogateChars: true });
  var xml = builder.buildObject({ xml: obj });
  return xml;
};

exports.toObj = function (xml) {
  return new _promise2.default(function (resolve, reject) {
    xml2js.parseString(xml, { trim: true, explicitArray: false }, function (err, obj) {
      if (err) reject(err);else resolve(obj);
    });
  });
};