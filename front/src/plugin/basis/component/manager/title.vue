<template lang="jade">
#title
	.title
		i.icon 	&#xe60e;
		b 			{{ name }}
	.filter
		slot
</template>

<script>
export default {
	props: {
		icon: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		}
	}
}
</script>