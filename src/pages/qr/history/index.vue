<template>
	<q-page>
		<div class="q-pa-sm">
			<q-card>
				<q-pull-to-refresh @refresh="getList">
					<q-table
						class="my-sticky-header-table"
						flat
						title="History"
						bordered
						:loading="loading"
						:columns="headers"
						:data="lists"
						:dense="$q.screen.lt.md"
						:filter="search"
						:rows-per-page-options="[20,30]"
						row-key="idx"
					>
						<!-- <template v-slot:top-left>
              <div>Products</div>
						</template>-->
						<template v-slot:top-right>
							<q-input
								dense
								rounded
								debounce="500"
								style="width:150px"
								v-model="search"
								placeholder="Search"
							>
								<template v-slot:append>
									<q-icon name="search" />
								</template>
							</q-input>
						</template>
						<!-- <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <div class="col-auto">
                  <q-btn color="grey-7" size="xs" round flat icon="more_vert">
                    <q-menu cover auto-close>
                      <q-list>
                        <q-item clickable>
                          <q-item-section>Remove Card</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>Send Feedback</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>Share</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </q-td>
						</template>-->
					</q-table>
				</q-pull-to-refresh>
			</q-card>
		</div>
		<xmenu
			:loading="loading"
			showfilter
			:showAdd="false"
			:showPrint="false"
			@filter="dlgfilter = true"
		>
			<template v-slot>
				<q-fab-action
					label-class="bg-grey-3 text-grey-8"
					external-label
					color="orange"
					icon="history_edu"
					label="Export"
					label-position="top"
					@click="exportTable"
				/>
			</template>
		</xmenu>

		<dlg v-model="dlgfilter" :showCommand="false" title="Filter">
			<filterx @data="filters">
				<template v-slot>
					<div>
						<q-select
							v-model="filter.facility"
							:options="facility"
							option-value="id"
							option-label="facility_name"
							label="Facility"
							stack-label
							lazy-rules
							map-options
							emit-value
							:rules="[
            val => val !== null && val !== '' || 'Please select a Facility',
          ]"
						/>
					</div>
				</template>
			</filterx>
		</dlg>
	</q-page>
</template>
<script>
import Resource from "src/api/resource";
import dlg from "#/dlg";
import filterx from "#/filter";
import xmenu from "#/menu";
import { exportFile } from "quasar";
function wrapCsvValue(val, formatFn) {
	let formatted = formatFn !== void 0 ? formatFn(val) : val;
	formatted =
		formatted === void 0 || formatted === null ? "" : String(formatted);
	formatted = formatted.split('"').join('""');
	return `"${formatted}"`;
}
export default {
	components: { dlg, filterx, xmenu },
	name: "list",
	data() {
		return {
			facilityMain: null,
			facility: [],
			dlgfilter: false,
			mobile: this.$q.platform.is.mobile,
			dlgEntry: false,
			fab2: null,
			search: "",
			lists: [],
			loading: false,
			headers: [
				{
					name: "facility",
					label: "Facility",
					field: "facility",
					align: "left",
				},
				{
					name: "brgy_name",
					label: "Barangay",
					field: "brgy_name",
					align: "center",
				},
				{ label: "DateTime", field: "ts", align: "center" },
				{ label: "Last Name", field: "lastName", align: "center" },
				{ label: "First Name", field: "firstName", align: "center" },
			],
			filter: {
				from: this.$moment(new Date().toLocaleString()).format("YYYY-MM-DD"),
				to: this.$moment(new Date().toLocaleString()).format("YYYY-MM-DD"),
				facility: null,
			},
			facilityname: "",
			idx: 0,
		};
	},
	mounted() {
		this.getFacility();
	},
	methods: {
		exportTable() {
			const content = [this.headers.map((col) => wrapCsvValue(col.label))]
				.concat(
					this.lists.map((row) =>
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

			const status = exportFile(
				this.facilityname + "/" + this.filter.from + ".csv",
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
		filters(item) {
			this.filter.from = item.from;
			this.filter.to = item.to;
			this.getList();
		},
		async getList(done) {
			try {
				this.dlgfilter = false;
				this.loading = true;
				const datax = new Resource("Reader/history");
				const { data } = await datax.list(this.filter);
				this.loading = false;
				this.lists = data;
				done();
			} catch (error) {
				this.loading = false;
			}
		},
		async getFacility() {
			const { data } = await new Resource("facility").list();
			this.facility = data;
		},
	},
	watch: {
		"filter.facility"(val) {
			this.facilityname = this.facility.find((x) => x.id === val).facility_name;
		},
	},
};
</script>