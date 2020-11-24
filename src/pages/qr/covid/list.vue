<template>
	<q-page>
		<div class="q-pa-sm">
			<q-card>
				<q-pull-to-refresh @refresh="getList">
					<q-table
						class="my-sticky-header-table"
						flat
						title="Case Lists"
						bordered
						:loading="loading"
						:columns="headers"
						:data="list"
						dense
						row-key="id"
						:filter="search"
						:pagination.sync="pagination"
					>
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

						<template v-slot:body-cell-refNo="props">
							<q-td :props="props">
								<q-badge
									:color="
										props.row.finalRemarks === 'RECOVERED'
											? 'green'
											: props.row.finalRemarks === 'POSITIVE'
											? 'blue'
											: 'red'
									"
								>
									<q-tooltip content-class="bg-indigo" :offset="[10, 10]">{{
										props.row.finalRemarks
									}}</q-tooltip>
									{{ props.row.refNo }}
								</q-badge>
							</q-td>
						</template>
						<!-- <template v-slot:body-cell-finalRemarks="props">
							<q-td :props="props">
								<q-badge
									:color="props.row.finalRemarks === 'RECOVERED'?'green':props.row.finalRemarks === 'POSITIVE' ? 'blue':  'red'"
								>{{props.row.finalRemarks }}</q-badge>
							</q-td>
						</template>-->
						<!-- <template v-slot:body-cell-occupation="props">
							<q-td :props="props">
								<div class="my-table-details">{{props.row.occupation}}</div>
								<div class="my-table-details">{{props.row.workPlace }}</div>
							</q-td>
						</template>-->

						<!-- <template v-slot:body-cell-barangay="props">
							<q-td :props="props">
								<div>{{props.row.barangay}}</div>
								<div class="my-table-details">{{ props.row.purok }}</div>
							</q-td>
						</template>-->

						<template v-slot:body-cell-actions="props">
							<q-td :props="props">
								<info
									@edit="edit(props.row)"
									@cancel="cancel(props.row)"
									:showCancel="false"
								>
									<q-item
										clickable
										v-ripple
										v-close-popup
										@click="ContactTracing(props.row)"
									>
										<q-item-section avatar>
											<q-icon color="secondary" name="scatter_plot" />
										</q-item-section>
										<q-item-section>Contact Tracing</q-item-section>
									</q-item>
									<q-item
										clickable
										v-ripple
										v-close-popup
										@click="statusUpdate(props.row)"
									>
										<q-item-section avatar>
											<q-icon color="secondary" name="storage" />
										</q-item-section>
										<q-item-section>Update Status</q-item-section>
									</q-item>
								</info>
							</q-td>
						</template>
					</q-table>
				</q-pull-to-refresh>
			</q-card>
		</div>
		<dlg v-model="dlgfilter" :showCommand="false" title="Filter">
			<filterx @data="filtered" />
		</dlg>
		<dlg
			v-model="dlgStatus"
			:title="title"
			@save="OnupdateStatus"
			@close="getList"
		>
			<update ref="update" :form="selected" />
		</dlg>
		<dlg v-model="dlgTracing" :title="title" :showCommand="false">
			<tracing />
		</dlg>
		<xmenus @add="goHome" @filter="dlgfilter = true">
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
		</xmenus>
	</q-page>
</template>
<script>
import Resource from "@/api/resource";
import xmenus from "#/menu";
import EventBus from "./events";
import filterx from "#/filter";
import dlg from "#/dlg";
import info from "#/Information";
import update from "./update";
import tracing from "./tracing";
import { exportFile } from "quasar";
function wrapCsvValue(val, formatFn) {
	let formatted = formatFn !== void 0 ? formatFn(val) : val;
	formatted =
		formatted === void 0 || formatted === null ? "" : String(formatted);
	formatted = formatted.split('"').join('""');
	return `"${formatted}"`;
}
export default {
	name: "list",
	components: { xmenus, filterx, dlg, info, update, tracing },
	props: {
		datax: Object,
	},
	data() {
		return {
			dlgTracing: false,
			selected: [],
			title: "",
			dlgStatus: false,
			allowadd: false,
			dlgfilter: false,
			fab2: null,
			search: null,
			dlgDetails: false,
			loading: false,
			headers: [
				{
					name: "actions",
					label: "ACTIONS",
					field: "actions",
					align: "center",
					width: "80px",
				},
				{
					name: "refNo",
					label: "PATIENT CODE NO.",
					field: "refNo",
					align: "left",
				},
				{
					name: "lastName",
					label: "LAST NAME ",
					field: "lastName",
					align: "left",
				},
				{
					name: "firstName",
					label: "FIRST NAME ",
					field: "firstName",
					align: "left",
				},
				{
					name: "middleName",
					label: "MIDDLE NAME ",
					field: "middleName",
					align: "left",
				},
				{ name: "age", label: "AGE", field: "age", align: "left" },
				{ name: "sex", label: "SEX", field: "sex", align: "left" },
				{
					name: "occupation",
					label: "OCCUPATION",
					field: "occupation",
					align: "left",
				},
				{
					name: "workPlace",
					label: "WORKPLACE NAME",
					field: "workPlace",
					align: "left",
				},
				{
					name: "nationality",
					label: "NATIONALITY",
					field: "nationality",
					align: "left",
				},
				{
					name: "civilStatus",
					label: "CIVIL STATUS ",
					field: "civilStatus",
					align: "left",
				},
				{
					name: "region",
					label: "REGION",
					field: "region",
					align: "left",
				},
				{
					name: "province",
					label: "PROVINCE",
					field: "province",
					align: "left",
				},
				{
					name: "purok",
					label: "PUROK",
					field: "purok",
					align: "left",
				},
				{
					name: "barangay",
					label: "BARANGAY",
					field: "barangay",
					align: "left",
				},
				{
					label: "DATE OF SWAB/COLLECTED",
					field: "DATE OF SWAB",
					align: "left",
				},
				{
					label: "DATE OF RESULT",
					field: "DATE OF RESULT",
					align: "left",
				},
				{
					label: "HEALTH STATUS",
					field: "dailyHealthStatus",
					align: "left",
				},
				{
					label: "CATEGORY",
					field: "ASYMPT_type",
					align: "left",
				},
				{
					label: "SYMTOMS",
					field: "symtom",
					align: "left",
					width: "150px",
				},
				{
					label: "COMORBIDITY",
					field: "comorbidity",
					align: "left",
					width: "150px",
				},
				{
					name: "finalRemarks",
					label: "FINAL REMARK ",
					field: "finalRemarks",
					align: "left",
				},
				{
					name: "date",
					label: "DATE",
					field: "date",
					align: "left",
				},
			],
			list: [],
			dtls: [],
			idx: 0,
			filter: {
				from: this.$moment(new Date()).format("YYYY-MM-01"),
				to: this.$moment(new Date()).endOf("month").format("YYYY-MM-DD"),
			},
			dtlHeader: [
				{ text: "Description", value: "description" },
				{ text: "Qty", value: "item_qty" },
				{ text: "Price", value: "price" },
				{ text: "Total", value: "Total" },
			],
			dtlItem: [],
			dtltitle: null,
			pagination: {
				page: 1,
				rowsPerPage: 15, // 0 means all rows
			},
		};
	},
	methods: {
		goHome() {
			EventBus.$emit("entry");
			EventBus.$emit("add");
		},
		goMenu() {
			EventBus.$emit("menu");
		},
		filtered(par) {
			this.dlgfilter = false;
			this.filter.from = par.from;
			this.filter.to = par.to;
			this.getList();
		},
		async getList(done) {
			try {
				this.loading = true;
				const datax = new Resource("Covid/list");
				const { data } = await datax.list(this.filter);
				this.list = data;
				this.loading = false;
				done();
			} catch (error) {
				this.loading = false;
			}
		},
		async edit(item) {
			try {
				this.loading = true;
				const datax = new Resource("Covid/edit");
				const { data } = await datax.get(item.id);
				EventBus.$emit("entry");
				EventBus.$emit("edit", data);
				this.loading = false;
			} catch (error) {
				this.loading = false;
			}
		},
		statusUpdate(item) {
			this.selected = item;
			this.title = item.refNo;
			this.dlgStatus = true;
		},
		async OnupdateStatus(item) {
			this.$q.loading.show();
			const datax = this.$refs.update.form;
			const par = { main: datax };
			const { data } = await new Resource("Covid/update").store(par);
			this.getList();
			this.$q.notify(data.Message);
			this.$q.loading.hide();
			this.dlgStatus = false;
		},
		async view(item) {
			try {
				this.loading = true;
				EventBus.$emit("entry");
				EventBus.$emit("view", item);
				this.loading = false;
			} catch (error) {
				this.loading = false;
			}
		},
		async ContactTracing(item) {
			this.title = item.refNo;
			this.dlgTracing = true;
		},
		async exportTableLeader() {
			const content = [this.headers.map((col) => wrapCsvValue(col.label))]
				.concat(
					this.list.map((row) =>
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

			const status = exportFile("Form Responses 1.csv", content, "text/csv");

			if (status !== true) {
				this.$q.notify({
					message: "Browser denied file download...",
					color: "negative",
					icon: "warning",
				});
			}
		},
	},
	mounted() {
		this.getList();
		EventBus.$on("list", () => {
			this.getList();
		});
	},
};
</script>
<style  scoped>
.my-table-details {
	font-size: 0.85em;
	font-style: italic;
	max-width: 200px;
	white-space: normal;
	color: #555;
	margin-top: 4px;
}
</style>