<template>
	<q-page>
		<div class="q-pa-xs">
			<div class="col-12 q-pa-xs">
				<q-card>
					<div class="row">
						<div class="col text-center">{{ title }}</div>
					</div>
					<div class="row">
						<div class="col-4 col-md-4">
							<q-card flat style="height: 180px">
								<div class="col-md-12 flex-center item-center q-pt-md">
									<div class="row text-center">
										<q-chip square size="15px" style="width: 100%">
											<q-avatar color="green" text-color="white">
												<countTo
													:startVal="0"
													:endVal="caseStatus[0]['ACTIVE'] * 1 || 0"
													:duration="10000"
												></countTo>
											</q-avatar>
											Active
										</q-chip>
									</div>
									<div class="row text-center">
										<q-chip square size="15px" style="width: 100%">
											<q-avatar color="warning" text-color="white">
												<countTo
													:startVal="0"
													:endVal="caseStatus[0]['RECOVERED'] * 1 || 0"
													:duration="10000"
												></countTo>
											</q-avatar>
											Recovered
										</q-chip>
									</div>
									<div class="row text-center">
										<q-chip square size="15px" style="width: 100%">
											<q-avatar color="negative" text-color="white">
												<countTo
													:startVal="0"
													:endVal="caseStatus[0]['DECEASED'] * 1 || 0"
													:duration="10000"
												></countTo>
											</q-avatar>
											Deceased
										</q-chip>
									</div>

									<div class="row text-center">
										<q-chip square size="15px" style="width: 100%">
											<q-avatar color="primary" text-color="white"
												><countTo
													:startVal="0"
													:endVal="caseStatus[0]['TOTAL'] * 1 || 0"
													:duration="10000"
												></countTo
											></q-avatar>
											Total Cases
										</q-chip>
									</div>
								</div>
							</q-card>
						</div>
						<div class="col-8 col-md-8">
							<q-card flat>
								<q-card-section>
									<apexchart
										:height="180"
										class="chart"
										:options="chart1.chartOptions"
										:series="chart1.series"
									></apexchart>
								</q-card-section>
							</q-card>
						</div>
					</div>
				</q-card>
			</div>
			<div class="col-12 q-pa-xs">
				<div class="row q-col-gutter-sm">
					<div class="col-12 col-md-4">
						<q-card>
							<q-card-section>
								<div class="row q-pa-sm q-col-gutter-md">
									<div class="col-6 text-center">
										<q-chip
											style="width: 100%"
											color="primary"
											text-color="white"
											icon="event"
										>
											<q-badge color="info" text-color="black" floating>
												<countTo
													:startVal="0"
													:endVal="gender[0]['MALE'] * 1 || 0"
													:duration="10000"
												></countTo>
											</q-badge>
											Male
										</q-chip>
									</div>
									<div class="col-6 text-center">
										<q-chip
											style="width: 100%"
											color="pink"
											text-color="white"
											icon="event"
										>
											<q-badge color="info" text-color="black" floating>
												<countTo
													:startVal="0"
													:endVal="gender[0]['FEMALE'] * 1 || 0"
													:duration="10000"
												></countTo>
											</q-badge>
											Female
										</q-chip>
									</div>
								</div>
								<q-separator />
								<div class="row q-pa-xs">
									<div class="col-12 text-center text-subtitle1">Age Group</div>
									<div class="col-6 text-center">
										<q-chip
											style="width: 90%"
											outline
											color="primary"
											text-color="white"
											icon="event"
										>
											<q-badge color="red" floating>
												<countTo
													:startVal="0"
													:endVal="age[0]['0-19'] * 1 || 0"
													:duration="10000"
												></countTo>
											</q-badge>
											Age 0-19
										</q-chip>
									</div>
									<div class="col-6 text-center">
										<q-chip
											style="width: 90%"
											outline
											color="accent"
											text-color="white"
											icon="event"
										>
											<q-badge color="red" floating>
												<countTo
													:startVal="0"
													:endVal="age[0]['20-19'] * 1 || 0"
													:duration="10000"
												></countTo>
											</q-badge>
											Age 20-39
										</q-chip>
									</div>
								</div>
								<div class="row">
									<div class="col-6 text-center">
										<q-chip
											style="width: 90%"
											outline
											color="positive"
											text-color="white"
											icon="event"
										>
											<q-badge color="red" floating>
												<countTo
													:startVal="0"
													:endVal="age[0]['40-59'] * 1 || 0"
													:duration="10000"
												></countTo>
											</q-badge>
											Age 40-59
										</q-chip>
									</div>
									<div class="col-6 text-center">
										<q-chip
											style="width: 90%"
											outline
											color="negative"
											text-color="white"
											icon="event"
										>
											<q-badge color="red" floating>
												<countTo
													:startVal="0"
													:endVal="age[0]['60+'] * 1 || 0"
													:duration="10000"
												></countTo>
											</q-badge>
											Age 60+
										</q-chip>
									</div>
								</div>
							</q-card-section>
						</q-card>
					</div>
					<div class="col-12 col-md-8">
						<q-card>
							<q-card-section>
								<div class="row q-col-gutter-xs">
									<div
										v-for="(item, x) in occupation"
										:key="x"
										class="col-6 col-md-3"
									>
										<q-card flat bordered class="col">
											<q-item>
												<q-item-section avatar>
													<q-avatar square>
														<img :src="item.img" />
													</q-avatar>
												</q-item-section>

												<q-item-section>
													<q-item-label class="text-h6">
														<countTo
															:startVal="0"
															:endVal="item.count * 1 || 0"
															:duration="10000"
														></countTo>
													</q-item-label>
												</q-item-section>
											</q-item>
											<q-separator />
											<q-card-section
												class="border-radius-inherit flex flex-center bg-grey-1"
											>
												<div class="myfont">
													{{ item.occupation }}
												</div>
											</q-card-section>
										</q-card>
									</div>
								</div>
							</q-card-section>
						</q-card>
					</div>
				</div>
			</div>
			<div class="col-12 q-pa-xs">
				<div class="row q-col-gutter-sm">
					<div class="col-12 col-md-4">
						<q-card>
							<q-card-section>
								<div class="row q-pa-sm q-col-gutter-md">
									<div class="col-6 text-center">
										<q-chip square style="width: 100%">
											<q-avatar>
												<img src="sym.PNG" />
											</q-avatar>
											SYMPTOMATIC
										</q-chip>
										<q-chip>
											<q-avatar color="green" text-color="white">
												<countTo
													:startVal="0"
													:endVal="symptoms[0].SYMPTOMATIC * 1 || 0"
													:duration="10000"
												></countTo>
											</q-avatar>
											Total
										</q-chip>

										<q-chip v-for="(item, x) in asym" :key="x" dense>
											<q-avatar :color="item.color" text-color="white">{{
												item.count
											}}</q-avatar>
											{{ item.name }}
										</q-chip>
										<!-- <q-chip dense>
											<q-avatar color="blue" text-color="white">50</q-avatar>
											moderate
										</q-chip>
										<q-chip dense>
											<q-avatar color="red" text-color="white">50</q-avatar>
											severe
										</q-chip> -->
									</div>
									<div class="col-6 text-center">
										<q-chip square style="width: 100%">
											<q-avatar>
												<img src="asymp.PNG" />
											</q-avatar>
											ASYMPTOMATIC
										</q-chip>
										<q-chip color="negative" text-color="white">
											<countTo
												:startVal="0"
												:endVal="symptoms[0].ASYMPTOMATIC * 1 || 0"
												:duration="10000"
											></countTo>
										</q-chip>
									</div>
								</div>
								<q-separator />
								<div class="row q-pa-sm q-col-gutter-md">
									<div class="col-6 text-center">
										<q-chip square style="width: 100%">
											<q-avatar>
												<img src="wcomor.PNG" />
											</q-avatar>
											W/ COMORBIDITY
										</q-chip>
										<q-chip color="positive" text-color="white">
											<countTo
												:startVal="0"
												:endVal="comorbility[0].YES * 1 || 0"
												:duration="10000"
											></countTo>
										</q-chip>
									</div>
									<div class="col-6 text-center">
										<q-chip square style="width: 100%">
											<q-avatar>
												<img src="wocomor.PNG" />
											</q-avatar>
											W/O COMORBIDITY
										</q-chip>
										<q-chip color="negative" text-color="white">
											<countTo
												:startVal="0"
												:endVal="comorbility[0].NO * 1 || 0"
												:duration="10000"
											></countTo>
										</q-chip>
									</div>
								</div>
							</q-card-section>
						</q-card>
					</div>
					<div class="col-12 col-md-8">
						<q-card>
							<q-card-section>
								<apexchart
									height="200"
									class="chart"
									:options="perBarangaylist.chartOptions"
									:series="perBarangaylist.series"
								></apexchart>
							</q-card-section>
						</q-card>
					</div>
				</div>
			</div>
		</div>
	</q-page>
</template>
<script>
import ApexCharts from "apexcharts";
import VueApexCharts from "vue-apexcharts";
import Resource from "src/api/resource";
import countTo from "vue-count-to";
import { date } from "quasar";
export default {
	components: { apexchart: VueApexCharts, countTo },
	sockets: {
		encodeCases() {
			this.loaded();
		},
	},
	data() {
		return {
			// chart1: null,
			// chart2: null,
			// chart3: null,
			// chart4: null,
			// perBarangaylist: null,
			// occupation: null,
			// symptoms: null,
			// comorbility: null,
			// age: null,
			// gender: null,
			// caseStatus: null,
			chart1: this.$q.localStorage.getItem("chart1") || null,
			chart2: this.$q.localStorage.getItem("chart2") || null,
			chart3: this.$q.localStorage.getItem("chart3") || null,
			chart4: this.$q.localStorage.getItem("chart4") || null,
			perBarangaylist: this.$q.localStorage.getItem("chart5") || null,
			occupation: this.$q.localStorage.getItem("occupation") || null,
			symptoms: this.$q.localStorage.getItem("symptom") || null,
			comorbility: this.$q.localStorage.getItem("comor") || null,
			age: this.$q.localStorage.getItem("age") || null,
			caseStatus: this.$q.localStorage.getItem("case_status") || null,
			title: "As of " + date.formatDate(Date.now(), "MMMM DD, YYYY"),
			asym: null,
		};
	},
	mounted() {
		this.loaded();
	},
	created() {},
	methods: {
		loaded() {
			this.case_by_month();
			this.case_by_occupation();
			this.perBarangay();
			this.comor();
			this.symptom();
			this.case_by_age();
			this.case_by_gender();
			this.case_status();
			this.ASYMPT_type();
		},
		async symptom() {
			let symptom = this.$q.localStorage.getItem("symptom");
			if (symptom) {
				this.symptoms = symptom;
			}
			const { data } = await new Resource("Dashboard/symptom").list();
			this.symptoms = data;
			this.$q.localStorage.set("symptom", data);
		},
		async comor() {
			let comor = this.$q.localStorage.getItem("comor");
			if (comor) {
				this.comorbility = comor;
			}
			const { data } = await new Resource("Dashboard/comor").list();
			this.comorbility = data;
			this.$q.localStorage.set("comor", data);
		},
		async ASYMPT_type() {
			let asymType = this.$q.localStorage.getItem("asymType");
			if (asymType) {
				this.asym = asymType;
			}
			const { data } = await new Resource("Dashboard/asymType").list();
			this.asym = data;
			this.$q.localStorage.set("asymType", data);
		},
		async case_by_occupation() {
			let occupation = this.$q.localStorage.getItem("occupation");
			if (occupation) {
				this.occupation = occupation;
			}
			const { data } = await new Resource(
				"Dashboard/case_by_occupation"
			).list();
			this.occupation = data;
			this.$q.localStorage.set("occupation", data);
		},
		async case_status() {
			let case_status = this.$q.localStorage.getItem("case_status");
			if (case_status) {
				this.caseStatus = case_status;
			}
			const { data } = await new Resource("Dashboard/case_status").list();
			this.caseStatus = data;
			this.$q.localStorage.set("case_status", data);
		},
		async case_by_month() {
			let chart1 = this.$q.localStorage.getItem("chart1");
			if (chart1) {
				this.chart1 = chart1;
			}
			const { data } = await new Resource("Dashboard/cases_by_month").list();
			this.chart1 = {
				series: [
					{
						name: "Active",
						data: data.map((item) => Object.values(item)[1]),
					},
					{
						name: "Recovered",
						data: data.map((item) => Object.values(item)[2]),
					},
					{
						name: "Deceased",
						data: data.map((item) => Object.values(item)[3]),
					},
				],
				chartOptions: {
					chart: {
						type: "line",
						toolbar: {
							show: false,
						},
					},
					colors: ["#4caf50", "#F2C037", "#C10015"],
					dataLabels: {
						enabled: true,
					},

					xaxis: {
						categories: data.map((item) => Object.values(item)[0]),
					},

					legend: {
						show: false,
					},
				},
			};
			this.$q.localStorage.set("chart1", this.chart1);
		},
		async loadChart1() {
			let chart1Local = this.$q.localStorage.getItem("chart1");
			if (chart1Local) {
				this.chart1 = chart1Local;
			}
			const { data } = await new Resource("Dashboard/deceased_by_age").list();
			this.chart1 = {
				series: [
					{
						name: "Count",
						data: data.map((item) => Object.values(item)[1]),
					},
				],
				chartOptions: {
					chart: {
						height: 250,
						type: "line",
						dropShadow: {
							enabled: true,
							color: "#000",
							top: 18,
							left: 7,
							blur: 10,
							opacity: 0.2,
						},
						toolbar: {
							show: false,
						},
					},
					colors: ["#77B6EA", "#545454"],
					dataLabels: {
						enabled: true,
					},
					title: {
						text: "Deceased By Age",
						align: "left",
					},
					stroke: {
						curve: "smooth",
					},
					title: {
						text: "Cases",
						align: "left",
					},
					theme: {
						palette: "palette2",
					},
					grid: {
						borderColor: "#e7e7e7",
						row: {
							colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
							opacity: 0.5,
						},
					},
					markers: {
						size: 1,
					},
					xaxis: {
						categories: data.map((item) => Object.values(item)[0]),
					},
					yaxis: {
						title: {
							text: "Cases",
						},
						min: 5,
						max: 40,
					},
					legend: {
						enabled: false,
					},
				},
			};
			this.$q.localStorage.set("chart1", this.chart1);
		},
		async loadChart2() {
			let chart2Local = this.$q.localStorage.getItem("chart2");
			if (chart2Local) {
				this.chart2 = chart2Local;
			}
			const { data } = await new Resource("Dashboard/current_status").list();
			this.chart2 = {
				series: data.map((item) => Object.values(item)[1]),
				chartOptions: {
					chart: {
						type: "donut",
						dropShadow: {
							enabled: true,
							color: "#111",
							top: -1,
							left: 3,
							blur: 3,
							opacity: 0.2,
						},
					},
					stroke: {
						width: 0,
					},
					plotOptions: {
						pie: {
							donut: {
								labels: {
									show: true,
									total: {
										showAlways: true,
										show: true,
									},
								},
							},
						},
					},
					title: {
						text: "Status",
						align: "left",
					},
					labels: data.map((item) => Object.values(item)[0]),
					responsive: [
						{
							breakpoint: 480,
							options: {
								legend: {
									position: "bottom",
								},
							},
						},
					],
					dataLabels: {
						dropShadow: {
							blur: 3,
							opacity: 0.8,
						},
					},
					fill: {
						type: "gradient",
					},
					states: {
						hover: {
							filter: "none",
						},
					},
					theme: {
						palette: "palette2",
					},
					legend: {
						formatter: function (val, opts) {
							return val + " - " + opts.w.globals.series[opts.seriesIndex];
						},
					},
				},
			};
			this.$q.localStorage.set("chart2", this.chart2);
		},
		async case_by_age() {
			let chart = this.$q.localStorage.getItem("age");
			if (chart) {
				this.age = chart;
			}
			const { data } = await new Resource("Dashboard/case_by_age").list();
			this.age = data;
			this.$q.localStorage.set("age", data);
		},
		async case_by_gender() {
			let chart4Local = this.$q.localStorage.getItem("gender");
			if (chart4Local) {
				this.chart4 = chart4Local;
			}
			const { data } = await new Resource("Dashboard/case_by_gender").list();
			this.gender = data;
			this.$q.localStorage.set("gender", data);
		},
		async perBarangay() {
			let chart4Local = this.$q.localStorage.getItem("chart5");
			if (chart4Local) {
				this.perBarangaylist = chart4Local;
			}
			const { data } = await new Resource("Dashboard/getPerBarangay").list();
			this.perBarangaylist = {
				series: [
					{
						name: "Count",
						data: data.map((item) => Object.values(item)[1]),
					},
				],
				chartOptions: {
					chart: {
						type: "bar",
						stacked: true,
					},
					title: {
						text: "Cases Per Barangay",
						align: "left",
					},
					plotOptions: {
						bar: {
							dataLabels: {
								position: "top",
							},
						},
					},
					theme: {
						palette: "palette2",
					},
					fill: {},
					dataLabels: {
						enabled: true,
						style: {
							fontSize: "6px",
							colors: ["black"],
						},
					},
					stroke: {
						show: true,
						width: 1,
						colors: ["black"],
					},
					stroke: {
						show: true,
						width: 2,
						colors: ["transparent"],
					},
					xaxis: {
						categories: data.map((item) => Object.values(item)[0]),
					},
					yaxis: {
						title: {
							text: "Count",
						},
					},
					legend: {
						formatter: function (val, opts) {
							return val + " - " + opts.w.globals.series[opts.seriesIndex];
						},
					},
				},
			};

			this.$q.localStorage.set("chart5", this.perBarangaylist);
		},
	},
};
</script>

<style scoped>
.q-card__section--vert {
	padding: 2px;
}
.myfont {
	font-size: 10px;
}
</style>>
