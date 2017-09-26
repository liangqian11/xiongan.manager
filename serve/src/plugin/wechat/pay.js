//---------------------------------------------------------------------------- Package
const _ = require('lodash')
const request = require('request')
const md5 = require('md5')
//---------------------------------------------------------------------------- Config
const { WEPAY } = require('../../config')
//---------------------------------------------------------------------------- Plugin
const log = require('../util/log')
const xml = require('../util/xml')
const time = require('../util/time')
const serial = require('../util/serial')
//---------------------------------------------------------------------------- prepay
/**
 * 统一下单
 * https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1
 * @params {Object} args 需要传入的参数
 * let json = {
 *    attach: '支付测试',
 *    body: 'js支付测试',
 *    openid: 'o5U9BwSkGwsBmvnDq8eELSdXmaqA',
 *    total_fee: 1,
 *    out_trade_no: '12345678901234',
 *    spbill_create_ip: '27.187.53.5'
 * }
 * @return 返回前端直接使用的支付配置项JSON：
 * {
 *    appId: appId,
 *    timeStamp: timeStamp,
 *    nonceStr: nonceStr,
 *    package: package,
 *    signType: signType,
 *    paySign: paySign
 * }
 * 返回后，前端注意调用，特别是timeStamp在前端的key,Stamp中的S必须要小写，即timestamp。
 */
exports.prepay = function (args) {
  return new Promise(async function(resolve, reject) {
    try {
      // 设置参数，并生成xml
      let params = _setPrepayParams(args)
      let strxml = xml.toXml(params)

      // request wechat prepay
      let data = await _requestPrepay(strxml)

      // 制作需要签名的
      let result = {
        appId: WEPAY.APPID,
        timeStamp: time.time(),
        nonceStr: serial.nonceStr(),
        package: 'prepay_id=' + data.prepay_id,
        signType: 'MD5'
      }

      // 生成签名
      let paySign = _getSign(result)
      result.paySign = paySign

      // 删除不必要的参数（appId）并返回
      delete result.appId

      // 返回
      resolve(result)
    } catch (err) {
      log.error('进入error')
      reject(err)
    }
  })
}
//---------------------------------------------------------------------------- _setPrepayParams
/**
 * 预下单参数
 */
const _setPrepayParams = function (args) {
  let params = {
    appid: WEPAY.APPID,
    mch_id: WEPAY.MCH_ID,
    notify_url: WEPAY.NOTIFY_URL,
    trade_type: WEPAY.TRADE_TYPE,
    nonce_str: serial.nonceStr()
  }
  params = _.merge(params, args)
  params.sign = _getSign(params)
  return params
}
//---------------------------------------------------------------------------- _requestPrepay
/**
 * (Promise)执行统一预下单
 */
const _requestPrepay = function (params) {
  return new Promise(function(resolve, reject) {
    let url = 'https://api.mch.weixin.qq.com/pay/unifiedorder'
    request({ url: url, method: 'POST', body: params }, async function (error, response, body) {
      // request返回成功处理
      if (!error && response.statusCode === 200) {
        // log.info('获得unifiedorder信息: ' + body)
        let obj = await xml.toObj(body)
        let json = obj.xml
        if (json.return_code === 'SUCCESS' && json.result_code === 'SUCCESS') {
          resolve(json)
        } else {
          reject('返回码不正确')
        }
      // request返回出错处理
      } else {
        reject(error)
      }
    })
  })
}
//---------------------------------------------------------------------------- _getSign
/**
 * 获取签名
 */
const _getSign = function (params) {
  params = _.clone(params)
  delete params.sign
  var str = _getQueryString(params)
  var stringSignTemp = str + '&key=' + WEPAY.KEY
  var sign = md5(stringSignTemp).toUpperCase()
  return sign
}
//---------------------------------------------------------------------------- _getQueryString
/**
 * 将object生成querystring形式的字符串
 */
const _getQueryString = function (object) {
  return Object.keys(object).filter(function (key) {
    return object[key] !== undefined && object[key] !== ''
  }).sort().map(function (key) {
    return key + '=' + object[key]
  }).join('&')
}
