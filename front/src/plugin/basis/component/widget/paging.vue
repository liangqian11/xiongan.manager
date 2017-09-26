<template lang="jade">
.paging
  .paging-links
    a(href='javascript:void(0)', v-if='show.info') 共 {{total.items}} 条 {{total.pages}} 页  当前是第 {{page}} 页
    a(href='javascript:void(0)', v-if='show.home', @click='link(1)') {{conf.home.text}}
    a(href='javascript:void(0)', v-if='show.pre', @click='link(parseInt(page) - 1)') {{conf.pre.text}}
    a(href='javascript:void(0)', v-for='n in links', @click='link(n)') {{n}}
    a(href='javascript:void(0)', v-if='showNext()', @click='link(parseInt(page) + 1)') {{conf.next.text}}
    a(href='javascript:void(0)', v-if='showLast()', @click='link(total.pages)') {{conf.last.text}}
  .paging-select
    select#paging(v-if='show.select',v-model='page',@change='change')
      option(v-for='n in total.pages',:value='n') {{n}}
</template>

<script>
  export default {
    //------------------------------------------------------------------------ Props
    props: {
      total: {
        type: Object,
        required: true
      },
      config: {
        type: String,
        default: 'default'
      }
    },
    //------------------------------------------------------------------------ Data
    data () {
      return {
        /**
         * 实际使用的配置项，由this.$conf.paging[this.config]获得
         */
        conf: {},
        /**
         * 当前所在的页数
         */
        page: 1,
        /**
         * 需要显示的对象（选择性显示）
         */
        show: {},
        /**
         * 当前页应该出现的链接数字
         */
        links: [],

        l : []
      }
    },
    watch :{
      'page' : function (newValue,oldValue) {
        this.getLinks()
      }
    },
    //------------------------------------------------------------------------ Mounted
    mounted () {

      // 设置conf
      this.conf = this.$conf.paging[this.config]

      // 设置初始page
      this.page = this.$query.get('page') == '' ? 1 : parseInt(this.$query.get('page'))

      // 设置show
      this.show = {
        info : this.conf.info.enabled,
        home: this.conf.home.enabled && this.page != 1,
        pre: this.conf.pre.enabled && this.page != 1,
        next: this.conf.next.enabled ,
        last: this.conf.last.enabled ,
        select: this.conf.select.enabled
      }
      console.log(this.show.info)
      console.log('this.page:' + this.page)
      console.log('this.page != 1:' + this.page != 1)
      console.log('this.page != this.total.pages:' + this.page != this.total.pages)

      // 刷新页面links
      this.links = []
      let {start, end} = this.getStartEnd()
      for (let i = start, l = end; i <= l; i++) {
        this.links.push(i)
      }
    },
    //------------------------------------------------------------------------ Methods
    methods: {

      //设置show
      showNext (){
        return this.show.next && this.page != this.total.pages
      },
      showLast (){
        return this.show.last && this.page != this.total.pages
      },
      /**
       * 计算start与end的值
       */
      getStartEnd () {


        // 取total、conf、page的引用
        let t = this.total
        let c = this.conf
        let p = this.page

        // 初始start与end
        // 定义左右之间的距离、中间页数
        let start = 1
        let end = t.pages <= c.number.link ? t.pages : c.number.link
        let apart = Math.floor(c.number.link / 2)
        let split = apart + 1

        // 如果总页数 大于 需要显示的页数，并且，当前页数 大于 中间页数(即：排除掉初始的几页)
        // 如果是最后几页（即：总页数 - 当前页 小于 两侧距离）
        // 如果不是最后几页，则直接由当前页 - 前后距离页数

        if (t.pages > c.number.link && p > split) {
          if (t.pages - p < apart) {
            start = t.pages - c.number.link + 1
            end = t.pages
          } else {
            start = p - apart
            end = p + apart
          }
        }
        // 返回
        return {start, end}
      },
      //获取数组links
      getLinks (){

        let {start, end} = this.getStartEnd()
        for (let i = start, l = end; i <= l; i++) {
           this.l.push(i)
        }
        this.links = this.l
      },

      /**
       * 链接点击事件
       */
      link (n) {
        window.location.href = this.getlink() + 'page=' + n
      },
      /**
       * 下拉菜单选择事件
       */
      change () {
        let select = document.getElementById('paging')
        window.location.href = this.getlink() + 'page=' + select.value
      },
      /**
       * 获取跳转时的基础链接字符串（文件名 + 除page之外的所有参数）
       */
      getlink () {

        // 取本页地址
        let filename = this.$query.filename()

        // 取基本参数，并算出querystring
        let params = this.$query.getall()
        let querystring = ''
        for (let key in params) {
          if (key !== 'page') {
            querystring = querystring !== '' ? querystring + '&' : querystring
            querystring += key + '=' + params[key]
          }
        }

        // 连接参数，跳转
        let symbol = querystring === '' ? '?' : '&'

        // 重新设置querystring，加入?
        querystring = querystring !== '' ? '?' + querystring : querystring

        // 返回
        return filename + querystring + symbol
      }
    }
  }
</script>
