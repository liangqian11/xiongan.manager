<template lang="jade">
div
  h-data-adder(url='live/add')
    m-title(icon="add",name='添加直播')
    table.single
      mf-row(name='标题：'): input(type='text',v-model='data.name')
      mf-row(name='直播链接：'): input(type='text',v-model='data.href')
      mf-row(name='直播图片：'): mf-upload(uploadid='img', amount='1', project='xiongan', category='live', @upload_data='text', :data='data.img')
      mf-row(name='开始时间：'): input(type='datetime-local',v-model='data.time')
      mf-row(name='')
        button(id='button') 确认添加
</template>

<script>
export default {
	data () {
		return {
			data:{
        name:'',
        href:'',
        img:[],
        time:'',
        status:0
      },
      loader:{

      }
		}
	},
	mounted () {
	},
	methods: {
    text(data){
			this.data.img = data
		},
    addAfter (res) {
			this.$msg.success(res.manager)
      setTimeout('window.location.reload()',1500)
		},
	}
}
</script>

<style lang="less">
@import "../../plugin/style/mixin.less";

</style>