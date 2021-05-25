<template>
	<q-page>
		<div class="q-pa-xs row">
			<div class="col-12 q-pa-xs">
				<q-table
					title="Population"
					:data="filterBarangay"
					:columns="columns"
					:pagination.sync="paginationMain"
					:loading="loading"
					onRequest
					row-key="Barangay"
					dense
					hide-bottom
				>
					<template v-slot:top-right>
						<q-input
							dense
							rounded
							debounce="500"
							style="width: 150px"
							v-model="filter"
							placeholder="Search"
						>
							<template v-slot:append>
								<q-icon name="search" />
							</template>
						</q-input>
					</template>

					<template v-slot:body-cell-Population="props">
						<q-td :props="props">
							<div>
								<q-btn
									color="primary"
									flat
									@click="noDetails(props.row, 'Population')"
									:label="props.value"
									size="md"
								/>
							</div>
						</q-td>
					</template>
					<template v-slot:body-cell-18down="props">
						<q-td :props="props">
							<div>
								<q-btn
									color="primary"
									flat
									@click="noDetails(props.row, '0-18')"
									:label="props.value"
									size="md"
								/>
							</div>
						</q-td>
					</template>
					<template v-slot:body-cell-mid="props">
						<q-td :props="props">
							<div>
								<q-btn
									color="primary"
									flat
									@click="noDetails(props.row, '19-60')"
									:label="props.value"
									size="md"
								/>
							</div>
						</q-td>
					</template>
					<template v-slot:body-cell-60up="props">
						<q-td :props="props">
							<div>
								<q-btn
									color="primary"
									flat
									@click="noDetails(props.row, '60 UP')"
									:label="props.value"
									size="md"
								/>
							</div>
						</q-td>
					</template>
					<template v-slot:body-cell-NOBIRTH="props">
						<q-td :props="props">
							<div>
								<q-btn
									color="primary"
									flat
									@click="noDetails(props.row, 'NO BIRTH')"
									:label="props.value"
									size="md"
								/>
							</div>
						</q-td>
					</template>

					<template v-slot:bottom-row>
						<q-tr>
							<q-td class="text-subtitle2">
								<b>TOTAL</b>
							</q-td>
							<q-td class="text-center">
								<q-btn
									color="negative"
									flat
									@click="noDetails(props.row, 'Population')"
									:label="
										sumField('Population')
											.toFixed(0)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									"
									size="md"
								>
								</q-btn>
							</q-td>
							<q-td class="text-center">
								<!-- <b>
									{{
										sumField("18down")
											.toFixed(0)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
									}}
								</b> -->

								<q-btn
									color="negative"
									flat
									@click="noDetails(props.row, '0-18')"
									:label="
										sumField('18down')
											.toFixed(0)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									"
									size="md"
								>
								</q-btn>
							</q-td>
							<q-td class="text-center">
								<!-- <b>
									{{
										sumField("mid")
											.toFixed(0)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
									}}
								</b> -->
								<q-btn
									color="negative"
									flat
									@click="noDetails(props.row, '19-60')"
									:label="
										sumField('mid')
											.toFixed(0)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									"
									size="md"
								>
								</q-btn>
							</q-td>
							<q-td class="text-center">
								<!-- <b>
									{{
										sumField("60up")
											.toFixed(0)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
									}}
								</b> -->
								<q-btn
									color="negative"
									flat
									@click="noDetails(props.row, '60 UP')"
									:label="
										sumField('60up')
											.toFixed(0)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									"
									size="md"
								>
								</q-btn>
							</q-td>
							<q-td class="text-center">
								<!-- <b>
									{{
										sumField("NOBIRTH")
											.toFixed(0)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
									}}
								</b> -->
								<q-btn
									color="negative"
									flat
									@click="noDetails(props.row, 'No BIRTH')"
									:label="
										sumField('NOBIRTH')
											.toFixed(0)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									"
									size="md"
								>
								</q-btn>
							</q-td>
						</q-tr>
					</template>
				</q-table>
			</div>
		</div>
		<dlg v-model="dlgDetails" :title="title" :showCommand="false">
			<q-table
				:data="dtlData"
				:columns="columnsDtl"
				:loading="loading"
				@request="onRequest"
				:rows-per-page-options="[15, 20, 30, 40]"
				row-key="name"
				dense
			>
				<template v-slot:top-right>
					<div class="text-h6">
						{{ selected.type }}
					</div>
				</template>

				<template v-slot:top-left>
					<q-btn
						color="primary"
						icon-right="archive"
						label="Export to csv"
						no-caps
						@click="exportTable"
					/>
				</template>
				<template v-slot:body-cell-lastName="props">
					<q-td :props="props"
						>{{ props.row.lastName }} {{ props.row.suffix }}</q-td
					>
				</template>
				<template v-slot:header-cell-client_guid="props">
					<q-th :props="props">
						<q-input
							v-model="listHeader.client_guid"
							:label="props.col.label"
							type="text"
							dense
						></q-input>
					</q-th>
				</template>
				<template v-slot:header-cell-Barangay="props">
					<q-th :props="props">
						<q-input
							v-model="listHeader.Barangay"
							:label="props.col.label"
							type="text"
							dense
						></q-input>
					</q-th>
				</template>
				<template v-slot:header-cell-rep_address="props">
					<q-th :props="props">
						<q-input
							v-model="listHeader.rep_address"
							:label="props.col.label"
							type="text"
							dense
						></q-input>
					</q-th>
				</template>
				<template v-slot:header-cell-firstName="props">
					<q-th :props="props">
						<q-input
							v-model="listHeader.firstName"
							:label="props.col.label"
							type="text"
							dense
						></q-input>
					</q-th>
				</template>
				<template v-slot:header-cell-middleName="props">
					<q-th :props="props">
						<q-input
							v-model="listHeader.middleName"
							:label="props.col.label"
							type="text"
							dense
						></q-input>
					</q-th>
				</template>
				<template v-slot:header-cell-lastName="props">
					<q-th :props="props">
						<q-input
							v-model="listHeader.lastName"
							:label="props.col.label"
							type="text"
							dense
						></q-input>
					</q-th>
				</template>
				<template v-slot:header-cell-age="props">
					<q-th :props="props">
						<q-input
							v-model="listHeader.age"
							:label="props.col.label"
							type="text"
							dense
						></q-input>
					</q-th>
				</template>
				<template v-slot:header-cell-member_type="props">
					<q-th :props="props">
						<q-input
							v-model="listHeader.member_type"
							:label="props.col.label"
							type="text"
							dense
						></q-input>
					</q-th>
				</template>
				<template v-slot:header-cell-groups="props">
					<q-th :props="props">
						<q-input
							v-model="listHeader.groups"
							:label="props.col.label"
							type="text"
							dense
						></q-input>
					</q-th>
				</template>
			</q-table>
		</dlg>
	</q-page>
</template>
<script>
import Resource from "src/api/resource";
import dlg from "#/dlg";
import { exportFile } from "quasar";
function wrapCsvValue(val, formatFn) {
	let formatted = formatFn !== void 0 ? formatFn(val) : val;
	formatted =
		formatted === void 0 || formatted === null ? "" : String(formatted);
	formatted = formatted.split('"').join('""');
	return `"${formatted}"`;
}
export default {
	components: { dlg },
	data() {
		return {
			dlgDetails: false,
			title: "Total Population",
			loading: false,
			pagination: {
				sortBy: "brgy_name",
				descending: false,
				page: 1,
				rowsPerPage: 20,
				rowsNumber: 20,
			},
			paginationMain: {
				sortBy: "Barangay",
				descending: false,
				page: 1,
				rowsPerPage: 0,
				rowsNumber: 0,
			},
			listHeader: {
				client_guid: "",
				Barangay: "",
				rep_address: "",
				firstName: "",
				middleName: "",
				lastName: "",
				age: "",
				member_type: "",
				groups: "",
			},
			columns: [
				{
					name: "Barangay",
					label: "Barangay",
					field: "Barangay",
					align: "left",
					sortable: true,
				},
				{
					name: "Population",
					label: "Population",
					field: "Population",
					align: "center",
					format: (val, row) =>
						`${parseFloat(val)
							.toFixed(0)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
				},
				{
					name: "18down",
					label: "0-18",
					field: "18down",
					align: "center",
					format: (val, row) =>
						`${parseFloat(val)
							.toFixed(0)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
				},
				{
					name: "mid",
					label: "19-60",
					field: "mid",
					align: "center",
					format: (val, row) =>
						`${parseFloat(val)
							.toFixed(0)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
				},
				{
					name: "60up",
					label: "60 Up",
					field: "60up",
					align: "center",
					format: (val, row) =>
						`${parseFloat(val)
							.toFixed(0)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
				},
				{
					name: "NOBIRTH",
					label: "NO BIRTH",
					field: "NOBIRTH",
					align: "center",
					format: (val, row) =>
						`${parseFloat(val)
							.toFixed(0)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
				},
			],
			datax: [],
			filter: "",
			brgyList: null,
			brgyPopulation: [],
			dtlList: [],
			dtlData: [],
			columnsDtl: [
				{
					name: "client_guid",
					label: "HH No.",
					field: "client_guid",
					align: "left",
					// sortable: true,
				},
				{
					name: "Barangay",
					label: "Barangay",
					field: "brgy_name",
					align: "left",
					// sortable: true,
				},
				{
					name: "rep_address",
					label: "Purok",
					field: "rep_address",
					align: "left",
					// sortable: true,
				},

				{
					name: "firstName",
					label: "First name",
					field: "firstName",
					align: "left",
					// sortable: true,
				},
				{
					name: "middleName",
					label: "Middle name",
					field: "middleName",
					align: "left",
					// sortable: true,
				},
				{
					name: "lastName",
					label: "last name",
					field: "lastName",
					align: "left",
					// sortable: true,
				},
				{
					name: "age",
					label: "Age",
					field: "age",
					align: "left",
					// sortable: true,
				},
				{
					name: "member_type",
					label: "Position",
					field: "member_type",
					align: "left",
					// sortable: true,
				},
				{
					name: "groups",
					label: "Groups",
					field: "groups",
					align: "left",
					// sortable: true,
				},
			],
			count: 0,
			countDown: 3,
			selected: null,
		};
	},
	methods: {
		exportTable() {
			const content = [this.columnsDtl.map((col) => wrapCsvValue(col.label))]
				.concat(
					this.dtlData.map((row) =>
						this.columnsDtl
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
				this.title + " " + this.selected.type + ".csv",
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
		countDownTimer() {
			if (this.countDown > 0) {
				setTimeout(() => {
					this.countDown -= 1;
					this.countDownTimer();
				}, 1000);
			}
		},
		async load_brgy() {
			this.loading = true;
			await new Resource("Dashboard/barangay").list().then(({ data }) => {
				this.brgyList = data;
				for (let index = 0; index < this.brgyList.length; ++index) {
					new Resource("Dashboard/barangayPopulation")
						.get(this.brgyList[index].id)
						.then(({ data }) => {
							this.brgyPopulation.push(data[0]);
						});
				}
			});
			this.loading = false;
		},
		sumField(key) {
			return this.filterBarangay.reduce(
				(a, b) => parseFloat(a) + (parseFloat(+b[key]) || 0),
				0
			);
		},
		noDetails(id, type) {
			this.title = id.Barangay;
			this.countDown = 0;
			const par = {
				pagination: this.pagination,
				filters: this.listHeader,
				brgyid: id.id,
				type: type,
			};
			this.selected = {
				brgyid: id.id,
				type: type,
			};
			this.onRequest(par);
			this.dlgDetails = true;
		},
		async onRequest(props) {
			if (this.countDown == 0) {
				this.loading = true;
				const { page, rowsPerPage, sortBy, descending } = props.pagination;
				const filter = this.listHeader;
				const type = props.type;
				const id = props.brgyid;
				// this.pagination.rowsNumber = await this.getRowsNumberCount(filter);
				// this.pagination.rowsNumber = this.count;
				const fetchCount =
					rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage;
				const startRow = (page - 1) * rowsPerPage;
				const returnedData = await this.fetchFromServer(
					startRow,
					fetchCount,
					filter,
					sortBy,
					descending,
					id,
					type
				);
				this.loading = false;
				this.dtlData = returnedData;
				this.pagination.page = page;
				this.pagination.rowsPerPage = rowsPerPage;
				this.pagination.sortBy = sortBy;
				this.pagination.descending = descending;
			}
		},
		async fetchFromServer(
			startRow,
			count,
			filter,
			sortBy,
			descending,
			id,
			type
		) {
			const par = {
				startRow: startRow,
				count: count,
				filter: filter,
				sortBy: sortBy,
				descending: descending,
				brgyid: id,
				type: type,
			};
			const { data } = await new Resource(
				"Dashboard/showPopulationListPerBrgy"
			).post(par);
			return data;
		},
	},
	watch: {
		filter(val) {
			return this.brgyPopulation.filter((x) => {
				x["Barangay"].toLowerCase().includes(val.toLowerCase());
			});
		},
		listHeader: {
			handler(val) {
				this.countDown = 3;
				this.countDownTimer();
			},
			deep: true,
		},
		countDown(val) {
			if (val == 0) {
				const par = {
					pagination: this.pagination,
					filters: this.listHeader,
					brgyid: this.selected.brgyid,
					type: this.selected.type,
				};
				this.onRequest(par);
			}
		},
	},
	mounted() {
		this.load_brgy();
	},
	computed: {
		filterBarangay() {
			return this.brgyPopulation
				.filter((x) => {
					return x.Barangay.toLowerCase().includes(this.filter.toLowerCase());
				})
				.sort(function (a, b) {
					var nameA = a.Barangay.toLowerCase(),
						nameB = b.Barangay.toLowerCase();
					if (nameA < nameB) return -1;
					if (nameA > nameB) return 1;
					return 0;
				});
		},
	},
};
</script>