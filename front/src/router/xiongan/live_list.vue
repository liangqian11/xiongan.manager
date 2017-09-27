<template lang="jade">
div
  h-loader-full(url='loader',:setdata='false')
    h-data-lister(data='list')
      m-title(icon="add",name="直播列表")
        input(type='text',placeholder='直播标题',v-model='name')
        button(@click='filter(p)') 过滤
      table.list
        ml-header(data='序号,标题,图片,链接:20,开始时间,是否在首页显示:10,操作')
        tr(v-for='(n,i) in list')
          td {{i+1}}
          td {{n.name}}
          td: img.img(:src="'http://image.mod.hesq.com.cn/xiongan/live/'+ n.img")
          td {{n.href}}
          td {{new Date(n.time*1000).format('yyyy-MM-dd hh:mm:ss')}}
          td: input(type='checkbox',v-model='n.ishome')
          td
            a(href='javascript:void(0)',class='update',:data-index='i') 更新
            a(:href="'/xiongan/live_edit.html?id='+n.id") 编辑
            a(href='javascript:void(0)',class='remove',:data-index='i') 删除
      .command
        .page
          button(@click="go('last')",v-show='page>1') 上一页
          button {{page}}
          button(@click="go('next')") 下一页
</template>

<script>
export default{
	data () {
		return {
      page:1,
      loader:{ 
        list:'live/list/manager',
		  },
      url:{
        update:'live/uprow',
        remove:'live/delete/manager'
      },
      name:'',
      list:[],
      ishome:''
		}
	},
	methods:{
    loadAfter(res){
      this.list = res.list
    },
    go(type){
			this.page = type == 'last' ? this.page - 1 : this.page + 1
			this.$ajax.get('live/list/manager?page='+this.page,(res)=>{
				this.list = res.data
			},(res)=>{
        this.$msg.error(res.message)
			})
		},
    filter(p){
			this.$ajax.get('live/list/manager?name='+ this.name + '&page=' + this.page,(res)=>{
				this.list=res.data
			},(res)=>{
				this.$msg.error(res.message)
			})
		},
    addAfter (res) {
			this.$msg.success()
			window.location.reload()
		},
  }
}
</script>
<style>
.img{ width:100px; height:50px!important;}
</style>