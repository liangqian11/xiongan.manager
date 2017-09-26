<template lang="jade">
.loader
	.loader(v-if="status === 'loading'") 正在加载，请稍候...
	.loader(v-if="status === 'error'") 加载失败
	slot(v-if="status === 'success'")
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.loader {width:100%; height:100%}
</style>
