<template>
	<div>
		<div class="text-caption">{{ datax.brgy_name }}</div>
		<p></p>
		<!-- <button>[ lat:{{ datax.lat }} - long:{{ datax.lng }} ]</button> -->
		<!-- <button @click="popupClicked">Learn more..</button> -->
	</div>
</template>
<script>
import Vue from "vue";

export default Vue.extend({
	props: {
		// feature: {
		//   required: true,
		//   type: Object,
		//   idx: Number,
		// },
		datax: Object,
	},
	methods: {
		popupClicked() {
			alert("Learn more clicked");
		},
	},
	created() {
		console.log(this.datax);
	},
});
</script>
