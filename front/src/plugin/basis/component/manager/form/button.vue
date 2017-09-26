<template lang="jade">
tr
	th
	td: button(:id='id') 确认提交
</template>

<script>
export default {
	props: {
		id: {
			type: String,
			default: 'button'
		}
	}
}
</script>