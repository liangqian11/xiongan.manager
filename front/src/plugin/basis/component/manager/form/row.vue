---------------------------------------------------------------------------------------
<template lang="jade">
tr
	th {{ name }}
	td
		slot 
		em {{ msg }}
</template>
---------------------------------------------------------------------------------------
<script>
export default {
	props: {
		name: {
			type: String,
			required: true
		},
		msg: {
			type: String,
			default: ''
		}
	}
}
</script>