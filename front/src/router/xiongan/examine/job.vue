<template lang="jade">
div
	h-loader-full(url='loader',:setdata='false')
		h-data-lister(data='list')
			m-title(icon='add',name='职位管理>职位列表')
				input(placeholder='职位名称',v-model='p.name')
				button(@click='go(p)') 过滤
			table.list
				ml-header(data='序号:5,公司名称:10,职位名称:10,是否为热门搜索:8,地区:5,详细地址,发布时间,操作')
				tr(v-for='(v, i) in list')
					td {{ v.id }}
					td {{v.cname}}
					td {{v.name}}
					td: input(type='checkbox',v-model='v.ishot')
					td {{v.area}}
					td {{v.address}}
					td {{new Date(v.issue_time*1000).format('yyyy-MM-dd hh:mm:ss')}}
					td
						a(href='javascript:void(0)',class='update',:data-index='i',v-show='examine==1') 更新
						a(:href="'detail.html?id='+ v.id") 查看详情
		.command
			.page
				button(v-show='page>1', @click="pagego('last')") 上一页
				button {{page}}
				button(@click="pagego('next')") 下一页
</template>

<script>
export default {
	data () {
		return {
			loader:{
				list: 'job/list/?examine=' + this.$query.get('examine'),
			},
			list: [],
			examine:this.$query.get('examine',0),
			p:{
				name:''
			},
			page: 1,
			url:{
				update:'hot/job',
			},
		}
	},
	methods: {
		loadAfter (res) {
			this.list = res.list
		},
		go (p) {
			this.$ajax.get('job/list/?examine=' + this.$query.get('examine') +'&name=' + this.p.name, (res) => {
				this.list = res.data
				this.page = 1
			}, (res) => {
				this.error(res.message)
			})
		},
		// 分页
    pagego (type) {
      this.page = type == 'last' ? this.page - 1 : this.page + 1
      this.$ajax.get('job/list/?examine=' + this.$query.get('examine') +'&name=' + this.p.name+ '&page=' + this.page, (res) => {
        this.list = res.data
      }, (res) => {
        this.error(res.message)
      })
    }
	}
}

</script>
<style lang="less" scoped>
@import "../../../plugin/style/mixin";
#mymap{ .bsol(#f0f0f0, 2); }
	div { overflow: visible;  }
	input{ .mr(10); border-radius: 5px;outline:none}
	button{ .fr;}
</style>
