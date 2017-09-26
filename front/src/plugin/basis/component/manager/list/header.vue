<template lang="jade">
tr
	th(v-for='obj in headers',:style="'width:' + obj.width") {{ obj.name }}
</template>

<script>
import _ from 'lodash'
export default {
	props: {
		data: {
			type: String,
			required: true
		}
	},
	computed: {
		headers () {
			let result = []
			let objects = _.split(this.data, ',')
			for (let obj of objects) {
				let tmp = _.split(obj.trim(), ':')
				if (tmp.length == 1) {
					tmp[1] = 'auto'
				} else {
					tmp[1] = tmp[1] + '%'
				}
				let o = {
					name: tmp[0],
					width: tmp[1]
				}
				result.push(o)
			}
			return result
		}
	}
}
</script>