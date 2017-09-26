//---------------------------------------------------------------------------- Package
import Vue from 'vue'
//---------------------------------------------------------------------------- Exports
export default function () {
	if (!Vue.cookie.get('token')) {
		let query = Vue.query.all()
		if (!query.token) {
			window.location.href = 'http://weauth.mod.hesq.com.cn/enter?state=' + encodeURIComponent(window.location.href)
		} else {
			Vue.cookie.set('token', query.token, Vue.conf.cookies)
		}
	}
}
