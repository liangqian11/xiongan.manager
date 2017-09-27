'use strict';

var _ = require('lodash');
var path = require('path');
var Koa = require('koa');
var cors = require('koa-cors');
var router = require('koa-router')();
var bodyparser = require('koa-bodyparser');
var convert = require('koa-convert');

var CONFIG = require('./config');

global.app = new Koa();

var session = require('koa-session-minimal');
var redisStore = require('koa-redis');
app.use(session({ store: redisStore() }));

if (CONFIG.ENV === 'dev') {
  var serve = require('koa-static');
  app.use(convert(serve(process.cwd() + '/front/dist')));
}

_.forOwn(require('./router'), function (value, key) {
  _.forOwn(value, function (v, k) {
    router[key]('/rest' + k, v);
  });
});

require('./socket/index').listen();

app.use(convert(cors({ credentials: true })));
app.use(bodyparser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(CONFIG.PORT);
console.log('开始监听：' + CONFIG.PORT);