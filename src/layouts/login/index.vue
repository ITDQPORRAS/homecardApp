<template>
	<div class="q-pa-md">
		<q-dialog
			v-model="card"
			seamless
			:maximized="$q.platform.is.mobile"
			:full-height="$q.platform.is.mobile"
		>
			<div>
				<transition
					appear
					enter-active-class="slide-right"
					leave-active-class="slide-left"
				>
					<keep-alive>
						<q-card
							flat
							v-bind:style="
								!$q.platform.is.mobile ? 'width: 500px' : 'height:100%'
							"
						>
							<component :is="component" />
						</q-card>
					</keep-alive>
				</transition>
			</div>
		</q-dialog>
	</div>
</template>
<script>
import EventBus from "./events";
import { csrf } from "src/api/auth";
import login from "./login";
import register from "./register";
import reset from "./reset";
import profile from "./profile";
import { colors } from "quasar";
export default {
	components: { login, register, reset, profile },
	data() {
		return {
			tab: "login",
			card: true,
			loginForm: {
				fullname: null,
				email: "",
				password: "",
				passwor2: "",
			},
			isPwd: true,
			redirect: null,
			loading: false,
			component: "profile",
		};
	},
	mounted() {
		colors.setBrand(
			"primary",
			this.$q.localStorage.getItem("themes") || "#31CCEC"
		);
		EventBus.$on("register", (data) => {
			// this.component = "register";
			this.component = "register";
		});
		EventBus.$on("reset", (data) => {
			this.component = "reset";
		});
		EventBus.$on("login", (data) => {
			this.component = "login";
		});
		EventBus.$on("profile", (data) => {
			this.component = "profile";
		});
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
