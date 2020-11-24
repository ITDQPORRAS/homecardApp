<template>
	<div>
		<q-tlbr title="Register" @back="login"></q-tlbr>
		<div class="q-pa-sm">
			<div class="row q-col-gutter-sm">
				<div class="col-12 col-md-12">
					<q-card flat class="column items-center">
						<div id="content">
							<div class="col">
								<img src="icons/logo2.png" alt />
							</div>
							<div class="col q-pt-md">
								<div class="text-h6 text-primary">HoMe Card</div>
							</div>
						</div>
					</q-card>
				</div>
				<div class="col-12 col-md-6">
					<q-select
						dense
						v-model="loginForm.brgy_id"
						:options="barangay"
						option-value="id"
						option-label="brgy_name"
						label="Barangay"
						lazy-rules
						emit-value
						map-options
						:rules="[
							(val) =>
								(val !== null && val !== '') || 'Please select a barangay',
						]"
					/>
				</div>
				<div class="col-12 col-md-6">
					<q-input
						dense
						ref="email"
						color="primary"
						v-model="loginForm.purok"
						label="Purok"
					></q-input>
				</div>
				<div class="col-12 col-md-12">
					<q-input
						dense
						ref="email"
						color="primary"
						v-model="loginForm.fname"
						label="First Name"
						lazy-rules
						:rules="[
							(val) => (val && val.length > 0) || 'Please type fullname',
						]"
					></q-input>
				</div>
				<div class="col-12 col-md-12">
					<q-input
						dense
						ref="email"
						color="primary"
						v-model="loginForm.mname"
						label="Middle Name"
						lazy-rules
						:rules="[
							(val) => (val && val.length > 0) || 'Please type fullname',
						]"
					></q-input>
				</div>
				<div class="col-8 col-md-8">
					<q-input
						dense
						ref="email"
						color="primary"
						v-model="loginForm.lname"
						label="Last Name"
						lazy-rules
						:rules="[
							(val) => (val && val.length > 0) || 'Please type fullname',
						]"
					></q-input>
				</div>
				<div class="col-4 col-md-4">
					<q-input
						dense
						ref="email"
						color="primary"
						v-model="loginForm.ext"
						label="Extension"
						lazy-rules
					></q-input>
				</div>
				<div class="col-12 col-md-12">
					<q-input
						dense
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
						dense
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
						dense
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
						color="info"
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
				brgy_id: null,
				fname: null,
				mname: null,
				lname: null,
				ext: null,
				purok: null,
			},
			facilityMain: [],
			isPwd: true,
			isPwd1: true,
			redirect: null,
			loading: false,
			valid: true,
			barangay: [],
		};
	},
	mounted() {
		this.getFacility();
		this.getBrgy();
	},
	methods: {
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
		async getBrgy() {
			await new Resource("getBrgy").list().then(({ data }) => {
				this.barangay = data;
			});
		},
		login() {
			EventBus.$emit("login");
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

<style scoped>
#content .col {
	float: left;
}

#footer {
	clear: left;
}
.q-field--with-bottom {
	padding-bottom: 15px;
}
</style>