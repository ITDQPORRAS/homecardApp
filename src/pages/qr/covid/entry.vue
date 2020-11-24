<template>
	<div class="q-pa-sm">
		<q-card>
			<toolbar title="Case Entry" @back="goHome">
				<q-btn round color="primary" icon="person" @click="dlgPerson = true" />
				<q-separator spaced inset vertical />
				{{ form.refNo }}
			</toolbar>
			<div>
				<q-list bordered class="rounded-borders">
					<q-expansion-item
						default-opened
						color="primary"
						expand-separator
						icon="perm_identity"
						label="Personal Information"
						header-class="text-primary"
					>
						<q-separator />
						<q-card>
							<q-card-section>
								<q-form ref="contentheader">
									<div class="row">
										<div class="col-12 col-md-4">
											<q-input
												dense
												stack-label
												ref="lastName"
												color="primary"
												v-model="form.lastName"
												label="Last Name"
												lazy-rules
												:rules="[
													(val) =>
														(val && val.length > 0) || 'Please Type Last Name',
												]"
											></q-input>
										</div>

										<div class="col-12 col-md-4">
											<q-input
												dense
												stack-label
												ref="firstName"
												color="primary"
												v-model="form.firstName"
												label="First Name"
												lazy-rules
												:rules="[
													(val) =>
														(val && val.length > 0) || 'Please Type First Name',
												]"
											></q-input>
										</div>
										<div class="col-12 col-md-4">
											<q-input
												dense
												stack-label
												ref="middleName"
												color="primary"
												v-model="form.middleName"
												label="Middle Name"
											></q-input>
										</div>
										<div class="col-12 col-md-4">
											<q-input
												dense
												type="Number"
												stack-label
												ref="Age"
												color="primary"
												v-model="form.age"
												label="Age"
											></q-input>
										</div>
										<div class="col-6 col-md-4">
											<q-select
												dense
												v-model="form.sex"
												:options="genderx"
												option-value="Gender"
												option-label="Gender"
												label="Sex"
												stack-label
												lazy-rules
											/>
										</div>
										<div class="col-6 col-md-4">
											<q-select
												dense
												v-model="form.civilStatus"
												:options="civilStatus"
												label="Civil Status"
												stack-label
												lazy-rules
											/>
										</div>
										<div class="col-12 col-md-6">
											<!-- <q-input
												dense
												stack-label
												ref="occupation"
												v-model="form.occupation"
												color="primary"
												label="Occupation"
											></q-input>-->
											<q-select
												dense
												ref="occupation"
												v-model="form.occupation"
												:options="occupation"
												option-value="occupation_name"
												option-label="occupation_name"
												label="Occupation"
												emit-value
												map-options
												stack-label
												lazy-rules
												:rules="[
													(val) =>
														(val !== null && val !== '') ||
														'Please select a occupation',
												]"
											/>
										</div>
										<div class="col-12 col-md-6">
											<q-input
												dense
												stack-label
												ref="occupation"
												v-model="form.workPlace"
												color="primary"
												label="Work Place"
											></q-input>
										</div>

										<div class="col-6 col-md-6">
											<q-select
												dense
												ref="barangay"
												v-model="form.barangay"
												:options="barangay"
												option-value="brgy_name"
												option-label="brgy_name"
												label="Barangay"
												emit-value
												map-options
												stack-label
												lazy-rules
												:rules="[
													(val) =>
														(val !== null && val !== '') ||
														'Please select a relationship',
												]"
											/>
										</div>
										<div class="col-6 col-md-6">
											<q-input
												stack-label
												ref="purok"
												dense
												color="primary"
												v-model="form.purok"
												label="Purok"
											></q-input>
										</div>
										<div class="col-12 col-md-3">
											<q-select
												dense
												ref="status"
												v-model="form.dailyHealthStatus"
												:options="HealthStatus"
												label="Health Status"
												stack-label
												lazy-rules
												:rules="[
													(val) =>
														(val !== null && val !== '') ||
														'Please select a health status',
												]"
											></q-select>
										</div>
										<div class="col-12 col-md-6">
											<q-select
												:readonly="form.dailyHealthStatus === 'ASYMPTOMATIC'"
												dense
												ref="status"
												v-model="SymptomsSelected"
												:options="Symptoms"
												option-value="id"
												option-label="symtoms_name"
												label="Symptoms"
												map-options
												emit-value
												multiple
												stack-label
												lazy-rules
												use-input
												use-chips
												:rules="[
													(val) =>
														(val !== null && val !== '') ||
														'Please select a health status',
												]"
											></q-select>
										</div>
										<div class="col-12 col-md-3">
											<q-select
												:readonly="form.dailyHealthStatus === 'ASYMPTOMATIC'"
												dense
												ref="status"
												v-model="form.ASYMPT_type"
												:options="ASYMPT_type"
												label="Category"
												stack-label
												lazy-rules
											></q-select>
										</div>
										<div class="col-12 col-md-3">
											<q-select
												dense
												ref="status"
												v-model="form.comorbidity"
												:options="comorbidityStat"
												label="Comorbidity"
												option-value="id"
												option-label="comorbidity"
												map-options
												emit-value
												stack-label
												lazy-rules
												map
												:rules="[
													(val) =>
														(val !== null && val !== '') ||
														'Please select a comorbidity',
												]"
											></q-select>
										</div>
										<div class="col-12 col-md-9">
											<q-select
												dense
												:readonly="form.comorbidity === 'NO'"
												ref="status"
												v-model="comorbiditySelected"
												:options="comorbidity"
												multiple
												label="Type of Comorbiditiy"
												option-value="id"
												option-label="comorbidity"
												map-options
												emit-value
												stack-label
												lazy-rules
												use-input
												use-chips
												:rules="[
													(val) =>
														(val !== null && val !== '') ||
														'Please select a comorbidity',
												]"
											></q-select>
										</div>
										<div class="col-12 col-md-12">
											<q-select
												dense
												ref="status"
												v-model="form.finalRemarks"
												:options="finalRemarks"
												label="Status"
												stack-label
												lazy-rules
												:rules="[
													(val) =>
														(val !== null && val !== '') ||
														'Please select a status',
												]"
											></q-select>
										</div>
									</div>
								</q-form>
							</q-card-section>
						</q-card>
					</q-expansion-item>
					<q-separator />
					<q-expansion-item
						expand-separator
						icon="science"
						label="Swab Details"
						default-opened
						header-class="text-secondary"
					>
						<q-separator />
						<q-card>
							<q-card-section>
								<div class="row">
									<div class="col-6 col-md-6">
										<q-input
											v-model="swab.date_swab"
											dense
											label="Date of Swab/Collected"
											stack-label
											mask="date"
										>
											<template v-slot:append>
												<q-icon name="event" class="cursor-pointer">
													<q-popup-proxy
														ref="qDateProxy"
														transition-show="scale"
														transition-hide="scale"
													>
														<q-date
															v-model="swab.date_swab"
															@input="() => $refs.qDateProxy.hide()"
														/>
													</q-popup-proxy>
												</q-icon>
											</template>
										</q-input>
									</div>
									<div class="col-6 col-md-6">
										<q-input
											v-model="swab.date_result"
											dense
											label="Date of Result"
											stack-label
											mask="date"
										>
											<template v-slot:append>
												<q-icon name="event" class="cursor-pointer">
													<q-popup-proxy
														ref="qDateProxy2"
														transition-show="scale"
														transition-hide="scale"
													>
														<q-date
															v-model="swab.date_result"
															@input="() => $refs.qDateProxy2.hide()"
														/>
													</q-popup-proxy>
												</q-icon>
											</template>
										</q-input>
									</div>
									<div class="col-12 text-right q-pt-sm">
										<q-btn
											rounded
											color="primary"
											icon="check"
											@click="addtolist"
											label="Add to list"
										/>
									</div>
									<div class="col-12 q-pt-sm">
										<q-table
											:data="SwabList"
											:columns="columnsSwab"
											row-key="date_swab"
										>
											<template v-slot:body="props">
												<q-tr :props="props">
													<q-td key="date_swab" :props="props">
														{{ props.row.date_swab }}
														<q-popup-edit
															dense
															autofocus
															v-model="props.row.date_swab"
															buttons
														>
															<q-input
																v-model="props.row.date_swab"
																dense
																label="Date of Swab/Collected"
																stack-label
																mask="date"
															>
																<template v-slot:append>
																	<q-icon name="event" class="cursor-pointer">
																		<q-popup-proxy
																			ref="qDateProxy2"
																			transition-show="scale"
																			transition-hide="scale"
																		>
																			<q-date
																				v-model="props.row.date_swab"
																				@input="() => $refs.qDateProxy2.hide()"
																			/>
																		</q-popup-proxy>
																	</q-icon>
																</template>
															</q-input>
														</q-popup-edit>
													</q-td>
													<q-td key="date_result" :props="props">
														{{ props.row.date_result }}
														<q-popup-edit
															v-model="props.row.date_result"
															buttons
														>
															<q-input
																v-model="props.row.date_result"
																dense
																label="Date of Result"
																stack-label
																mask="date"
															>
																<template v-slot:append>
																	<q-icon name="event" class="cursor-pointer">
																		<q-popup-proxy
																			ref="qDateProxy2"
																			transition-show="scale"
																			transition-hide="scale"
																		>
																			<q-date
																				v-model="props.row.date_result"
																				@input="() => $refs.qDateProxy2.hide()"
																			/>
																		</q-popup-proxy>
																	</q-icon>
																</template>
															</q-input>
														</q-popup-edit>
													</q-td>
													<q-td key="remove" :props="props">
														<q-icon name="clear" @click="remove(props.row)" />
													</q-td>
												</q-tr>
											</template>
										</q-table>
									</div>
								</div>
							</q-card-section>
						</q-card>
					</q-expansion-item>
				</q-list>
				<command
					:labelSave="form.id > 0 ? 'Update' : 'Save'"
					@save="saveData"
					@clear="clear"
				/>
			</div>
		</q-card>

		<q-dlg v-model="dlgPerson" title="Households" :showCommand="false">
			<keep-alive>
				<households @selected="selected" />
			</keep-alive>
		</q-dlg>
	</div>
</template>
<script>
import EventBus from "./events";
import toolbar from "#/Toolbar";
import command from "#/Command";
import Resource from "src/api/resource";
import { date } from "quasar";
import { errorMonitor } from "events";
import { mapGetters } from "vuex";
import households from "#/households";
export default {
	name: "entry",
	components: { toolbar, command, households },
	props: {},
	data: () => ({
		dlgPerson: false,
		form: {
			id: 0,
			refNo: 0,
			hhNo: 0,
			lastName: null,
			firstName: null,
			middleName: null,
			age: null,
			sex: null,
			occupation: null,
			workPlace: null,
			civilStatus: null,
			purok: null,
			barangay: null,
			finalRemarks: "POSITIVE",
			dailyHealthStatus: "SYMPTOMATIC",
			comorbidity: "YES",
			ASYMPT_type: "",
			member_id: 0,
		},
		HealthStatus: ["ASYMPTOMATIC", "SYMPTOMATIC"],
		SymptomsSelected: [],
		Symptoms: [],
		date: date.formatDate(new Date(), "YYYY-MM-DD"),
		swab: {
			date_swab: null,
			date_result: null,
		},
		genderx: ["FEMALE", "MALE"],
		civilStatus: ["MARRIED", "SINGLE", "WIDOWED"],
		finalRemarks: ["POSITIVE", "RECOVERED", "DECEASED"],
		columnsSwab: [
			{
				name: "date_swab",
				label: "Date Swab/Collectd",
				field: "date_swab",
				align: "left",
			},
			{
				name: "date_result",
				label: "Date Result",
				field: "date_result",
				align: "left",
			},
			{
				name: "remove",
				label: "Remove",
				field: "remove",
				align: "left",
			},
		],
		ASYMPT_type: ["Mild", "Moderate", "Severe"],
		SwabList: [],
		comorbidityStat: ["NO", "YES"],
		comorbidity: [],
		comorbiditySelected: [],
		occupation: [],
	}),
	mounted() {
		EventBus.$on("add", () => {});
		EventBus.$on("view", (data) => {});
		EventBus.$on("edit", (data) => {
			this.form = data.main[0];
			this.SwabList = data.swab;
			this.SymptomsSelected = data.symtoms.map(
				(item) => Object.values(item)[0]
			);
			this.comorbiditySelected = data.comorbidity.map(
				(item) => Object.values(item)[0]
			);
		});
		this.getCount();
		this.getComorbidity();
		this.getSymptoms();
		this.getOccupation();
	},
	methods: {
		goHome() {
			EventBus.$emit("list");
		},
		async saveData() {
			this.$q.loading.show();
			if (this.form.id === 0) {
				await this.getCount();
			}
			const par = {
				main: this.form,
				swab: this.SwabList,
				symptoms: this.SymptomsSelected,
				comorbidity: this.comorbiditySelected,
			};
			const { data } = await new Resource("Covid/store").store(par);
			this.$q.notify(data.Message);
			this.$q.loading.hide();
			this.clear();
			this.$socket.client.emit("encodeCases");
		},
		async getCount() {
			const { data } = await new Resource("Covid/getcount").list();
			this.form.refNo = data[0].no;
		},
		async getComorbidity() {
			const { data } = await new Resource("Covid/comorbidity").list();
			this.comorbidity = data;
		},
		async getSymptoms() {
			const { data } = await new Resource("Covid/Symptoms").list();
			this.Symptoms = data;
		},
		async getOccupation() {
			const { data } = await new Resource("Covid/occupation").list();
			this.occupation = data;
		},
		addtolist() {
			this.SwabList.push({
				date_swab: this.swab.date_swab,
				date_result: this.swab.date_result,
			});
		},
		remove(item) {
			const index = this.SwabList.indexOf(item);
			this.SwabList.splice(index, 1);
		},
		selected(item) {
			this.form.member_id = item.id;
			this.form.lastName = item.lastName;
			this.form.firstName = item.firstName;
			this.form.middleName = item.middleName;
			this.form.age = item.age;
			this.form.sex = item.gender;
			this.form.purok = item.rep_address;
			this.form.barangay = item.brgy_name;
			this.dlgPerson = false;
		},
		clear() {
			this.form.id = 0;
			this.form.member_id = 0;
			this.form.lastName = null;
			this.form.firstName = null;
			this.form.middleName = null;
			this.form.age = null;
			this.form.sex = null;
			this.form.occupation = null;
			this.form.workPlace = null;
			this.form.civilStatus = null;
			this.form.purok = null;
			this.form.ASYMPT_type = "";
			this.form.barangay = null;
			this.SymptomsSelected = [];
			this.comorbiditySelected = [];
			this.SwabList = [];
			EventBus.$emit("list");
		},
	},
	watch: {
		"form.dailyHealthStatus"(val) {
			if (val !== "SYMPTOMATIC") {
				this.SymptomsSelected = [];
				this.form.ASYMPT_type = "";
			}
		},
		"form.comorbidity"(val) {
			if (val !== "YES") {
				this.comorbiditySelected = [];
			}
		},
	},
	computed: {
		...mapGetters(["barangay"]),
	},
};
</script>

