<template>
	<div>
		<div class="q-pa-sm">
			<q-tlbr title="Register" @back="login"></q-tlbr>
			<div class="row">
				<div class="col-12 col-md-12">
					<q-input
						ref="email"
						color="primary"
						v-model="loginForm.name"
						label="Full Name"
						lazy-rules
						:rules="[
							(val) => (val && val.length > 0) || 'Please type fullname',
						]"
					></q-input>
				</div>
				<div class="col-12 col-md-12">
					<q-select
						v-model="facilityMain"
						:options="facility"
						option-value="id"
						option-label="facility_name"
						label="Facility"
						lazy-rules
						:rules="[
							(val) =>
								(val !== null && val !== '') || 'Please select a Facility',
						]"
					/>
				</div>
				<div class="col-12 col-md-12">
					<q-input
						ref="email"
						color="primary"
						type="text"
						v-model="loginForm.email"
						label="Email"
						lazy-rules
						:rules="[(val) => (val && val.length > 0) || 'Please type email']"
					></q-input>
				</div>
				<div class="col-6 col-md-6">
					<q-input
						ref="password"
						color="primary"
						v-model="loginForm.password"
						:rules="[
							(val) => (val && val.length > 0) || 'Please input password',
						]"
						type="password"
						lazy-rules
						label="Password"
					></q-input>
				</div>
				<div class="col-6 col-md-6">
					<q-input
						ref="password2"
						color="primary"
						v-model="loginForm.password2"
						:rules="[
							(val) => (val && val.length > 0) || 'Please retry password',
						]"
						type="password"
						lazy-rules
						label="Repeat Password"
					></q-input>
				</div>
				<div class="col-12 col-md-12">
					<q-btn
						@click="handleLogin"
						:loading="loading"
						style="width: 100%"
						rounded
						color="primary"
						label="Register"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { csrf } from "src/api/auth";
import Resource from "@/api/resource";
import EventBus from "./events";
export default {
	data() {
		return {
			tab: "login",
			card: true,
			facility: [],
			loginForm: {
				name: "",
				email: "",
				password: "",
				password2: null,
				facility: null,
				facilityName: null,
			},
			facilityMain: [],
			isPwd: true,
			isPwd1: true,
			redirect: null,
			loading: false,
			valid: true,
		};
	},
	mounted() {
		this.getFacility();
	},
	methods: {
		login() {
			EventBus.$emit("login");
		},
		validate() {
			this.$refs.email.validate();
			this.$refs.password.validate();
			if (this.loginForm.password !== this.loginForm.password2) {
				this.valid = false;
				this.$q.notify({
					color: "negative",
					message: "Password not matched!",
					icon: "report_problem",
					position: "top",
				});
			}
		},
		async getFacility() {
			const { data } = await new Resource("facility").list();
			this.facility = data;
		},
		async handleLogin() {
			try {
				this.valid = true;
				await this.validate();
				if (this.$refs.email.hasError || this.$refs.password.hasError) {
					this.formHasError = true;
				} else {
					if (csrf()) {
						if (this.valid) {
							this.loading = true;
							const datax = new Resource("storeRegister");
							const { data } = await datax.store(this.loginForm);
							// this.$message({ message: data.Message, type: data.status });
							this.$q.notify(JSON.stringify(data.Message));
							EventBus.$emit("login");
							this.loading = false;
						}
					}
				}
			} catch (error) {
				this.$q.notify(JSON.stringify(error));
				this.loading = false;
			}
		},
	},
	watch: {
		$route: {
			handler: function (route) {
				this.redirect = route.query && route.query.redirect;
			},
			immediate: true,
		},
		facilityMain: function (val) {
			this.loginForm.facility = val.id;
			this.loginForm.facilityName = val.facility_name;
		},
	},
};
</script>
<style lang="sass" scoped>
.row > div
  padding-left: 10px
  padding-right: 10px
</style>
