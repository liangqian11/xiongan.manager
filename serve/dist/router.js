'use strict';

var _ = require('lodash');

var cultivate = require('./router/xiongan/cultivate');
var examine = require('./router/xiongan/examine');
var home = require('./router/xiongan/home');
var live = require('./router/xiongan/live');

var xiongan = _.merge(cultivate, examine, home, live);

var router = _.merge(xiongan);

module.exports = router;