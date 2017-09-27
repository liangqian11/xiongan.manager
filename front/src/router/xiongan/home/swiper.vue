<template lang="jade">
div
  //- Loader And Lister
  h-loader-full(url='loader',:setdata='false')
    h-data-lister(data='list')
      //- Filter
      m-title(icon='add',name='服务轮播管理')
      //- List
      table.list
        ml-header(data='ID:6,图片,排序,操作:13')
        tr(v-for='(v, i) in list')
          td {{v.id}}
          td: img(:src="'http://image.mod.hesq.com.cn/xiongan/swiper/'+ v.url")
          td: input(type='text',v-model='v.sort')
          td
            a(href='javascript:void(0)',class='update',:data-index='i') 更新
            a(href='javascript:void(0)',class='remove',:data-index='i') 删除
      .command
        button(id='update-all') 全部更新
  h-data-adder(url='swiper/add')
    m-title(icon='add',name='添加轮播图')
    table.single
      mf-row(name='轮播图图片'): mf-upload(uploadid='img',amount='1',project='xiongan',category='swiper', :data='data.url', @upload_data='text')
      mf-row(name='排序'): input(type='text',v-model='data.sort')
      mf-row(name='')
        button(id='button') 确认提交
</template>

<script>
export default {
	data () {
		return {
			loader:{
				list:'swiper/list'
			},
			url:{
        update:'edit/swiper',
				remove:'swiper/remove'
			},
			list:[],
			data: {
        sort:0,
				img:[]
			}
		}
	},
	methods: {
		loadAfter (res) {
			this.list=res.list
		},
		addAfter (res) {
			this.$msg.success()
			window.location.reload()
		},
    updataAfter (res) {
			this.$msg.success()
			window.location.reload()
		},
		text(data){
			this.data.url = data
		}
	}
}
</script>
<style>
	img{width:80px;}
	.page{ float:right; }
		.page a{background: #4db3ff; color: #fff; padding:3px 10px; border-radius:4px; cursor:pointer;}
		.page b{margin:0 10px;}
</style>