<template>
	<q-page>
		<div class="q-pa-sm">
			<q-card>
				<q-pull-to-refresh @refresh="getList">
					<q-table
						class="my-sticky-header-table"
						flat
						title="Vaccine Profile List"
						bordered
						:loading="loading"
						:columns="headers"
						:data="list"
						dense
						row-key="id"
						@request="onRequest"
						:pagination.sync="pagination"
					>
						<!-- <template v-slot:top-right>
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
						</template> -->

						<template v-slot:body-cell-actions="props">
							<q-td :props="props">
								<info @edit="edit(props.row)" @cancel="cancel(props.row)">
								</info>
							</q-td>
						</template>

						<template v-slot:header-cell-HH_No="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.HH_No"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>

						<template v-slot:header-cell-category="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.category"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>

						<template v-slot:header-cell-Category_ID="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.Category_ID"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>

						<template v-slot:header-cell-category_number="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.category_number"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>

						<template v-slot:header-cell-philhealthid="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.philhealthid"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>

						<template v-slot:header-cell-pwdid="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.pwdid"
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
						<template v-slot:header-cell-suffix="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.suffix"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-contact_number="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.contact_number"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-purok="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.purok"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-region="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.region"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-prov_name="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.prov_name"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-city_name="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.city_name"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-brgy_name="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.brgy_name"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-gender="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.gender"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-birthdate="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.birthdate"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-civilStatus="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.civilStatus"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-employment_status="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.employment_status"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-direct_contact_covid="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.direct_contact_covid"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-profession="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.profession"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-nameofemployer="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.nameofemployer"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-employerProvince="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.employerProvince"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-employerAddress="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.employerAddress"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-employercontact="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.employercontact"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-pregnancy="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.pregnancy"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-allergy="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.allergy"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-allergy_food="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.allergy_food"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-allergy_insect="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.allergy_insect"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-allergy_latex="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.allergy_latex"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-allergy_mold="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.allergy_mold"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-allergy_pet="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.allergy_pet"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-allergy_pollen="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.allergy_pollen"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-comorbidity="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.comorbidity"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-comorbidity_hepertension="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.comorbidity_hepertension"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-comorbidity_heart="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.comorbidity_heart"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-comorbidity_kidney="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.comorbidity_kidney"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-comorbidity_diabetes="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.comorbidity_diabetes"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-comorbidity_bronchial="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.comorbidity_bronchial"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-immunodeficiency="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.immunodeficiency"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-immunodeficiency_cancer="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.immunodeficiency_cancer"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-immunodeficiency_other="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.immunodeficiency_other"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-covid_history="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.covid_history"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-datepositive="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.datepositive"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-covid_classs="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.covid_classs"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-willing_to_vaccine="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.willing_to_vaccine"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
						</template>
						<template v-slot:header-cell-name="props">
							<q-th :props="props">
								<q-input
									v-model="listHeader.name"
									:label="props.col.label"
									type="text"
									dense
								></q-input>
							</q-th>
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
		<xmenus @add="goHome" :showfilter="true" @filter="dlgfilter = true">
			<template v-slot>
				<q-fab-action
					label-class="bg-grey-3 text-grey-8"
					external-label
					color="orange"
					icon="history_edu"
					label="Export"
					label-position="top"
					@click="exportList"
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
			pagination: {
				sortBy: "id",
				descending: false,
				page: 1,
				rowsPerPage: 15,
				rowsNumber:15
			},
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
			listHeader: {
				HH_No: "",
				category: "",
				categoryID: "",
				category_number: "",
				philhealthid: "",
				pwdid: "",
				lastName: "",
				firstName: "",
				middleName: "",
				suffix: "",
				contact_number: "",
				purok: "",
				region: "",
				prov_name: "",
				city_name: "",
				brgy_name: "",
				gender: "",
				birthdate: "",
				civilStatus: "",
				employment_status: "",
				direct_contact_covid: "",
				profession: "",
				nameofemployer: "",
				employerProvince: "",
				employerAddress: "",
				employercontact: "",
				pregnancy: "",
				allergy: "",
				allergy_food: "",
				allergy_insect: "",
				allergy_latex: "",
				allergy_mold: "",
				allergy_pet: "",
				allergy_pollen: "",
				comorbidity: "",
				comorbidity_hepertension: "",
				comorbidity_heart: "",
				comorbidity_kidney: "",
				comorbidity_diabetes: "",
				comorbidity_bronchial: "",
				immunodeficiency: "",
				immunodeficiency_cancer: "",
				immunodeficiency_other: "",
				covid_history: "",
				datepositive: "",
				covid_classs: "",
				willing_to_vaccine: "",
				name: "",
			},
			headers: [
				{
					name: "actions",
					label: "ACTIONS",
					field: "actions",
					align: "center",
					width: "80px",
				},
				{
					name: "HH_No",
					label: "HH No.",
					field: "HH_No",
					align: "left",
				},
				{
					name: "category",
					label: "Category",
					field: "category",
					align: "left",
				},
				{
					name: "Category_ID",
					label: "Category_ID",
					field: "categoryID",
					align: "left",
				},
				{
					name: "category_number",
					label: "Category_ID_Number",
					field: "category_number",
					align: "left",
				},
				{
					name: "philhealthid",
					label: "PhilHealth_ID",
					field: "philhealthid",
					align: "left",
				},
				{
					name: "pwdid",
					label: "PWD ID",
					field: "pwdid",
					align: "left",
				},
				{
					name: "lastName",
					label: "Last_Name",
					field: "lastName",
					align: "left",
				},
				{
					name: "firstName",
					label: "First_Name",
					field: "firstName",
					align: "left",
				},
				{
					name: "middleName",
					label: "Middle_Name",
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
					name: "contact_number",
					label: "Contact_No.",
					field: "contact_number",
					align: "left",
				},

				{
					name: "purok",
					label: "Current_Residence.",
					field: "purok",
					align: "left",
				},

				{
					name: "region",
					label: "Region",
					field: "region",
					align: "left",
				},
				{
					name: "prov_name",
					label: "Province",
					field: "prov_name",
					align: "left",
				},
				{
					name: "city_name",
					label: "City",
					field: "city_name",
					align: "left",
				},
				{
					name: "brgy_name",
					label: "Barangay",
					field: "brgy_name",
					align: "left",
				},
				{
					name: "gender",
					label: "Sex",
					field: "gender",
					align: "left",
				},
				{
					name: "birthdate",
					label: "Birthdate",
					field: "birthdate",
					align: "left",
				},
				{
					name: "civilStatus",
					label: "Civil_Status",
					field: "civilStatus",
					align: "left",
				},
				{
					name: "employment_status",
					label: "Employment_Status",
					field: "employment_status",
					align: "left",
				},
				{
					name: "direct_contact_covid",
					label: "Providing Direct COVID-19 Care",
					field: "direct_contact_covid",
					align: "left",
				},
				{
					name: "profession",
					label: "Profession",
					field: "profession",
					align: "left",
				},
				{
					name: "nameofemployer",
					label: "Name_of_Employer",
					field: "nameofemployer",
					align: "left",
				},
				{
					name: "employerProvince",
					label: "Province/HUC/ICC_of_Employer",
					field: "employerProvince",
					align: "left",
				},

				{
					name: "employerAddress",
					label: "Address_of_Employer",
					field: "employerAddress",
					align: "left",
				},
				{
					name: "employercontact",
					label: "Contact_number_of_employer",
					field: "employercontact",
					align: "left",
				},
				{
					name: "pregnancy",
					label: "Pregnancy_status",
					field: "pregnancy",
					align: "left",
				},
				{
					name: "allergy",
					label: "Drug_Allergy",
					field: "allergy",
					align: "left",
				},
				{
					name: "allergy_food",
					label: "Food_Allergy",
					field: "allergy_food",
					align: "left",
				},
				{
					name: "allergy_insect",
					label: "Insect_Allergy",
					field: "allergy_insect",
					align: "left",
				},
				{
					name: "allergy_latex",
					label: "latex_Allergy",
					field: "allergy_latex",
					align: "left",
				},
				{
					name: "allergy_mold",
					label: "mold_Allergy",
					field: "allergy_mold",
					align: "left",
				},
				{
					name: "allergy_pet",
					label: "pet_Allergy",
					field: "allergy_pet",
					align: "left",
				},
				{
					name: "allergy_pollen",
					label: "Pollen_Allergy",
					field: "allergy_pollen",
					align: "left",
				},
				{
					name: "comorbidity",
					label: "With_Comorbidity",
					field: "comorbidity",
					align: "left",
				},
				{
					name: "comorbidity_hepertension",
					label: "Hypertension",
					field: "comorbidity_hepertension",
					align: "left",
				},
				{
					name: "comorbidity_heart",
					label: "Heart_Disease",
					field: "comorbidity_heart",
					align: "left",
				},
				{
					name: "comorbidity_kidney",
					label: "Kidney_Disease",
					field: "comorbidity_kidney",
					align: "left",
				},
				{
					name: "comorbidity_diabetes",
					label: "Diabetes_Mellitus",
					field: "comorbidity_diabetes",
					align: "left",
				},
				{
					name: "comorbidity_bronchial",
					label: "Bronchial_Asthma",
					field: "comorbidity_bronchial",
					align: "left",
				},
				{
					name: "immunodeficiency",
					label: "Immunodeficiency_Status",
					field: "immunodeficiency",
					align: "left",
				},
				{
					name: "immunodeficiency_cancer",
					label: "Cancer",
					field: "immunodeficiency_cancer",
					align: "left",
				},
				{
					name: "immunodeficiency_other",
					label: "Others",
					field: "immunodeficiency_other",
					align: "left",
				},
				{
					name: "covid_history",
					label: "Patient_was_diagnosed_with_COVID_19",
					field: "covid_history",
					align: "left",
				},
				{
					name: "datepositive",
					label: "datepositive",
					field: "datepositive",
					align: "left",
				},
				{
					name: "covid_classs",
					label: "covid_classs",
					field: "covid_classs",
					align: "left",
				},
				{
					name: "willing_to_vaccine",
					label: "willing_to_vaccine",
					field: "willing_to_vaccine",
					align: "left",
				},
				{
					name: "name",
					label: "Encoded By",
					field: "name",
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
			dtlItem: [],
			dtltitle: null,
			count: 0,
			countDown: 3,
			dataExport: [],
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
		async getList() {
			try {
				this.countDown = 0;
				const par = {
					pagination: this.pagination,
					filters: this.listHeader,
				};
				this.onRequest(par);
			} catch (error) {
				this.loading = false;
			}
		},
		async edit(item) {
			try {
				this.loading = true;
				const datax = new Resource("vaccine/edit");
				const { data } = await datax.get(item.id);
				EventBus.$emit("entry");
				EventBus.$emit("edit", data);
				this.loading = false;
			} catch (error) {
				this.loading = false;
			}
		},
		async cancel(item) {
			try {
				this.$q
					.dialog({
						title: "Confirm",
						message: "Would you like to save this data?",
						cancel: true,
						persistent: true,
					})
					.onOk(async () => {
						this.loading = true;
						const datax = new Resource("vaccine/cancel");
						const { data } = await datax.get(item.id);
						this.$q.notify(data.Message);
						this.loading = false;
					});
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
			const { data } = await new Resource("vaccine/update").store(par);
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
					this.dataExport.map((row) =>
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
			const status = exportFile("EligibleGroupslist.csv", content, "text/csv");
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
		async onRequest(props) {
			if (this.countDown == 0) {
				this.loading = true;
				const { page, rowsPerPage, sortBy, descending } = props.pagination;
				const filter = this.listHeader;
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
					descending
				);
				this.loading = false;
				this.datax = returnedData;
				this.pagination.page = page;
				this.pagination.rowsPerPage = rowsPerPage;
				this.pagination.sortBy = sortBy;
				this.pagination.descending = descending;
			}
		},
		async exportList() {
			this.$q.loading.show();
			const datax = new Resource("vaccine/listExport");
			let par = { filter: this.listHeader, date: this.filter };
			await datax.store(par).then(({ data }) => {
				this.dataExport = data;
				this.exportTableLeader();
				this.$q.loading.hide();
			});
		},
		async fetchFromServer(startRow, count, filter, sortBy, descending) {
			const par = {
				startRow: startRow,
				count: count,
				filter: filter,
				sortBy: sortBy,
				descending: descending,
				type: this.type,
			};
			this.loading = true;
			const datax = new Resource("vaccine/list");
			// let par = { par: this.listHeader, date: this.filter };
			const { data } = await datax.store(par);
			this.list = data.list;
			this.loading = false;
			this.pagination.rowsNumber = data.count;
			return data;
		},
	},
	mounted() {
		this.getList();
		EventBus.$on("list", () => {
			this.getList();
		});
	},
	watch: {
		listHeader: {
			deep: true,
			handler(val) {
				this.countDown = 3;
				this.countDownTimer();
			},
		},
		countDown(val) {
			if (val == 0) {
				this.getList();
			}
		},
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