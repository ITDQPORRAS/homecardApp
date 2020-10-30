<template>
	<div>
		<div>
			<div class="row q-pt-lg">
				<div class="col-12 text-center">
					<q-img
						src="icon/banner.jpg"
						spinner-color="white"
						style="height: 140px; max-width: 150px"
					></q-img>
				</div>
				<div class="col-12 col-md-12 q-pt-md">
					<q-card flat class="column items-center">
						<div id="content">
							<div class="col">
								<img src="icon/logo.png" alt style="height: 50px" />
							</div>
							<div class="col q-pt-sm">
								<div class="text-h5 text-weight-bold text-primary">
									HoMe Card
								</div>
							</div>
						</div>
					</q-card>
				</div>
				<div class="col-12 col-md-12">
					<q-input
						ref="email"
						color="primary"
						v-model="loginForm.email"
						label="Email"
						lazy-rules
					></q-input>
				</div>
				<div class="col-12 col-md-12">
					<q-input
						ref="password"
						color="primary"
						v-model="loginForm.password"
						:type="isPwd ? 'password' : 'text'"
						label="Password"
					>
						<template v-slot:append>
							<q-icon
								:name="isPwd ? 'visibility_off' : 'visibility'"
								class="cursor-pointer"
								@click="isPwd = !isPwd"
							/>
						</template>
					</q-input>
					<a @click="forgot">
						<a class="text-primary">Forgot Password?</a>
					</a>
				</div>
				<div class="col-12 col-md-12 q-pt-lg">
					<q-btn
						rounded
						@click="handleLogin"
						style="width: 100%"
						color="primary"
						label="Login"
					/>
				</div>
				<div class="col-12 col-md-12">
					<h1>or</h1>
				</div>
				<div class="col-12 col-md-12 q-pt-md">
					<div class="text-center">
						No account yet?
						<em class="text-primary">
							<a @click="register">Click here to Register</a>
						</em>
					</div>
				</div>
			</div>
		</div>
		<br />
	</div>
</template>
<script>
import { csrf } from "src/api/auth";
import EventBus from "./events";
export default {
	data() {
		return {
			tab: "login",
			card: true,
			loginForm: {
				email: "",
				password: "",
			},
			isPwd: true,
			redirect: null,
			loading: false,
		};
	},
	methods: {
		forgot() {
			EventBus.$emit("reset");
		},
		register() {
			EventBus.$emit("register");
		},
		async handleLogin() {
			this.$refs.email.validate();
			this.$refs.password.validate();

			if (this.$refs.email.hasError || this.$refs.password.hasError) {
				this.formHasError = true;
			} else {
				this.$q.loading.show();
				this.$store
					.dispatch("user/login", this.loginForm)
					.then(() => {
						this.$router.push(
							{ path: this.redirect || "/", query: this.otherQuery },
							(onAbort) => {}
						);
						this.$q.loading.hide();
						this.loading = false;
						this.$store.dispatch("user/getInfo");
					})
					.catch(() => {
						this.$q.loading.hide();
					});
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
	},
};
</script>
<style lang="sass" scoped>
.row > div
  padding-left: 15px
  padding-right: 15px
</style>
<style scoped>
h1 {
	overflow: hidden;
	text-align: center;
	font-size: 1rem;
	line-height: 1rem;
}

h1:before,
h1:after {
	background-color: #39aecf;
	content: "";
	display: inline-block;
	height: 1px;
	position: relative;
	vertical-align: middle;
	width: 50%;
}

h1:before {
	right: 0.5em;
	margin-left: -50%;
}

h1:after {
	left: 0.5em;
	margin-right: -50%;
}

#content .col {
	float: left;
}

#footer {
	clear: left;
}
</style>