<template lang="jade">
div
  //- Loader And Lister
  h-loader-full(url='loader',:setdata='false')
    h-data-lister(data='list')
      //- Filter
      m-title(icon='add',name='区域管理')
      //- List
      table.list
        ml-header(data='ID:6,名称,操作:13')
        tr(v-for='(v, i) in list')
          td {{v.id}}
          td: input(type='text',v-model='v.name')
          td
            a(href='javascript:void(0)',class='update',:data-index='i') 更新
      .command
        button(id='update-all') 全部更新
  h-data-adder(url='add/area')
    m-title(icon='add',name='添加区域')
    table.single
      mf-row(name='名称'): input(type='text',v-model='data.name')
      mf-row(name='')
        button(id='button') 确认提交
</template>

<script>
export default {
	data () {
		return {
			loader:{
				list:'area/list'
			},
			url:{
        update:'edit/area',
			},
			list:[],
			data: {}
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