//---------------------------------------------------------------------------- Package
import Vue from 'vue'
//---------------------------------------------------------------------------- Exports
export default {
	/**
	 * Promise: 上传的程序（参数与同上）
	 * @param {String} fileId 					上传框id
	 * @param {String} project 					项目名称
	 * @param {String} category 				类型名称
	 * @param {String} type 						上传的类型，包含'compressimg', 'img', 'zip', 'doc'
	 * @param {Number} max 							最大尺寸（单位为kb，1024即为1M）
	 * @param {Number} maxHeight 				图片压缩的最大高度
	 */
	working (fileId, project, category, type, max = 1024000, maxHeight = 500) {
		return new Promise(async (resolve, reject) => {
			try {
				// 获取文件数组
				let files = document.getElementById(fileId).files
				// console.log(files)

				// 声明FormData对象
				let form = new FormData()
				form.append('project', project)
				form.append('category', category)
				form.append('max', max)
				form.append('type', type)
				// console.log(form)

				// 遍历文件，追加到form对象上
				for (let i = 0, l = files.length; i < l; i++) {		
					// console.log(i)

					// 如果是压缩图片，则追加压缩以后的Base64字符串
					// 否则，追加正常文件
					if (type === 'compressimg') {
						let base64Data = await this._compressImg(files[i], maxHeight)
						form.append(`file_${i}`, base64Data)
						console.log(base64Data)
					} else {
						form.append(`file_${i}`, files[i])
					}
				}

				// 上传文件，注意上传接口只允许统一使用upload
				Vue.ajax.upload('upload', form, (res) => {
					resolve(res)
				}, (res) => {
					reject(res)
				})
			} catch (err) {
				reject(err)
			}
		})
	},

	/**
	 * 图片压缩方法
	 * @param  {File} 被上传的文件对象
	 * @return {DataURL} 被返回的数据
	 */
	_compressImg (file, maxHeight) {

		// 返回新的Promise
		return new Promise((resolve, reject) => {
			try {
				// reader读取数据
				let reader = new FileReader()
				reader.readAsDataURL(file)

				// reader读取完成时的回调
				reader.onload = function () {

					// 设置canvas并指定数据
		      var canvas = document.createElement('canvas')
		      var img = new Image()
		      img.src = this.result

		      // img初始完成
		      img.onload = function(){

		      	// 按最大高度等比缩放
		        if(img.height > maxHeight) { 
		          img.width *= maxHeight / img.height
		          img.height = maxHeight
		        }

		        // 设置上下文，并设置canvas的宽高
		        let ctx = canvas.getContext("2d")
		        ctx.clearRect(0, 0, canvas.width, canvas.height)
		        canvas.width = img.width
		        canvas.height = img.height
		        ctx.drawImage(img, 0, 0, img.width, img.height)

		        // 返回数据
		        resolve(canvas.toDataURL("image/jpeg"))
		      }
				}
			} catch (err) {
				reject(err)
			}
		})
	}	
}