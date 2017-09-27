<template lang="jade">
table(cellpadding='0',cellspacing='0')
	//- top
	tr
		td#top(colspan='3')
			#logo 和
			ul#menu
				li: a(href='#')
						i.icon &#xe68d;
						span he_it@qq.com
	//- menu
	tr
		//- big
		td#big
			ul
				li: a(href='#').on: i.icon &#xe6e0;

		//- small
		td#small(v-show='this.tab==2')
			h3.on 系统管理
			ul.on
				li: a(href='/xiongan/home/area.html',target='iframe') 区域管理
				li: a(href='/xiongan/home/swiper.html',target='iframe') 轮播图管理
			h3 岗位管理
			ul
				li: a(href='/xiongan/examine/job.html?examine=1',target='iframe') 岗位列表
				li: a(href='/xiongan/examine/job.html?examine=0',target='iframe') 待审核列表
				li: a(href='/xiongan/examine/job.html?examine=2',target='iframe') 审核失败列表
		td#content: iframe#iframe(frameborder='0',name='iframe',style='width:100%; height:800px;',src='/xiongan/login.html')
</template>

<script>
export default {
	data () {
		return {
			tab:null
		}
	},
	mounted () {
		// 自动设置iframe高度
		let iframe = this.$dom.id('iframe')
		window.addEventListener('resize', () => {
			this.iframe_resize()
		})
		iframe.addEventListener('load', () => {
			this.iframe_resize()
		})

		// 首先获取small，后面两个方法都会用到
		let small = this.$dom.id('small')

		// h3点击事件
		let h3 = this.$dom.tag('h3')
		let ul = small.getElementsByTagName('ul')
		for (let h of h3) {
			h.addEventListener('click', () => {
				// 使同级元素与下级UL取消被点击状态
				for (let hh of h3) {
					hh.className = ''
				}
				for (let uu of ul) {
					uu.className = ''
				}
				// 将此次点击对象设置被点击状态
				h.className = 'on'
				h.nextSibling.className = 'on'
			})
		}

		// 小菜单点击事件
		let link = small.getElementsByTagName('a')
		for (let l of link) {
			l.addEventListener('click', function () {
				// 将同级元素取消被点击状态
				for (let ll of link) {
					ll.className = ''
				}
				// 将此次点击对象设置被点击状态
				this.className = 'on'
			})
		}

		// 登录事件
    this.tab=sessionStorage.getItem("tab")
		setInterval(
			function(){
				if(sessionStorage.getItem("tab")==1){
					window.location.reload()
					sessionStorage.setItem("tab", 2)
				}
			},1000
		)
	},
	methods: {
		iframe_resize () {
			let iframe = this.$dom.id('iframe')
			let height = document.body.clientHeight - iframe.offsetTop - 48
			iframe.style.height = height + 'px'
		}
	}
}
</script>

<style lang="less">
@import "../../plugin/style/mixin.less";
body { margin:0; height:100%; }
table { .h(100%); .w(100%); }
td { vertical-align: top; }
</style>