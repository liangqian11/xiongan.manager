<template lang="jade">
div
	table.single(v-show='this.tab==null')
		mf-row(name='账号')
			input(type='text',v-model='data.username')
		mf-row(name='密码')
			input(type='password',v-model='data.password')
		mf-row(name='')
			button(@click='check()') 登录
	.welcome(v-show='this.tab==1||this.tab==2') 欢迎登陆:祝您工作愉快
</template>
<script>
export default {
	data () {
		return {
      data:{},
      msg:{},
      tab:null
		}
	},
	methods: {
		check(data){
			this.$ajax.get('user/login/'+this.data.username+'/'+this.data.password,(res)=>{
				this.$msg.success('登录成功')
				this.tab=1
				this.msg=res.data[0]
				sessionStorage.setItem("tab", 1)
			},(res)=>{
				this.$msg.error('登录失败')
			})
		}
	},
	mounted () {
		this.tab=sessionStorage.getItem("tab")
	}
}
</script>
<style lang="less" scoped>
@import "../../plugin/style/mixin.less";
	.welcome{ .fs(60); .tc; .pt(20%); }
	.single { .mt(20%);}
</style>
