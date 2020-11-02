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

				<div class="col-12 col-md-12 q-pt-xs">
					<GoogleLogin
						class="google-signin-button"
						style="width: 100%"
						:params="params"
						:onSuccess="onSuccess"
						:onFailure="onFailure"
						>Login with Google</GoogleLogin
					>
				</div>
				<div class="col-12 col-md-12 q-pt-sm">
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
import GoogleLogin from "vue-google-login";
export default {
	components: {
		GoogleLogin,
	},
	data() {
		return {
			clientId:
				"990735916129-571uifuljrj6rm35jiltsqpk03kdfc1e.apps.googleusercontent.com",
			params: {
				client_id:
					"990735916129-571uifuljrj6rm35jiltsqpk03kdfc1e.apps.googleusercontent.com",
			},
			// only needed if you want to render the button with the google ui
			renderParams: {
				width: 250,
				height: 50,
				longtitle: true,
			},
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
		OnGoogleAuthSuccess(idToken) {
			console.log(idToken);
			// Receive the idToken and make your magic with the backend
		},
		OnGoogleAuthFail(error) {
			console.log(error);
		},
		onFailure(googleUser) {
			console.log(googleUser);

			// This only gets the user information: id, name, imageUrl and email
		},
		onSuccess(googleUser) {
			console.log(googleUser);

			// This only gets the user information: id, name, imageUrl and email
			console.log(googleUser.getBasicProfile());
		},
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
					.then(async () => {
						await this.$store.dispatch("user/getInfo").then(() => {
							this.$router.push("/");
							this.$q.loading.hide();
						});
						this.$q.loading.hide();
						this.loading = false;
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

.google-signin-button {
	display: inline-block;
	background: white;
	color: #444;
	width: 190px;
	border-radius: 5px;
	border: thin solid #888;
	box-shadow: 1px 1px 1px grey;
	white-space: nowrap;
}
</style>