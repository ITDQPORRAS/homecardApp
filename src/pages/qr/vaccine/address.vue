<template>
	<div class="row q-col-gutter-md">
		<div class="col-12 col-md-3">
			<q-select
				dense
				clearable
				:popup-content-style="{ height: '250px' }"
				:options-dense="true"
				v-model="v_province"
				:options="province"
				option-value="id"
				option-label="name"
				label="Province *"
				input-debounce="0"
				@filter="filterProvince"
				ref="province"
				stack-label
				use-input
				lazy-rules
				:rules="[(val) => (val !== null && val !== '') || 'Required']"
			/>
		</div>
		<div class="col-12 col-md-3">
			<q-select
				dense
				clearable
				:popup-content-style="{ height: '250px' }"
				:options-dense="true"
				v-model="v_city"
				:options="city"
				option-value="id"
				option-label="name"
				label="City *"
				use-input
				@filter="filterCity"
				lazy-rules
				:rules="[(val) => (val !== null && val !== '') || 'Field is required']"
			/>
		</div>
		<div class="col-12 col-md-3">
			<q-select
				dense
				clearable
				:popup-content-style="{ height: '250px' }"
				:options-dense="true"
				v-model="v_barangay"
				:options="barangay"
				option-value="id"
				option-label="name"
				label="Barangay "
				use-input
				@filter="filterBarangay"
			/>
		</div>
		<div class="col-12 col-md-3">
			<q-input
				clearable
				v-model="profile.purok"
				type="text"
				dense
				label="purok"
				lazy-rules
			/>
		</div>
	</div>
</template>
<script>
import Resource from "src/api/resource";
export default {
	props: {
		datax: Object,
	},
	data() {
		return {
			v_barangay: [],
			v_province: [],
			v_city: [],
			barangay: [],
			barangayData: [],
			province: [],
			provinceData: [],
			city: [],
			cityData: [],
			profile: {
				provinceId: "0722",
				provinceName: "CEBU",
				cityId: "072234",
				cityName: "CITY OF NAGA",
				barangayId: null,
				barangay: null,
				purok: null,
			},
		};
	},
	mounted() {
		this.getProvince();
		this.v_city = {
			id: "072234",
			name: "CITY OF NAGA",
		};
	},
	methods: {
		validateFields() {
			this.$refs.province.validate();
		},
		selectValidate(val) {
			if (val === null) {
				return "You must make a selection!";
			}
		},
		filterProvince(val, update) {
			if (val === "") {
				update(() => {
					this.province = this.provinceData;
				});
				return;
			}
			update(() => {
				const needle = val.toLowerCase();
				this.province = this.provinceData.filter(
					(v) => v.name.toLowerCase().indexOf(needle) > -1
				);
			});
		},
		filterCity(val, update) {
			if (val === "") {
				update(() => {
					this.city = this.cityData;
				});
				return;
			}
			update(() => {
				const needle = val.toLowerCase();
				this.city = this.cityData.filter(
					(v) => v.name.toLowerCase().indexOf(needle) > -1
				);
			});
		},
		filterBarangay(val, update) {
			if (val === "") {
				update(() => {
					this.barangay = this.barangayData;
				});
				return;
			}
			update(() => {
				const needle = val.toLowerCase();
				this.barangay = this.barangayData.filter(
					(v) => v.name.toLowerCase().indexOf(needle) > -1
				);
			});
		},
		async getProvince() {
			const { data } = await new Resource().getProvince();
			this.provinceData = data;
			this.v_province = { idx: "0722", name: "CEBU" };
		},
		async getBarangay(idx) {
			const { data } = await new Resource().getBarangay(idx);
			this.barangayData = data;
		},
		async getCity(idx) {
			const { data } = await new Resource().getCity(idx);
			this.cityData = data;
		},
	},
	watch: {
		v_city(n) {
			this.profile.cityId = n.id;
			this.profile.cityName = n.name;
			this.getBarangay(this.profile.cityId);
			immediate: true;
		},
		v_barangay(n) {
			this.profile.barangayId = n.id;
			this.profile.barangay = n.name;
			immediate: true;
		},
		v_province(n) {
			this.profile.provinceId = n.idx;
			this.profile.provinceName = n.name;
			this.getCity(this.profile.provinceId);
			immediate: true;
		},
		datax: {
			handler(val) {
				this.profile.purok = val.rep_address;
				this.profile.barangayId = val.rep_brgy;
				this.profile.barangay = val.brgy_name;
				this.v_barangay = {
					id: val.rep_brgy,
					name: val.brgy_name,
				};
				this.$emit("selected", this.profile);
			},
			deep: true,
		},
		profile: {
			handler(val) {
				this.$emit("selected", val);
			},
			deep: true,
		},
	},
};
</script>
