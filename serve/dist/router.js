'use strict';

var _ = require('lodash');

var article = require('./router/xiongan/article');
var company = require('./router/xiongan/company');
var culture = require('./router/xiongan/culture');
var login = require('./router/xiongan/login');
var policy = require('./router/xiongan/policy');
var wanted = require('./router/xiongan/wanted');

var xiongan = _.merge(article, company, culture, login, policy, wanted);

var router = _.merge(xiongan);

module.exports = router;