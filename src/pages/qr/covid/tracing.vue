<template>
	<div class="q-pa-sm">
		<q-badge color="secondary"> Day/s: {{ standard }}</q-badge>
		<q-slider v-model="standard" :min="0" :max="10" color="green" />
	</div>
</template>
<script>
export default {
	data() {
		return {
			standard: 2,
		};
	},
};
</script>