<template lang="jade">
#title
	.title
		i.icon 	{{ icons[icon] }}
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
	},
	data () {
		return {
			icons: {
				add: '&#xe60e;',
				update: '&#xe60e;',
				list: '&#xe60e;'
			}
		}
	}
}
</script>