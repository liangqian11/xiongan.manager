//---------------------------------------------------------------------------- Package
import Vue from 'vue'
import VueResource from 'vue-resource'
//---------------------------------------------------------------------------- Middle
Vue.use(VueResource)
//---------------------------------------------------------------------------- Exports
export default function () {

	// 获取远程，带回config配置项的值
  Vue.http.get(Vue.hesq.url.restful + '/wechat/jsapi/config?url=' + encodeURIComponent(window.location.href), null).then((res) => {

		// 注意，使用原生的http，data需要2层
		let d = res.data.data

		// 进行微信的config配置
		wx.config({
			//debug: true,
			appId: d.appId,
			timestamp: d.timestamp,
			nonceStr: d.nonceStr,
			signature: d.signature,
			jsApiList: [
				'chooseWXPay',
				'onMenuShareTimeline'
			]
		})

		// 配置出错时的处理
		wx.error(function(res) {
			//console.log(res)
		})
		// console.log(1)
	}, (err) => {
		console.log(err)
	})
}
