export default {
	/**
	 * 设置一个本地session值
	 * @param {String} key 		键名
	 * @param {String} value  值
	 */
	set (key, value) {
		sessionStorage.setItem(key, value)
	},
	/**
	 * 获取一个本地的session值
	 * @param  {String} key		键名
	 * @return {Any} 					键名取回的值
	 */
	get (key) {
		return sessionStorage.getItem(key)
	}
}