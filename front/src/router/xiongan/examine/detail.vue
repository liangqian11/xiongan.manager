<template lang="jade">
div
	h-loader-full(url='loader',:setdata='false')
	h-data-updater(url='edit/job')
		m-title(icon='add',name='职位管理>职位详情')
		table.single
			mf-row(name='岗位id'){{data.id}}
			mf-row(name='岗位名称',msg='必填'): input(type='text',v-model='data.name')
			mf-row(name='公司名称：') {{data.cname}}
			mf-row(name='岗位类型：') {{data.jtname}}
			mf-row(name='薪资水平：',msg='必填') 
				select(v-model='data.pay')
					option(v-for='v in pay',:value='v') {{v}}
			mf-row(name='工作区域：',msg='必填')
				select(v-model='data.area')
					option(v-for='v in area',:value='v.name') {{v.name}}
			mf-row(name='发布时间：',msg='必填') {{new Date(data.issue_time*1000).format('yyyy-MM-dd hh:mm:ss')}}
			mf-row(name='审核时间：',msg='必填') {{new Date(data.examine_time*1000).format('yyyy-MM-dd hh:mm:ss')}}
			mf-row(name='福利待遇：') 
				p {{data.benefit}}
				p.top 更改福利待遇：
				p
					span.be(v-for ='(v,i) in benefit',@click='check(i,v.checked)',:class="{'bg': v.checked==true}") {{v.name}}
			mf-row(name='学历要求：',msg='必填')
				select(v-model='data.education')
					option(v-for='v in education',:value='v'){{v}}
			mf-row(name='经验要求：',msg='必填')
				select(v-model='data.experience')
					option(v-for='v in experience',:value='v') {{v}}
			mf-row(name='工作地址：',msg='必填')
				input(type='text',v-model='data.address')
			mf-row(name='岗位职责：',msg='必填')
				textarea(v-model='data.statement',rows="5")
			mf-row(name='任职资格：',msg='必填')
				textarea(v-model='data.requirements',rows="5")
			mf-row(name='审核状态：',msg='必填') {{type[data.examine]}}
			mf-row(name='失败原因：',msg='如失败则需要填写',v-show='data.examine==0'): input(type='text',v-model='reason')
			mf-row(name='')
				input(type='button',value='审核成功',@click='examine(1)',v-show='data.examine==0')
				input(type='button',value='审核失败',@click='examine(2)',v-show='data.examine==0')
				button(id='button',v-show='data.examine==1') 确认提交
</template>
<script>
export default {
	data () {
		return {
			loader: {
				data:'job/detail/' + this.$query.get('id'),
				experience:'experience/list',
				pay:'pay/list',
				benefit:'benefit/list',
				education:'education/list',
				jobtype:'jobtype/list',
				area:'area/list'
			},
			data: {},
			reason:'',
			jtid:{
				bid:0,
				mid:0,
				sid:0
			},
			type:['待审核','审核成功','审核失败'],
			experience:[],
			pay:[],
			benefit:[],
			education:[],
			jobtype:[],
			area:[],
			big:[],
			middle:[],
			small:[]
		}
	},
	methods: {
		loadAfter(data){
			this.data = data.data
			this.experience = data.experience
			this.pay=data.pay
			this.benefit=data.benefit
			this.education = data.education
			this.jobtype = data.jobtype
			for(let v of this.jobtype){
        if(v.bid == 0){
          this.big.push(v)
        }
      }
			for(let n of this.benefit){
        for(let bene of this.data.benefit.split('|')){
          if(n.name == bene){
            n.checked = true
          }
        }
      }
			this.area = data.area
		},
		check(i,type){
      if(type){
        this.benefit[i].checked=false
      }else{
        this.benefit[i].checked=true
      }
    },
		updateBefore(){
			let a=''
      let b= ''
      for(let v of this.benefit){
        if(v.checked==true){
          a += v.name +'|'
          b = a.substring(0,a.length-1)
        }
      }
      this.data.benefit = b
			return true
		},
		examine(examine){
			this.$ajax.put('job/examine',{id:this.$query.get('id'),examine:examine,reason:this.reason},(res)=>{
				this.$msg.success('操作成功')
				window.location.href='job.html?examine=0'    
			},(res)=>{
				this.$msg.error(res.message)
			})	
		}
	},
}

</script>
<style lang="less" scoped>
@import "../../../plugin/style/mixin";
.be {
	 .mlr(5);.bsol(#f0f0f0);
}
.bg{
	.bk(#ee5)
}
.top{
	.c(red);
}

</style>