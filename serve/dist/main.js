//---------------------------------------------------------------------------- Package
const _ = require('lodash');
const path = require('path');
const Koa = require('koa');
const cors = require('koa-cors');
const router = require('koa-router')();
const bodyparser = require('koa-bodyparser');
const convert = require('koa-convert');

//---------------------------------------------------------------------------- Config
const CONFIG = require('./config');
//---------------------------------------------------------------------------- Plugin
// const preset = require('./plugin/middle/preset')
//---------------------------------------------------------------------------- Object
global.app = new Koa();
//---------------------------------------------------------------------------- Logger
// const logger = require('koa-json-logger')
// app.use(logger())
//---------------------------------------------------------------------------- Session
const session = require('koa-session-minimal');
const redisStore = require('koa-redis');
app.use(session({ store: redisStore() }));
//---------------------------------------------------------------------------- Static
if (CONFIG.ENV === 'dev') {
  const serve = require('koa-static');
  app.use(convert(serve(process.cwd() + '/front/dist')));
}
//---------------------------------------------------------------------------- Router
_.forOwn(require('./router'), (value, key) => {
  _.forOwn(value, (v, k) => {
    router[key]('/rest' + k, v);
  });
});
//---------------------------------------------------------------------------- Socket
require('./socket/index').listen();
//---------------------------------------------------------------------------- Customer
// app.use(preset(CONFIG.MYSQL))
//---------------------------------------------------------------------------- Koa其它中间件
app.use(convert(cors({ credentials: true })));
app.use(bodyparser());
app.use(router.routes());
app.use(router.allowedMethods());
//---------------------------------------------------------------------------- 监听
app.listen(CONFIG.PORT);
console.log('开始监听：' + CONFIG.PORT);