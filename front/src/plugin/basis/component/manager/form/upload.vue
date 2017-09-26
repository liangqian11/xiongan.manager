<template lang="jade">
div
	.upimg(v-for='(v, i) in data')
		img(:src="'http://image.mod.hesq.com.cn/'+ project +'/'+ category +'/' + v")
		a(href='#',@click='remove(i)') 删除
	.upload(@click='openfile')
		input.choosefile(:id='uploadid',type='file',:multiple='multiple',accept='image/*',@change='upload')
		i.icon &#xe623;
</template>
<script>
import _ from 'lodash'
export default {
	mounted () {
		this.multiple = this.amount > 1 ? true : false
	},
	data () {
		return {
			multiple: false
		}
	},
	props: {
		uploadid: {
			type: String,
			required: ''
		},
		amount: {
			type: String,
			required: '1'
		},
		project: {
			type: String,
			required: true
		},
		category: {
			type: String,
			default: ''
		},
		data: {
			type: Array,
			default: []
		},
	},
	methods: {
		openfile () {
			this.$dom.id(this.uploadid).click()
		},
		async upload () {
			try {
				// 上传图片返回的数组
				let res = await this.$upload.working(this.uploadid, this.project, this.category, 'img')
				let data = res.data

				// 遍历循环
				for (let item of data) {
					if (item.success) {

						// 如果不是多图上传，则清空原来的图片  many为多图上传   sole为单图上传
						if (this.amount == this.data.length){
							this.data.splice(0, 1)
						}

						// push
						this.data.push(item.url)
					}
				}
				this.$emit('upload_data', this.data)
			} catch (err) {
				throw err
			}
		},
		remove (i) {
			this.data.splice(i, 1)
			this.$emit('upload_data', this.data)
		}
	}
}
</script>

<style lang="less">
	.choosefile {display:none}
</style>