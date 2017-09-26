//---------------------------------------------------------------------------- Package
const request = require('request');
const Redis = require('ioredis');
//---------------------------------------------------------------------------- Config
const { REDIS, WECHAT } = require('../../config');
//---------------------------------------------------------------------------- Plugin
const log = require('../util/log');
//---------------------------------------------------------------------------- Object
const redis = new Redis(REDIS.MAIN.PORT, REDIS.MAIN.HOST);
//---------------------------------------------------------------------------- getToken
/**
 * （Promise）获取access_token
 * http://mp.weixin.qq.com/wiki/15/54ce45d8d30b6bf6758f68d2e95bc627.html
 */
exports.getToken = function () {
  return new Promise(async function (resolve, reject) {
    try {
      // 获取redis中的token
      let redis_token = await redis.get('wechat_access_token');
      redis_token = redis_token ? JSON.parse(redis_token) : { time: 0 };
      log.info('获得redis wechat_access_token: ' + JSON.stringify(redis_token));

      // time===0，或time还有20秒就过期，需要刷新
      if (redis_token.time === 0 || new Date().getTime() - redis_token.time > 7180000) {
        log.info('redis wechat_access_token不存在或已超时，使用新获取的wechat_access_token');
        let token = await _requestToken();
        _saveToken(token);
        resolve(token);
        return;
      }

      // 如果已经存在，且未超时，则直接返回redis中已存在的token
      log.info('使用已存在的redis wechat_access_token');
      resolve(redis_token.token);
    } catch (err) {
      log.error(err);
    }
  });
};
//---------------------------------------------------------------------------- _requestToken
/**
 * （Promise）取回微信access token
 * @return 取回的token json
 */
const _requestToken = function () {
  return new Promise(function (resolve, reject) {
    let url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + WECHAT.APPID + "&secret=" + WECHAT.APPSECRET;
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        log.info('request获得wechat_access_token: ' + body);
        let token = JSON.parse(body);
        if (token.errcode) {
          reject('获取wechat_access_token时，返回码错误: ' + body);
        } else {
          resolve(token.access_token);
        }
      }
      reject('获取wechat_access_token时，网络出错');
    });
  });
};
//---------------------------------------------------------------------------- _saveToken
/**
 * 保存token到redis服务器，并自动填写时间
 */
const _saveToken = function (token) {
  let value = '{"token": "' + token + '", "time": ' + new Date().getTime() + '}';
  redis.set('wechat_access_token', value);
  log.info('保存redis wechat_access_token: ' + value);
};