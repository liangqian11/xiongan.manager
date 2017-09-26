'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var dir = require('./dir');
var time = require('../util/time');
var sheet = require('../util/sheet');

module.exports = function () {
	function _class(ctx, filename, data) {
		(0, _classCallCheck3.default)(this, _class);

		this.filename = filename;
		this.data = data;
		this.ctx = ctx;

		this.result = '';

		this.ctx.type = 'application/vnd.ms-excel';
		this.ctx.attachment(this.filename + '.xls');
	}

	(0, _createClass3.default)(_class, [{
		key: 'export',
		value: function _export() {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = (0, _getIterator3.default)(this.data), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var row = _step.value;
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
	}, {
		key: '_newColumn',
		value: function _newColumn() {}
	}, {
		key: '_newRow',
		value: function _newRow() {}
	}]);
	return _class;
}();