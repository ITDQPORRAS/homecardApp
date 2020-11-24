<template>
	<q-slide-item @bottom="onLogin">
		<template v-slot:bottom>
			<q-icon name="link" />
			login
		</template>
		<q-item>
			<div class="full-width">
				<div class="row q-pt-lg">
					<div class="col-12 col-md-12 q-pt-md">
						<q-card flat class="column items-center">
							<!-- <div id="content"> -->
							<div class="row">
								<div class="col-5">
									<img
										src="icon/banner.jpg"
										alt
										style="height: 130px; max-width: 140px"
									/>
								</div>
								<div class="col-7 q-pt-sm">
									<div class="q-pt-sm text-h4 text-weight-bold text-center">
										PROVINCE OF CEBU
									</div>
								</div>
							</div>
							<!-- </div> -->
						</q-card>
					</div>
				</div>
				<div
					class="text-h5 text-light-bold text-center bg-primary text-white q-pt-sm"
					style="height: 50px"
				>
					Household Multipurpose E-Card
				</div>

				<div class="col-12 col-md-12 q-pt-sm">
					<!-- <div id="content"> -->
					<div class="row">
						<div class="col-6 text-center">
							<img
								src="icon/icons8-customer-64.png"
								alt
								style="height: 160px; max-width: 170px"
							/>
						</div>
						<div class="col-6">
							<div class="text-h5 text-center">
								<qriously :value="code" :size="160" />
								<div class="text-body2 text-center">POB00112023312</div>
							</div>
						</div>
					</div>
				</div>
				<div class="text-h5 text-bold text-center">
					<u>Richard Abella Porras</u>
				</div>
				<div class="text-h5 text-bold text-center q-pt-lg">
					Maria Luzviminda
					<div class="text-subtitle2 text-center">Punong barangay</div>
				</div>
				<div class="text-h5 text-bold text-center q-pt-lg">
					Peter June Simon
					<div class="text-subtitle1 text-center">City/Municipal Mayor</div>
				</div>
			</div>
		</q-item>
	</q-slide-item>
</template>
<script>
import { csrf } from "src/api/auth";
import EventBus from "./events";
import Resource from "@/api/resource";
import btngoogle from "#/q-google";
// import GoogleLogin from "vue-google-login";
export default {
	data() {
		return {
			code: null,
		};
	},
	methods: {
		onLogin() {
			EventBus.$emit("login");
		},
	},
};
</script>

<style scoped>
.q-item {
	padding: 0px 0px 0px 0px;
	color: inherit;
	transition: color 0.3s, background-color 0.3s;
}

#content .col {
	float: left;
}

#footer {
	clear: left;
}
.q-field__marginal {
	height: 45px !important;
	color: rgba(0, 0, 0, 0.54);
	font-size: 24px;
}
.q-field__control {
	height: 45px !important;
	max-width: 100%;
	outline: none;
}
</style>