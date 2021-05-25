<template>
	<div class="q-pa-sm">
		<q-card>
			<toolbar title="Vaccine Profile" @back="goHome">
				<q-btn round color="primary" icon="person" @click="dlgPerson = true" />
			</toolbar>
			<div>
				<q-card flat>
					<q-card-section>
						<q-form ref="contentheader">
							<div class="row q-col-gutter-sm">
								<div class="col-12 col-md-6">
									<div class="row">
										<div class="col-12">
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
										<div class="col-12">
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
										<div class="col-12">
											<q-input
												dense
												stack-label
												ref="middleName"
												color="primary"
												v-model="form.middleName"
												label="Middle Name"
											></q-input>
										</div>
										<div class="col-12">
											<q-input
												dense
												stack-label
												ref="suffix"
												color="primary"
												v-model="form.suffix"
												label="Suffix"
											></q-input>
										</div>
									</div>
								</div>
								<div class="col-12 col-md-6">
									<div class="row">
										<div class="col-12">
											<q-select
												dense
												v-model="form.gender"
												:options="genderx"
												option-value="Gender"
												option-label="Gender"
												label="Gender"
												stack-label
												lazy-rules
												:rules="[
													(val) =>
														(val !== null && val !== '') ||
														'Please select a Gender',
												]"
											/>
										</div>
										<div class="col-12">
											<q-input
												dense
												stack-label
												ref="occupation"
												v-model="form.contact_number"
												color="primary"
												label="Cellphone No."
												lazy-rules
												:rules="[
													(val) =>
														(val !== null && val !== '') ||
														'Please input a number',
												]"
											></q-input>
										</div>
										<div class="col-12">
											<q-select
												dense
												v-model="form.pregnancy"
												:options="['01_Pregnant', '02_Not_Pregnant']"
												label="Pregnancy status (if female)"
												stack-label
												lazy-rules
											/>
										</div>
										<div class="col-12">
											<q-input
												clearable
												readonly
												dense
												stack-label
												ref="occupation"
												v-model="form.HH_No"
												color="primary"
												label="HH No."
											>
												<template v-slot:append>
													<q-icon
														name="close"
														@click="
															form.HH_No = '';
															form.member_id = 0;
														"
													/>
												</template>
											</q-input>
										</div>
									</div>
								</div>
								<q-separator spaced />
								<div class="col-6 col-md-4">
									<q-select
										dense
										v-model="form.category"
										:options="Category"
										label="Category"
										stack-label
										lazy-rules
									/>
								</div>
								<div class="col-6 col-md-4">
									<q-select
										dense
										v-model="form.categoryID"
										:options="CategoryId"
										label="Category ID"
										stack-label
										lazy-rules
									/>
								</div>
								<div class="col-6 col-md-4">
									<q-input
										dense
										stack-label
										ref="occupation"
										v-model="form.category_number"
										color="primary"
										label="Category Number"
									></q-input>
								</div>

								<div class="col-6 col-md-6">
									<q-input
										dense
										stack-label
										ref="occupation"
										v-model="form.philhealthid"
										color="primary"
										label="Phil Health I.D."
									></q-input>
								</div>
								<div class="col-6 col-md-6">
									<q-input
										dense
										stack-label
										ref="occupation"
										v-model="form.pwdid"
										color="primary"
										label="PWD I.D."
									></q-input>
								</div>
								<q-separator spaced />

								<div class="col-12">
									<addressess
										ref="address"
										:datax="selectedHH"
										@selected="OnBarangay"
									/>
								</div>

								<div class="col-6 col-md-2">
									<q-input
										v-model="form.birthdate"
										mask="date"
										label="Birth Date"
										stack-label
										dense
									>
										<template v-slot:hint>YYYY/MM/DD</template>
										<template v-slot:append>
											<q-icon name="event" class="cursor-pointer">
												<q-popup-proxy
													ref="qDateProxy"
													transition-show="scale"
													transition-hide="scale"
												>
													<q-date
														v-model="form.birthdate"
														@input="() => $refs.qDateProxy.hide()"
													/>
												</q-popup-proxy>
											</q-icon>
										</template>
									</q-input>
								</div>
								<div class="col-6 col-md-2">
									<q-select
										dense
										v-model="form.civilStatus"
										:options="civilStatus"
										label="Civil Status"
										stack-label
										lazy-rules
									/>
								</div>

								<div class="col-12 col-md-2">
									<q-select
										dense
										ref="employementstatus"
										v-model="form.employment_status"
										:options="employmentStatus"
										label="Employment Status"
										stack-label
									/>
								</div>
								<div class="col-12 col-md-3">
									<q-select
										dense
										ref="professional"
										v-model="form.profession"
										:options="optionsProffession"
										option-value="professional"
										option-label="professional"
										label="Profession"
										emit-value
										map-options
										stack-label
										use-input
										input-debounce="0"
										@filter="filterProf"
									/>
								</div>
								<div class="col-12 col-md-3">
									<q-checkbox
										true-value="01_Yes"
										false-value="02_No"
										v-model="form.direct_contact_covid"
										label="Providing Direct COVID-19 Care"
									/>
								</div>

								<q-separator spaced />
								<div class="col-12 col-md-6">
									<q-input
										dense
										stack-label
										ref="employer"
										v-model="form.nameofemployer"
										color="primary"
										label="Name of Employer"
									></q-input>
								</div>
								<div class="col-12 col-md-6">
									<q-select
										dense
										ref="professional"
										v-model="form.employerProvince"
										:options="optionsProvinceEmployer"
										option-value="province"
										option-label="province"
										label="Province"
										emit-value
										map-options
										stack-label
										use-input
										input-debounce="0"
										@filter="filterFn"
									/>
								</div>
								<div class="col-12 col-md-6">
									<q-input
										dense
										stack-label
										ref="employer"
										v-model="form.employerAddress"
										color="primary"
										label="Address of Employer"
									></q-input>
								</div>
								<div class="col-12 col-md-6">
									<q-input
										dense
										stack-label
										ref="employer"
										v-model="form.employercontact"
										color="primary"
										label="Employer Contact Number"
									></q-input>
								</div>
								<q-separator spaced />

								<div class="col-12 col-md-12 text-center">
									<q-checkbox
										true-value="01_Yes"
										false-value="02_No"
										v-model="form.allergy"
										label="With Allergy?"
									/>
									<q-checkbox
										true-value="01_Yes"
										false-value="02_No"
										v-if="form.allergy === '01_Yes'"
										v-model="form.allergy_food"
										val="line"
										label="1. Food Allergy"
									/>
									<q-checkbox
										true-value="01_Yes"
										false-value="02_No"
										v-if="form.allergy === '01_Yes'"
										v-model="form.allergy_insect"
										label="2.Insect Allergy"
									/>
									<q-checkbox
										true-value="01_Yes"
										false-value="02_No"
										v-if="form.allergy === '01_Yes'"
										v-model="form.allergy_latex"
										label="3. Latex Allergy"
									/>
									<q-checkbox
										true-value="01_Yes"
										false-value="02_No"
										v-if="form.allergy === '01_Yes'"
										v-model="form.allergy_mold"
										label="4. Mold Allergy"
									/>
									<q-checkbox
										true-value="01_Yes"
										false-value="02_No"
										v-if="form.allergy === '01_Yes'"
										v-model="form.allergy_pet"
										label="5. Pet Allergy"
									/>
									<q-checkbox
										true-value="01_Yes"
										false-value="02_No"
										v-if="form.allergy === '01_Yes'"
										v-model="form.allergy_pollen"
										label="6. Pollen Allergy"
									/>
								</div>
								<q-separator spaced />
								<div class="col-12 text-center">
									<div class="q-gutter-sm">
										<q-checkbox
											true-value="01_Yes"
											false-value="02_No"
											v-model="form.comorbidity"
											label="With Co-Comorbidity?"
										/>
										<q-checkbox
											true-value="01_Yes"
											false-value="02_No"
											v-if="form.comorbidity === '01_Yes'"
											v-model="form.comorbidity_hepertension"
											label="1. Hypertension"
										/>
										<q-checkbox
											true-value="01_Yes"
											false-value="02_No"
											v-if="form.comorbidity === '01_Yes'"
											v-model="form.comorbidity_heart"
											label="2. Heart Disease"
										/>
										<q-checkbox
											true-value="01_Yes"
											false-value="02_No"
											v-if="form.comorbidity === '01_Yes'"
											v-model="form.comorbidity_kidney"
											label="3. Kidney Disease"
										/>
										<q-checkbox
											true-value="01_Yes"
											false-value="02_No"
											v-if="form.comorbidity === '01_Yes'"
											v-model="form.comorbidity_diabetes"
											label="4. Diabetes Mellitus"
										/>
										<q-checkbox
											true-value="01_Yes"
											false-value="02_No"
											v-if="form.comorbidity === '01_Yes'"
											v-model="form.comorbidity_bronchial"
											label="5.Bronchial Asthma"
										/>
									</div>
								</div>
								<q-separator spaced />
								<div class="col-12 text-center">
									<div class="q-gutter-sm">
										<q-checkbox
											true-value="01_Yes"
											false-value="02_No"
											v-model="form.immunodeficiency"
											label="Immunodeficiency Status"
										/>
										<q-checkbox
											true-value="01_Yes"
											false-value="02_No"
											v-if="form.immunodeficiency === '01_Yes'"
											v-model="form.immunodeficiency_cancer"
											label="Cancer"
										/>
										<q-checkbox
											true-value="01_Yes"
											false-value="02_No"
											v-if="form.immunodeficiency === '01_Yes'"
											v-model="form.immunodeficiency_other"
											label="Others(Specify)"
										/>
									</div>
								</div>
								<q-separator spaced />
								<div class="col-12">
									<div class="row q-col-gutter-sm text-center">
										<div class="col">
											<div class="q-gutter-sm">
												<q-checkbox
													true-value="01_Yes"
													false-value="02_No"
													v-model="form.covid_history"
													label="COVID 19 History?"
												/>
											</div>
										</div>
										<div class="col" v-if="form.covid_history === '01_Yes'">
											<q-input
												v-model="form.datepositive"
												mask="date"
												label="Date Positive"
												stack-label
												dense
											>
												<template v-slot:hint>YYYY/MM/DD</template>
												<template v-slot:append>
													<q-icon name="event" class="cursor-pointer">
														<q-popup-proxy
															ref="qDateProxy1"
															transition-show="scale"
															transition-hide="scale"
														>
															<q-date
																v-model="form.datepositive"
																@input="() => $refs.qDateProxy1.hide()"
															/>
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</div>
										<div class="col" v-if="form.covid_history === '01_Yes'">
											<q-select
												dense
												v-model="form.covid_classs"
												:options="[
													'01_Asymptomatic',
													'02_Mild',
													'03_Moderate',
													'04_Severe',
													'05_Critical',
												]"
												label="Classification of Covid"
												emit-value
												map-options
												stack-label
												use-input
												input-debounce="0"
											/>
										</div>
									</div>
								</div>
								<q-separator spaced />
								<div class="col-12">
									<div class="q-gutter-sm text-center">
										<div>Willing to be vaccinated?</div>
										<q-radio
											v-model="form.willing_to_vaccine"
											val="01_Yes"
											label="Yes"
										/>
										<q-radio
											v-model="form.willing_to_vaccine"
											val="02_No"
											label="No"
										/>
										<q-radio
											v-model="form.willing_to_vaccine"
											val="03_Unknown"
											label="Unknown"
										/>
									</div>
								</div>
							</div>
						</q-form>
					</q-card-section>
				</q-card>
			</div>

			<div class="q-pa-sm">
				<command
					:labelSave="form.id > 0 ? 'Update' : 'Save'"
					@save="saveData"
					@clear="clear"
				/>
			</div>
		</q-card>

		<households v-model="dlgPerson" title="Households" @selected="selected" />
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
import households from "#/households2";
import addressess from "./address";
export default {
	name: "entry",
	components: { toolbar, command, households, addressess },
	props: {},
	data: () => ({
		dlgPerson: false,
		form: {
			id: 0,
			lastName: null,
			firstName: null,
			middleName: null,
			contact_number: null,
			civilStatus: null,
			employment_status: null,
			direct_contact_covid: "02_No",
			provinceId: null,
			provinceName: null,
			cityId: null,
			cityName: null,
			purok: null,
			barangayId: null,
			barangay: null,
			HH_No: null,
			category: null,
			categoryID: null,
			category_number: null,
			member_id: 0,
			philhealthid: "",
			pwdid: "",
			birthdate: null,
			employerProvince: null,
			employerAddress: null,
			employercontact: null,
			pregnancy: "02_Not_Pregnant",

			allergy: "02_No",
			allergy_food: "02_No",
			allergy_insect: "02_No",
			allergy_latex: "02_No",
			allergy_mold: "02_No",
			allergy_pet: "02_No",
			allergy_pollen: "02_No",

			comorbidity: "02_No",
			comorbidity_hepertension: "02_No",
			comorbidity_heart: "02_No",
			comorbidity_kidney: "02_No",
			comorbidity_diabetes: "02_No",
			comorbidity_bronchial: "02_No",

			immunodeficiency: "02_No",
			immunodeficiency_cancer: "02_No",
			immunodeficiency_other: "02_No",
			covid_classs: "",
			datepositive: null,
			covid_history: "02_No",
			willing_to_vaccine: "01_Yes",
		},
		date: date.formatDate(new Date(), "YYYY-MM-DD"),
		swab: {
			date_swab: null,
			date_result: null,
		},
		genderx: ["01_Female", "02_Male"],
		civilStatus: [
			"01_Single",
			"02_Married",
			"03_Widow/Widower",
			"04_Separated/Annulled",
			"05_Living_with_Partner",
		],
		employmentStatus: [
			"01_Government_Employed",
			"02_Private_Employed",
			"03_Self_employed",
			"04_Private_practitioner",
			"05_Others",
		],
		Category: [
			"01_Health_Care_Worker",
			"02_Senior_Citizen",
			"03_Indigent",
			"04_Uniformed_Personnel",
			"05_Essential_Worker",
			"06_Other",
		],
		CategoryId: [
			"01_PRC_number",
			"02_OSCA_number",
			"03_Facility_ID_number",
			"04_Other_ID",
		],
		occupation: [],
		selectedHH: {},
		profeesionalList: [],
		provinceEmployer: [],
		optionsProvinceEmployer: [],
		optionsProffession: [],
	}),
	mounted() {
		EventBus.$on("add", () => {});
		EventBus.$on("view", (data) => {});
		EventBus.$on("edit", (data) => {
			console.log(data);
			this.form = data.main[0];
			this.$refs.address.v_city = {
				id: data.main[0].cityId,
				name: data.main[0].cityName,
			};
			this.$refs.address.v_barangay = {
				id: data.main[0].barangayId,
				name: data.main[0].barangay,
			};
			this.$refs.address.profile.purok = data.main[0].purok;
		});
		this.getProfssional();
		this.getEmployerProvince();
	},
	methods: {
		OnBarangay(item) {
			console.log(item);
			this.form.barangayId = item.barangayId;
			this.form.barangay = item.barangay;
			this.form.provinceId = item.provinceId;
			this.form.cityId = item.cityId;
			this.form.cityName = item.cityName;
			this.form.provinceName = item.provinceName;
		},
		filterFn(val, update) {
			if (val === "") {
				update(() => {
					this.optionsProvinceEmployer = this.provinceEmployer;
				});
				return;
			}

			update(() => {
				const needle = val.toLowerCase();
				this.optionsProvinceEmployer = this.provinceEmployer.filter(
					(v) => v.province.toLowerCase().indexOf(needle) > -1
				);
			});
		},
		filterProf(val, update) {
			if (val === "") {
				update(() => {
					this.optionsProffession = this.profeesionalList;
				});
				return;
			}

			update(() => {
				const needle = val.toLowerCase();
				this.optionsProffession = this.profeesionalList.filter(
					(v) => v.professional.toLowerCase().indexOf(needle) > -1
				);
			});
		},
		goHome() {
			EventBus.$emit("list");
		},
		async saveData() {
			this.$q
				.dialog({
					title: "Confirm",
					message: "Would you like to save this data?",
					cancel: true,
					persistent: true,
				})
				.onOk(async () => {
					this.$q.loading.show();
					const par = {
						main: this.form,
					};
					await new Resource("vaccine/store")
						.store(par)
						.then(({ data }) => {
							this.$q.notify(data.Message);
							this.$q.loading.hide();
							this.clear();
						})
						.catch(() => {
							this.$q.loading.hide();
							this.$q.notify(data.Message);
						});
				});
		},
		async getProfssional() {
			const { data } = await new Resource("vaccine/getProfessional").list();
			this.profeesionalList = data;
		},
		async getEmployerProvince() {
			const { data } = await new Resource("vaccine/getEmployerProvince").list();
			this.provinceEmployer = data;
		},

		selected(item) {
			console.log(item);
			this.selectedHH = item;
			this.form.HH_No = item.client_guid;
			this.form.member_id = item.id;
			this.form.lastName = item.lastName;
			this.form.firstName = item.firstName;
			this.form.middleName = item.middleName;
			this.form.purok = item.rep_address;
			this.form.barangay = item.brgy_name;
			this.form.birthdate = item.birthdate;
			this.form.contact_number = item.contact_number;
			if (item.gender === "Male") {
				this.form.gender = this.genderx[1];
			} else {
				this.form.gender = this.genderx[0];
			}
			if (item.age > 59) {
				this.form.category = this.Category[1];
			}
			this.dlgPerson = false;
		},
		clear() {
			this.form = {
				id: 0,
				lastName: null,
				firstName: null,
				middleName: null,
				contact_number: null,
				civilStatus: null,
				employment_status: null,
				direct_contact_covid: "02_No",
				provinceId: null,
				provinceName: null,
				cityId: null,
				cityName: null,
				purok: null,
				barangayId: null,
				barangay: null,
				HH_No: null,
				category: null,
				categoryID: null,
				category_number: null,
				member_id: 0,
				philhealthid: "",
				pwdid: "",
				birthdate: null,
				employerProvince: null,
				employerAddress: null,
				employercontact: null,
				pregnancy: "02_Not_Pregnant",

				allergy: "02_No",
				allergy_food: "02_No",
				allergy_insect: "02_No",
				allergy_latex: "02_No",
				allergy_mold: "02_No",
				allergy_pet: "02_No",
				allergy_pollen: "02_No",

				comorbidity: "02_No",
				comorbidity_hepertension: "02_No",
				comorbidity_heart: "02_No",
				comorbidity_kidney: "02_No",
				comorbidity_diabetes: "02_No",
				comorbidity_bronchial: "02_No",

				immunodeficiency: "02_No",
				immunodeficiency_cancer: "02_No",
				immunodeficiency_other: "02_No",
				covid_classs: "",
				datepositive: null,
				covid_history: "02_No",
				willing_to_vaccine: "01_Yes",
			};
			EventBus.$emit("list");
		},
	},
	watch: {
		"form.allergy"(val) {
			if (val === "02_No") {
				this.form.allergy_food = "02_No";
				this.form.allergy_insect = "02_No";
				this.form.allergy_latex = "02_No";
				this.form.allergy_mold = "02_No";
				this.form.allergy_pet = "02_No";
				this.form.allergy_pollen = "02_No";
			}
		},
		"form.covid_history"(val) {
			if (val === "02_No") {
				this.form.covid_classs = null;
				this.form.datepositive = null;
			}
		},
		"form.comorbidity"(val) {
			if (val === "02_No") {
				this.form.comorbidity_hepertension = "02_No";
				this.form.comorbidity_heart = "02_No";
				this.form.comorbidity_kidney = "02_No";
				this.form.comorbidity_diabetes = "02_No";
				this.form.comorbidity_bronchial = "02_No";
			}
		},
		"form.immunodeficiency"(val) {
			if (val === "02_No") {
				this.form.immunodeficiency_cancer = "02_No";
				this.form.immunodeficiency_other = "02_No";
			}
		},
	},
};
</script>