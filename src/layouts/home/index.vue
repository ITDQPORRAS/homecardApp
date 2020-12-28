<template>
	<div class="row">
		<div class="col-12 col-md-4"></div>
		<div class="col-12 col-sm-12 col-md-4">
			<div style="max-width: 500px">
				<q-item>
					<div class="full-width">
						<div class="row q-pt-lg">
							<div class="col-12 col-md-12 q-pt-md">
								<q-card flat class="column items-center">
									<!-- <div id="content"> -->
									<div class="row">
										<div class="col-5 text-center">
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
										:src="avatar"
										alt
										style="height: 160px; max-width: 170px"
									/>
								</div>
								<div class="col-6">
									<div class="text-h5 text-center">
										<qriously :value="selected.code" :size="160" />
										<div class="text-body2 text-center">
											{{ selected.code }}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="text-h5 text-bold text-center">
							<u>{{ selected.name }}</u>
							<q-popup-proxy
								transition-show="flip-up"
								transition-hide="flip-down"
							>
								<q-banner class="bg-primary text-white">
									<q-list style="min-width: 100px">
										<q-item
											v-for="(item, x) in datax"
											:key="x"
											clickable
											v-close-popup
											@click="selectedPerson(item)"
										>
											<q-item-section>{{ item.fullname }}</q-item-section>
										</q-item>
									</q-list>
								</q-banner>
							</q-popup-proxy>
						</div>
						<div class="text-h5 text-bold text-center q-pt-lg">
							{{ selected.captain }}
							<div class="text-subtitle2 text-center">Punong barangay</div>
						</div>
						<div class="text-h5 text-bold text-center q-pt-lg">
							{{ selected.mayor }}
							<div class="text-subtitle1 text-center">City/Municipal Mayor</div>
						</div>
					</div>
				</q-item>
			</div>
		</div>
		<div class="col-12 col-md-4"></div>
	</div>
</template>
<script>
import { csrf } from "src/api/auth";
import Resource from "@/api/resource";
import btngoogle from "#/q-google";
import { mapGetters } from "vuex";
import {
	getInfo,
	getMember,
	setSelected,
	getSelected,
	setMember,
} from "src/utils/auth";
// import GoogleLogin from "vue-google-login";
export default {
	data() {
		return {
			code: null,
			datax: null,
			selected: {
				name: "Click Me",
				captain: null,
				mayor: null,
				code: null,
			},
		};
	},
	methods: {
		onLogin() {
			EventBus.$emit("login");
		},
		selectedPerson(item) {
			this.selected.name = item.fullname;
			this.selected.captain = item.brgy_captain;
			this.selected.mayor = item.citymunMayor;
			this.selected.code = item.client_guid;
			setSelected(this.selected);
		},
		async loadMember() {
			// this.tab = "list";
			// this.loading = true;
			// const datax = new Resource("Reader/getMember");
			// const { data } = await datax.get(getInfo()["details"][0]["client_guid"]);
			// const d = data;
			// this.listMember = d;
			// this.loading = false;
			new Resource("Reader/getMemberList")
				.get(getInfo()["details"][0]["client_guid"])
				.then(({ data }) => {
					setMember(data);
					this.datax = data;
				});
		},
	},
	mounted() {
		this.loadMember();
		if (getSelected()) {
			this.selected = getSelected();
		}
	},
	computed: {
		...mapGetters(["avatar"]),
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