<template>
	<div id="tabs" class="tab-container">
		<div class="content">
			<transition name="fade-transform" mode="out-in">
				<component :mapData="mapData" :is="component" />
			</transition>
		</div>
	</div>
</template>
<script>
import EventBus from "./_event";
import tabList from "./map";
import entry from "./tag";
import facility from "./facility";
export default {
	components: {
		tabList,
		entry,
		facility,
	},
	data() {
		return {
			activetab: 1,
			loading: true,
			listData: [],
			component: "tabList",
			mapData: [],
		};
	},
	mounted() {
		// this.component = 'tabList';
		EventBus.$on("entry", (data) => {
			this.mapData = data;
			this.component = "entry";
		});
		EventBus.$on("list", (data) => {
			this.component = "tabList";
		});
		EventBus.$on("facility", (data) => {
			this.mapData = data;
			this.component = "facility";
		});
	},
	methods: {
		process(item) {
			this.activetab = 2;
		},
	},
};
</script>
<style scoped>
.tab-container {
	margin: 10px;
}
</style>
