<template lang="jade">
tr
	th {{ name }}
	td
		input(type='text',:valid='valid')
		em {{ msg }}
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			required: true
		},
		valid: {
			type: String,
			default: ''
		},
		msg: {
			type: String,
			default: ''
		}
	}
}
</script>