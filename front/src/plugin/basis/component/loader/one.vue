<template lang="jade">
h-widget-loader(:status='status')
  slot
</template>

<script>
export default {
  //-------------------------------------------------------------------------- Props
  props: {
    url: {
      type: String,
      required: true
    },
    data: {
      type: String,
      default: 'data'
    },
    setdata: {
      type: Boolean,
      default: true
    }
  },
  //-------------------------------------------------------------------------- Data
  data () {
    return {
      status: 'loading'
    }
  },
  //-------------------------------------------------------------------------- Mounted
  mounted () {
    this.load()
  },
  //------------------------------------------------------------------------- Watch
  watch: {
    url () {
      this.load()
    }
  },
  //-------------------------------------------------------------------------- Methods
  methods: {
    /**
     * 加载数据
     */ 
    async load () {
      let loadBefore = this.$parent['loadBefore'] ? this.$parent['loadBefore'] : this.$lifecycle.loadBefore
      let loadAfter = this.$parent['loadAfter'] ? this.$parent['loadAfter'] : this.$lifecycle.loadAfter
      let loadError = this.$parent['loadError'] ? this.$parent['loadError'] : this.$lifecycle.loadError
      if (loadBefore()) {
        try {
          this.status = 'loading'
          let res = await this.$ajax.load(this.url)
          if (this.setdata) {
            this.$parent[this.data] = res.data
          }
          loadAfter(res.data)
          this.status = 'success'
        } catch (res) {
          loadError(res)
          this.status = 'error'
          console.error('[hesq]:')
          console.error(res)
        }
      }
    }
  }
}
</script>