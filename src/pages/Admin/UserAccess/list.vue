<template>
	<q-page>
		<div class="q-pa-sm">
			<q-card class="my-card q-pa-sm">
				<div class="row">
					<div class="col-12 col-md-12 q-pb-sm">
						<q-select
							bottom-slots
							option-value="id"
							option-label="profile_name"
							stack-label
							v-model="profile"
							:options="profileData"
							label="Profile"
							emit-value
							map-options
						>
							<template v-slot:after>
								<q-btn
									round
									dense
									color="primary"
									@click="addProfile"
									icon="add"
								/>
							</template>
						</q-select>
					</div>
				</div>
				<div class="row q-col-gutter-sm">
					<div class="col-12 col-md-6">
						<q-table
							class="my-sticky-header-table"
							flat
							bordered
							:columns="headersGroup"
							:data="listForm"
							dense
							:filter="group.title"
							:rows-per-page-options="[20, 30]"
							separator="vertical"
							virtual-scroll
							:virtual-scroll-item-size="48"
							row-key="id"
							:loading="loading"
						>
							<template v-slot:top-left>Form</template>
							<template v-slot:top-right>
								<q-btn flat round icon="fast_forward" @click="Add" />
							</template>
							<template v-slot:header-cell-title="props">
								<q-th :props="props">
									<q-input
										v-model="group.title"
										:label="props.col.label"
										type="text"
										dense
									></q-input>
								</q-th>
							</template>
							<template v-slot:header-cell-select="props">
								<q-th :props="props">
									<q-checkbox
										bottom-label
										label="All"
										size="xs"
										dense
										v-model="chkall"
									/>
								</q-th>
							</template>

							<template v-slot:body-cell-select="props">
								<q-td :props="props">
									<q-checkbox
										size="xs"
										dense
										v-model="props.row.Selected"
										true-value="1"
										false-value="0"
									/>
								</q-td>
							</template>
						</q-table>
					</div>
					<div class="col-12 col-md-6">
						<q-table
							class="my-sticky-header-table"
							flat
							title="Benificiaries"
							bordered
							:columns="headersMember"
							:data="selectedFilter"
							dense
							:filter="select.title"
							:rows-per-page-options="[20, 30]"
							separator="vertical"
							virtual-scroll
							:virtual-scroll-item-size="48"
							:loading="loading"
							row-key="id"
						>
							<template v-slot:top-left>
								<q-btn flat round icon="fast_rewind" @click="Remove" />
							</template>
							<template v-slot:header-cell-select="props">
								<q-th :props="props">
									<q-checkbox
										bottom-label
										label="All"
										size="xs"
										dense
										v-model="chkallSelected"
									/>
								</q-th>
							</template>
							<template v-slot:top-right>Access List</template>
							<template v-slot:header-cell-title="props">
								<q-th :props="props">
									<q-input
										v-model="select.title"
										:label="props.col.label"
										type="text"
										dense
									></q-input>
								</q-th>
							</template>
							<template v-slot:body-cell-select="props">
								<q-td :props="props">
									<q-checkbox
										size="xs"
										dense
										v-model="props.row.Selected"
										true-value="1"
										false-value="0"
									/>
								</q-td>
							</template>
						</q-table>
					</div>
					<div class="col-12">
						<command @save="save" labelSave="Save" />
					</div>
				</div>
			</q-card>
		</div>
		<q-dlg v-model="dlgProfile" title="Profile Setup" :showCommand="false">
			<profile @save="getProfile" />
		</q-dlg>
	</q-page>
</template>
<script>
import Resource from "@/api/resource";
import EventBus from "./events";
import profile from "./profile";
import command from "#/Command";
export default {
	name: "list",
	components: { command, profile },
	data() {
		return {
			dlgProfile: false,
			profile: "",
			profileData: [],
			group: {
				title: "",
			},
			select: {
				title: "",
			},
			chkall: false,
			chkallSelected: false,
			loading: false,
			headersGroup: [
				{
					name: "select",
					label: "...",
					field: "Selected",
					align: "left",
					width: "100",
				},
				{
					name: "title",
					label: "Form",
					field: "title",
					align: "left",
				},
			],
			headersMember: [
				{
					name: "select",
					label: "...",
					field: "Selected",
					align: "left",
					width: "100",
				},
				{
					name: "title",
					label: "Form",
					field: "title",
					align: "left",
				},
			],
			listForm: [],
			pagination: {
				page: 1,
				rowsPerPage: 15, // 0 means all rows
			},
			selected: [],
		};
	},
	methods: {
		addProfile() {
			this.dlgProfile = true;
		},
		Add() {
			this.grouplistFilter.forEach((element) => {
				if (element.Selected === "1") {
					this.selected.push(element);
				}
			});

			this.grouplistFilter.forEach((element) => {
				if (element.Selected === "1") {
					const index = this.listForm.indexOf(element);
					this.listForm.splice(index, 1);
				}
			});
		},
		Remove() {
			this.selectedFilter.forEach((element) => {
				if (element.Selected === "1") {
					this.listForm.push(element);
				}
			});
			this.selectedFilter.forEach((element) => {
				if (element.Selected === "1") {
					const index = this.selected.indexOf(element);
					this.selected.splice(index, 1);
				}
			});
			this.grouplistFilter.forEach((element) => {
				element.Selected = "0";
			});
		},
		async getList(done) {
			try {
				this.listForm = [];
				this.selected = [];
				this.loading = true;
				const datax = new Resource("Access/formList");
				const { data } = await datax.get(this.profile);

				// this.listForm = data;
				data.forEach((x) => {
					if (x.Selected === "0") {
						this.listForm.push(x);
					} else {
						this.selected.push(x);
					}
				});

				this.loading = false;
				done();
			} catch (error) {
				this.loading = false;
			}
		},
		async getProfile() {
			try {
				this.loading = true;
				const datax = new Resource("Access/formProfile");
				const { data } = await datax.list();
				this.profileData = data;
				this.loading = false;
				done();
			} catch (error) {
				this.loading = false;
			}
		},
		async save() {
			try {
				this.loading = true;
				const datax = new Resource("Access/storeProfile");
				let par = { profile: this.profile, access: this.selectedFilter };
				console.log(par);
				await datax.store(par).then(({ data }) => {
					this.loading = false;
					this.$q.notify(data.Message);
				});
			} catch (error) {
				this.loading = false;
			}
		},
	},
	watch: {
		profile() {
			this.getList();
		},
		chkall: function (val) {
			if (val === true) {
				this.grouplistFilter.forEach((element) => {
					element.Selected = "1";
					// alert(element.Selected);
				});
			} else {
				this.grouplistFilter.forEach((element) => {
					element.Selected = "0";
					// alert(element.Selected);
				});
			}
		},
		chkallSelected: function (val) {
			if (val === true) {
				this.selected.forEach((element) => {
					element.Selected = "1";
				});
			} else {
				this.selected.forEach((element) => {
					element.Selected = "0";
				});
			}
		},
	},
	mounted() {
		// this.getList();
		this.getProfile();
		EventBus.$on("list", () => {
			this.getList();
		});
	},
	computed: {
		grouplistFilter() {
			return this.listForm.filter((element) => {
				return element["title"]
					.toLowerCase()
					.includes(this.group.title.toString().toLowerCase());
			});
		},
		selectedFilter() {
			return this.selected.filter((element) => {
				return element["title"]
					.toLowerCase()
					.includes(this.select.title.toString().toLowerCase());
			});
			// console.log(this.selected);
		},
	},
};
</script>
<style scoped>
.column-width {
	min-width: 420px;
	width: 420px;
}
/* Unfortunately @apply cannot be setup in codesandbox, 
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.ghost-card {
	opacity: 0.5;
	background: #f7fafc;
	border: 1px solid #4299e1;
}
</style>
