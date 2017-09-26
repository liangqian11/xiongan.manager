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
			h3.on 企业服务
			ul.on
				li: a(href='/platform/xiongan/article/list.html',target='iframe') 服务列表
				li: a(href='/platform/xiongan/article/add.html',target='iframe') 添加服务
				li: a(href='/platform/xiongan/article/addcat.html',target='iframe') 服务类别列表
				li: a(href='/platform/xiongan/article/swiper.html',target='iframe') 轮播图列表
			h3 企业报道
			ul
				li: a(href='/platform/xiongan/company/list.html',target='iframe') 报道列表
				li: a(href='/platform/xiongan/company/add.html',target='iframe') 添加报道
			h3 企业招聘
			ul
				li: a(href='/platform/xiongan/wanted/list.html',target='iframe') 招聘企业列表
				li: a(href='/platform/xiongan/wanted/add.html',target='iframe') 发布招聘企业
			h3 雄安文化
			ul
				li: a(href='/platform/xiongan/culture/list.html',target='iframe') 文化列表
				li: a(href='/platform/xiongan/culture/add.html',target='iframe') 发布文化
			h3 政策报道
			ul
				li: a(href='/platform/xiongan/policy/list.html',target='iframe') 政策列表
				li: a(href='/platform/xiongan/policy/add.html',target='iframe') 发布政策
		td#content: iframe#iframe(frameborder='0',name='iframe',style='width:100%; height:800px;',src='/platform/xiongan/login.html')
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