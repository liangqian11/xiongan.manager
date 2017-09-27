<template lang="jade">
div
  h-loader-full(url='loader')
    m-title(icon="add",name='添加直播')
    table.single
      mf-row(name='标题：'): input(type='text',v-model='add.name')
      mf-row(name='直播链接：'): input(type='text',v-model='add.href')
      mf-row(name='直播图片：'): mf-upload(uploadid='img', amount='1', project='xiongan', category='live', @upload_data='text', :data='add.img')
      mf-row(name='开始时间：'): input(type='datetime-local',v-model='add.time')
      mf-row(name='是否已结束：',v-if='add.status != 2'): input(type='checkbox',value='2',v-model='status')
      mf-row(name='是否已结束：',v-if='add.status == 2') 已结束
      mf-row(name='',v-if='add.status!=2')
        button(@click='edit') 确认修改
</template>

<script>
export default {
	data () {
		return {
      loader:{
        list:'live/detail/manager/' + this.$query.get('id')
      },
      list:{},
      add:{
        name:'',
        href:'',
        img:[],
        time:'',
        id:this.$query.get('id')
      },
      status:''
		}
	},
	mounted () {
	},
	methods: {
    text(data){
			this.add.img = data
		},
    loadAfter(res){
      this.list = res.list[0]
      this.add = this.list
      this.add.img = this.add.img.split('|')
      this.add.time = new Date(this.add.time * 1000).format("yyyy-MM-ddThh:mm")
      if(this.add.status==1){
        this.status = false
      }
    },
    edit(){
      this.add.status = this.status
      this.$ajax.put('live/edit/manager',this.add,(res)=>{
        this.$msg.success('编辑成功')
        setTimeout("window.location.href='/xiongan/live_list.html'",1500)
      },(err)=>{
        this.$msg.error(err)
      })
    }
	}
}
</script>

<style lang="less">
@import "../../plugin/style/mixin.less";

</style>