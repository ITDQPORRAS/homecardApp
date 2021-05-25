<template>
	<q-page>
		<div class="q-pa-sm">
			<q-card>
				<q-tabs
					v-model="tab"
					dense
					active-color="primary"
					indicator-color="primary"
					align="justify"
					narrow-indicator
					inline-label
				>
					<q-tab name="barangay" label="Barangay" />
					<q-tab name="list" label="Persons" />
				</q-tabs>
				<q-separator />
				<q-tab-panels v-model="tab" animated>
					<q-tab-panel name="barangay">
						<q-pull-to-refresh @refresh="refresh" icon="autorenew">
							<q-table
								class="my-sticky-header-table"
								flat
								bordered
								:loading="loading"
								:columns="headers"
								:data="barangay"
								dense
								:filter="search"
								:rows-per-page-options="[40, 80]"
								row-key="idx"
								@row-click="onRowClick"
								hide-top
							>
								<template v-slot:top-left>
									<q-btn
										color="primary"
										icon-right="archive"
										label="Export to csv"
										no-caps
										@click="exportTable"
									/>
								</template>
								<template v-slot:body-cell-actions="props">
									<q-td :props="props">
										<div class="col-auto">
											<q-btn
												@click="showName(props.row)"
												color="grey-7"
												size="sm"
												round
												flat
												icon="arrow_forward_ios"
											></q-btn>
										</div>
									</q-td>
								</template>
								<template v-slot:top-right>
									<q-input
										dense
										rounded
										debounce="500"
										style="width: 150px"
										v-model="search"
										placeholder="Search"
									>
										<template v-slot:append>
											<q-icon name="search" />
										</template>
									</q-input>
								</template>
								<template v-slot:bottom-row>
									<q-tr>
										<q-td class="text-subtitle2">
											<b>TOTAL</b>
										</q-td>
										<q-td class="text-right">
											<b>
												{{
													sumField("housecount")
														.toFixed(0)
														.toString()
														.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
												}}
											</b>
										</q-td>
										<q-td class="text-right">
											<b>
												{{
													sumField("withmembers")
														.toFixed(0)
														.toString()
														.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
												}}
											</b>
										</q-td>

										<q-td class="text-right"></q-td>
									</q-tr>
								</template>
								<template v-slot:bottom></template>
							</q-table>
						</q-pull-to-refresh>
					</q-tab-panel>

					<q-tab-panel name="list">
						<q-table
							class="my-sticky-header-table"
							flat
							:title="BarangayName"
							bordered
							:loading="loading"
							:columns="headersList"
							:data="listsName"
							dense
							:filter="searchName"
							:rows-per-page-options="[20, 40]"
							row-key="idx"
							@selection="onSelection"
							selection="multiple"
							:selected.sync="selected"
						>
							<template v-slot:top-left>
								<div class="text-subtitle2">{{ BarangayName }}</div>
							</template>
							<template v-slot:body-cell-actions="props">
								<q-td :props="props">
									<div class="col-auto">
										<q-btn color="grey-7" size="xs" round flat icon="more_vert">
											<q-menu cover auto-close>
												<q-list>
													<q-item clickable>
														<q-item-section @click="printCard(props.row)"
															>Print Card</q-item-section
														>
													</q-item>
													<q-item clickable>
														<q-item-section @click="viewmember(props.row)"
															>View Member</q-item-section
														>
													</q-item>
												</q-list>
											</q-menu>
										</q-btn>
									</div>
								</q-td>
							</template>
							<template v-slot:top-right>
								<q-input
									dense
									rounded
									debounce="500"
									style="width: 150px"
									v-model="searchName"
									placeholder="Search"
								>
									<template v-slot:append>
										<q-icon name="search" />
									</template>
								</q-input>
							</template>
						</q-table>
						<div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>
						<q-page-sticky position="bottom-left" :offset="[18, 18]">
							<q-btn
								v-show="showIndi"
								:loading="loading"
								push
								round
								icon="print"
								@click="printSelectedMultiple"
								class="text-white"
								color="teal"
							>
								<q-tooltip>Print Selected</q-tooltip>
							</q-btn>
						</q-page-sticky>
						<xmenu
							:loading="loading"
							showfilter
							v-show="!showIndi"
							:showAdd="true"
							showPrint
							@print="print"
							@filter="dlgfilter = true"
							@add="addNew"
						>
							<template v-slot>
								<q-fab-action
									label-class="bg-grey-3 text-grey-8"
									external-label
									color="orange"
									icon="history_edu"
									label="Export"
									label-position="top"
									@click="exportTableLeader"
								/>
							</template>
						</xmenu>
					</q-tab-panel>
				</q-tab-panels>
			</q-card>
			<div
				style="position: absolute; visibility: hidden"
				class="qrcode"
				ref="qrCodeUrl"
			></div>
		</div>

		<dlg v-model="dlgfilter" :showCommand="false" title="Filter">
			<filterx @data="showListHouse" :showDate="false">
				<template v-slot>
					<q-select
						v-model="purokName"
						:options="purok"
						option-value="purok"
						option-label="purok"
						label="Purok"
						stack-label
					/>
				</template>
			</filterx>
		</dlg>
		<dlg
			v-model="dlgMember"
			:showCommand="false"
			:full="true"
			:title="MemberTitle"
		>
			<member :datax="datax" @loaded="showListHouse" />
		</dlg>
	</q-page>
</template>
<script>
import { exportFile } from "quasar";
import Resource from "src/api/resource";
import { mapGetters } from "vuex";
import xmenu from "#/menu";
import filterx from "#/filter";
import dlg from "#/dlg";
import member from "./member";
import store from "src/store";
function wrapCsvValue(val, formatFn) {
	let formatted = formatFn !== void 0 ? formatFn(val) : val;
	formatted =
		formatted === void 0 || formatted === null ? "" : String(formatted);
	formatted = formatted.split('"').join('""');
	return `"${formatted}"`;
}
export default {
	components: {
		xmenu,
		filterx,
		dlg,
		member,
	},
	data() {
		return {
			reference: [],
			MemberTitle: null,
			datax: [],
			purok: [],
			purokName: { id: "%", purok: "All" },
			dlgfilter: false,
			dlgMember: false,
			// locations: "http://localhost:1111/",
			locations: "http://18.221.253.87/HomeCardBackend/public/",
			showIndi: false,
			selected: [],
			brgy_id: 0,
			tab: "barangay",
			search: "",
			searchName: "",
			loading: false,
			BarangayName: null,
			listsName: [],
			headers: [
				{ name: "name", label: "Barangay", field: "brgy_name", align: "left" },
				{
					name: "no",
					label: "No of Household",
					field: "housecount",
					align: "right",
					format: (val, row) =>
						`${val
							.toFixed(0)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
				},
				{
					name: "withmembers",
					label: "w/ Members",
					field: "withmembers",
					align: "right",
					format: (val, row) =>
						`${parseFloat(val)
							.toFixed(0)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
				},
				{
					name: "perentage",
					label: "Percentage",
					field: "perentage",
					align: "center",
					format: (val, row) =>
						`${parseFloat(val)
							.toFixed(2)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}%`,
				},
			],
			headersList: [
				{
					name: "HN",
					label: "HN",
					field: "client_guid",
					align: "left",
				},
				{
					name: "lastName",
					label: "Last Name",
					field: "lastName",
					align: "left",
				},

				{
					name: "firstName",
					label: "First Name",
					field: "firstName",
					align: "left",
				},
				{
					name: "middleName",
					label: "Middle Name",
					field: "middleName",
					align: "left",
				},
				{
					name: "suffix",
					label: "Suffix",
					field: "suffix",
					align: "left",
				},

				{
					name: "purok",
					label: "Purok Name",
					field: "rep_address",
					align: "left",
				},
				{
					name: "members",
					label: "Members",
					field: "members",
					align: "center",
				},
				{ name: "actions", label: "Action", field: "action", align: "center" },
			],
		};
	},
	methods: {
		exportTable() {
			const content = [this.headers.map((col) => wrapCsvValue(col.label))]
				.concat(
					this.barangay.map((row) =>
						this.headers
							.map((col) =>
								wrapCsvValue(
									typeof col.field === "function"
										? col.field(row)
										: row[col.field === void 0 ? col.name : col.field],
									col.format
								)
							)
							.join(",")
					)
				)
				.join("\r\n");

			const status = exportFile("Household.csv", content, "text/csv");

			if (status !== true) {
				this.$q.notify({
					message: "Browser denied file download...",
					color: "negative",
					icon: "warning",
				});
			}
		},
		exportTableLeader() {
			const content = [this.headersList.map((col) => wrapCsvValue(col.label))]
				.concat(
					this.listsName.map((row) =>
						this.headersList
							.map((col) =>
								wrapCsvValue(
									typeof col.field === "function"
										? col.field(row)
										: row[col.field === void 0 ? col.name : col.field],
									col.format
								)
							)
							.join(",")
					)
				)
				.join("\r\n");

			const status = exportFile(
				this.purokName.purok + ".csv",
				content,
				"text/csv"
			);

			if (status !== true) {
				this.$q.notify({
					message: "Browser denied file download...",
					color: "negative",
					icon: "warning",
				});
			}
		},
		async refresh(done) {
			await store.dispatch("global/getData");
			done();
		},
		async print() {
			try {
				this.loading = true;
				const dataR = new Resource("Reader/Print");
				const par = { main: null };
				const { data } = await dataR.get(this.brgy_id);
				if (data.status === "success") {
					this.loading = false;
					window.open(this.locations + "./prints.pdf");
				}
				this.loading = false;
			} catch (error) {
				this.loading = false;
				this.$message({ message: error, type: "error" });
			}
		},
		async addNew() {
			await this.getRef();
		},
		async getRef($id) {
			const datax = new Resource("Reader/getRef");
			const { data } = await datax.get(this.brgy_id);
			this.datax = data[0];
			this.datax.rep_id = 0;
			this.MemberTitle = `MEMBERS ` + this.datax.client_guid;
			this.dlgMember = true;
		},
		viewmember(item) {
			this.datax = item;
			this.MemberTitle = `MEMBERS ` + this.datax.client_guid;
			this.dlgMember = true;
		},
		printCard(item) {
			this.printSelected(item.client_guid);
		},
		getSelectedString() {
			if (this.selected.length > 0) {
				this.showIndi = true;
			} else {
				this.showIndi = false;
			}
		},

		onSelection({ rows, added, evt }) {
			if (rows.length === 0 || this.$refs.table === void 0) {
				return;
			}

			const row = rows[0];
			const filteredSortedRows = this.$refs.table.filteredSortedRows;
			const rowIndex = filteredSortedRows.indexOf(row);
			const lastIndex = this.lastIndex;

			this.lastIndex = rowIndex;
			document.getSelection().removeAllRanges();

			if (this.$q.platform.is.mobile === true) {
				evt = { ctrlKey: true };
			} else if (
				evt !== Object(evt) ||
				(evt.shiftKey !== true && evt.ctrlKey !== true)
			) {
				this.selected = added === true ? rows : [];

				return;
			}

			const operateSelection =
				added === true
					? (selRow) => {
							const selectedIndex = this.selected.indexOf(selRow);
							if (selectedIndex === -1) {
								this.selected = this.selected.concat(selRow);
							}
					  }
					: (selRow) => {
							const selectedIndex = this.selected.indexOf(selRow);
							if (selectedIndex > -1) {
								this.selected = this.selected
									.slice(0, selectedIndex)
									.concat(this.selected.slice(selectedIndex + 1));
							}
					  };
			if (lastIndex === null || evt.shiftKey !== true) {
				operateSelection(row);
				return;
			}
			const from = lastIndex < rowIndex ? lastIndex : rowIndex;
			const to = lastIndex < rowIndex ? rowIndex : lastIndex;
			for (let i = from; i <= to; i += 1) {
				operateSelection(filteredSortedRows[i]);
			}
		},
		sumField(key) {
			return this.barangay.reduce(
				(a, b) => parseFloat(a) + (parseFloat(+b[key]) || 0),
				0
			);
		},
		async printSelected($id) {
			try {
				this.loading = true;
				const dataR = new Resource("Reader/printSampleIndividual");
				const par = { main: null };
				const { data } = await dataR.get($id);
				if (data.status === "success") {
					this.loading = false;
					window.open(this.locations + "./prints.pdf");
				}
				this.loading = false;
			} catch (error) {
				this.loading = false;
				this.$message({ message: error, type: "error" });
			}
		},
		async printSelectedMultiple($id) {
			try {
				this.loading = true;
				const dataR = new Resource("Reader/PrintMultiple");
				const datay = this.selected.map((item) => Object.values(item)[6]);
				const par = { main: datay };
				const { data } = await dataR.list(par);
				if (data.status === "success") {
					this.loading = false;
					window.open(this.locations + "./prints.pdf");
				}
				this.loading = false;
			} catch (error) {
				this.loading = false;
				this.$message({ message: error, type: "error" });
			}
		},
		async showName(item) {
			this.brgy_id = item.id;
			this.tab = "list";
			this.BarangayName = item.brgy_name;
			this.getPurok(item);
			await this.showListHouse(item);
		},
		async showListHouse(item) {
			this.dlgfilter = false;
			this.loading = true;
			const datax = new Resource("Reader/LeaderPerBarangay");
			const filter = { brgyid: this.brgy_id, prkid: this.purokName.id };
			const { data } = await datax.list(filter);
			this.listsName = data;
			this.loading = false;
		},
		async getPurok(item) {
			this.purok = [];
			const datax = new Resource("Reader/getPurok");
			const { data } = await datax.get(item.id);
			this.purok.push({ purok: "All", id: "%" });
			for (var i = 0; i < data.length; i++) {
				this.purok.push(data[i]);
			}
		},
		toObject(arr) {
			var rv = {};
			for (var i = 0; i < arr.length; ++i) this.purok.push(arr[i]);
			return rv;
		},
		onRowClick(evt, row) {
			// this.$emit("selected", row);
			this.showName(row);
		},
	},
	watch: {
		selected: function (val, old) {
			// if (val.length < 5) {
			if (val.length > 0) {
				this.showIndi = true;
			} else {
				this.showIndi = false;
			}
			// } else {
			//   this.selected = old;
			//   this.$q.notify("Only 4 peson selected!");
			// }
		},
	},
	mounted() {},
	computed: {
		...mapGetters(["barangay"]),
	},
};
</script>
<style lang="stylus" scoped>
.q-tab-panel {
	padding: 0px;
}

.q-card__section--vert {
	padding: 2px;
}
</style>