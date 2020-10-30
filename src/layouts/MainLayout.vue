<template>
	<q-layout view="hHh Lpr lff">
		<!-- <q-header elevated class="bg-primary text-white mybanner">
			<q-toolbar class="q-py-sm q-px-md">
				<q-btn
					dense
					flat
					round
					icon="menu"
					@click="leftDrawerOpen = !leftDrawerOpen"
				/>
				<q-toolbar-title>HomeCard</q-toolbar-title>
				<q-space />
				<div class="q-gutter-sm row items-center no-wrap">
					<q-btn round dense flat color="grey-8" icon="notifications">
						<q-badge color="red" text-color="white" floating>{{
							showAppointed.length
						}}</q-badge>
						<q-tooltip>Notifications</q-tooltip>
						<q-menu>
							<q-list>
								<router-link
									to="/appointment"
									exact
									tag="div"
									class="item item-link drawer-closer cursor-pointer"
								>
									<q-item class="q-my-sm" clickable v-ripple v-close-popup>
										<q-item-section avatar>
											<q-avatar color="primary" text-color="white">
												<q-badge color="red" text-color="white" floating>{{
													showAppointed.length
												}}</q-badge
												>A
											</q-avatar>
										</q-item-section>

										<q-item-section>
											<q-item-label>Appointments</q-item-label>
										</q-item-section>
									</q-item>
								</router-link>
							</q-list>
						</q-menu>
					</q-btn>
					<q-btn round flat>
						<q-avatar size="26px">
							<img src="https://cdn.quasar.dev/img/boy-avatar.png" />
						</q-avatar>
						<q-menu>
							<div class="row no-wrap q-pa-md">
								<div class="column items-center">
									<q-avatar size="72px">
										<img src="https://cdn.quasar.dev/img/boy-avatar.png" />
									</q-avatar>
									<div class="text-subtitle1 q-mt-md q-mb-xs">
										{{ this.name }}
									</div>
									<q-btn
										@click="logout"
										color="primary"
										label="Logout"
										push
										size="sm"
										v-close-popup
									/>
								</div>
							</div>
						</q-menu>
					</q-btn>
				</div>
			</q-toolbar>
		</q-header> -->
		<q-header elevated class="bg-white text-grey-8">
			<div v-if="!fixedHeader" class="row no-wrap">
				<q-toolbar class="col-12 bg-primary text-white">
					<q-btn
						flat
						dense
						round
						@click="leftDrawerOpen = !leftDrawerOpen"
						aria-label="Menu"
						icon="menu"
						class="q-mx-md"
					/>
					<q-toolbar-title>HomeCard</q-toolbar-title>

					<q-space />

					<div class="q-gutter-sm row items-center no-wrap">
						<q-btn round flat>
							<q-icon name="settings" />
							<q-tooltip>Settings</q-tooltip>
							<q-menu>
								<div class="row no-wrap q-pa-md">
									<div class="column">
										<div class="text-h6 q-mb-md">Settings</div>
										<q-btn
											class="glossy"
											rounded
											color="primary"
											label="Themes"
											@click="dlgthemes = true"
										/>
										<q-toggle
											:label="`Fixed Header (white background)`"
											v-model="fixedHeader"
										/>
										<q-toggle
											:label="`Dark Mode`"
											v-model="Dark"
											@click="Dark = !Dark"
										/>
									</div>
									<q-separator vertical inset class="q-mx-lg" />
									<div class="column items-center">
										<q-avatar size="72px">
											<img src="https://cdn.quasar.dev/img/boy-avatar.png" />
											<!-- <img :src="avatar || this.infox.avatar" /> -->
										</q-avatar>

										<div class="text-caption q-mt-md q-mb-xs text-center">
											{{ this.name || this.infox.name }}
										</div>

										<q-btn
											@click="logout"
											color="primary"
											label="Logout"
											push
											size="sm"
											v-close-popup
										/>
									</div>
								</div>
							</q-menu>
						</q-btn>
					</div>
				</q-toolbar>
			</div>
			<q-toolbar v-if="fixedHeader" class="GPLAY__toolbar text-black">
				<q-btn
					flat
					dense
					round
					@click="leftDrawerOpen = !leftDrawerOpen"
					aria-label="Menu"
					icon="menu"
					class="q-mx-md"
					color="primary"
				/>
				<q-toolbar-title>HomeCard</q-toolbar-title>
				<q-space />
				<div class="q-gutter-sm row items-center no-wrap">
					<q-btn color="primary" round flat>
						<q-icon name="settings" />
						<q-tooltip>Settings</q-tooltip>
						<q-menu>
							<div class="row no-wrap q-pa-md">
								<div class="column">
									<div class="text-h6 q-mb-md">Settings</div>
									<q-btn
										class="glossy"
										rounded
										color="primary"
										label="Themes"
										@click="dlgthemes = true"
									/>
									<q-toggle
										:label="`Fixed Header (white background)`"
										v-model="fixedHeader"
									/>
									<q-toggle
										:label="`Dark Mode`"
										v-model="Dark"
										@click="Dark = !Dark"
									/>
								</div>

								<q-separator vertical inset class="q-mx-lg" />

								<div class="column items-center">
									<q-avatar size="72px">
										<!-- <img :src="avatar || this.infox.avatar" /> -->
										<img src="https://cdn.quasar.dev/img/boy-avatar.png" />
									</q-avatar>

									<div class="text-caption q-mt-md q-mb-xs text-center">
										{{ this.name || this.infox.name }}
									</div>

									<q-btn
										@click="logout"
										color="primary"
										label="Logout"
										push
										size="sm"
										v-close-popup
									/>
								</div>
							</div>
						</q-menu>
					</q-btn>
				</div>
			</q-toolbar>
		</q-header>
		<q-drawer v-model="leftDrawerOpen" show-if-above bordered>
			<q-img class="absolute-top" style="height: 130px">
				<div class="absolute-bottom bg-transparent">
					<q-avatar size="56px" class="q-mb-sm">
						<img src="https://cdn.quasar.dev/img/boy-avatar.png" />
					</q-avatar>
					<div class="text-caption text-primary text-weight-bold">
						{{ this.userName }}
					</div>
					<div class="text-caption text-primary text-subtitle1">
						{{ this.name }}
					</div>
					<!-- <div>{{this.userName}}</div> -->
				</div>
			</q-img>
			<q-scroll-area
				style="
					height: calc(100% - 130px);
					margin-top: 130px;
					border-right: 1px solid #ddd;
				"
			>
				<q-list>
					<q-expansion-item
						group="somegroup"
						v-for="(item, i) in routess"
						:key="i"
						expand-separator
						:icon="item.icon"
						:label="item.name"
						:default-opened="item.open"
						v-show="item.hidden !== true"
					>
						<q-list
							v-for="(child, c) in item.children"
							:key="c"
							class="q-pl-lg"
						>
							<router-link
								:to="child.path"
								exact
								tag="div"
								class="item item-link drawer-closer cursor-pointer"
							>
								<q-item
									clickable
									v-ripple
									active-class="my-menu-link"
									:active="link === child.name"
									@click="link = child.name"
								>
									<q-item-section avatar>
										<q-icon color="primary" :name="child.icon" />
									</q-item-section>
									<q-item-section>{{ child.name }}</q-item-section>
								</q-item>
							</router-link>
						</q-list>
					</q-expansion-item>
				</q-list>
			</q-scroll-area>
		</q-drawer>
		<q-page-container>
			<transition
				appear
				enter-active-class="animated fadeIn"
				leave-active-class="animated fadeOut"
			>
				<!-- <keep-alive> -->
				<router-view />
				<!-- </keep-alive> -->
			</transition>
		</q-page-container>
		<q-dlg v-model="dlgthemes" title="Themes" :showCommand="false">
			<themes ref="themes" />
		</q-dlg>
	</q-layout>
</template>

<script>
import { mapGetters } from "vuex";
import themes from "#/q-themes";
// import EssentialLink from "components/EssentialLink.vue";
import { allRoutes } from "src/router";
import { getToken } from "src/utils/auth"; // get token from cookie
import store from "src/store";
import { Dark } from "quasar";
import { colors } from "quasar";
export default {
	name: "MainLayout",
	components: { themes },
	data() {
		return {
			Dark: false,
			fixedHeader: false,
			dlgthemes: false,
			tab: "home",
			leftDrawerOpen: !this.$q.platform.is.mobile,
			routess: [],
			link: "",
			infox: this.$q.localStorage.getItem("info") || [],
		};
	},
	sockets: {
		encodeMembers() {
			// alert("asd");
			store.dispatch("global/getPopulation");
		},
		receivedEntered(data) {
			// this.$q.notify({
			//   message: "New appointment",
			//   color: "green",
			//   avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
			//   position: "bottom",
			// });
			store.dispatch("global/showAppointed");
		},
	},
	mounted() {
		this.loadRoutes();
		this.chechAuth();
		colors.setBrand(
			"primary",
			this.$q.localStorage.getItem("themes") || "#31CCEC"
		);
	},
	methods: {
		loadRoutes() {
			allRoutes.forEach((element) => {
				element.forEach((el) => {
					this.routess.push(el);
				});
			});
		},
		async chechAuth() {
			// store.dispatch("user/getInfo");
			const hasToken = await store.dispatch("user/access");
			if (!hasToken) {
				this.$router.push("/login");
			} else {
				try {
					if (!this.userName) {
						store.dispatch("user/getInfo").catch((error) => {
							this.$router.push(this.redirect || "/");
						});
						store.dispatch("global/getData");
						store.dispatch("global/getPopulation");
						store.dispatch("global/showAppointed");
						store.dispatch("global/Departments");
					}
				} catch (error) {
					alert(error);
				}
			}
		},
		async logout() {
			this.$q.loading.show();
			this.$store.dispatch("user/logout");
			this.$router.push(`/login`);
			this.$q.loading.hide();
		},
	},
	watch: {
		tab: function (Val) {
			// this.$router.push({ name: "/home/" });
			this.$router.push("/" + Val);
		},
		userId(val) {
			this.$store.dispatch("user/getInfo");
			this.$store.dispatch("global/getData");
			store.dispatch("global/getPopulation");
			store.dispatch("global/showAppointed");
			store.dispatch("global/Departments");
		},
	},
	computed: {
		...mapGetters([
			"sidebar",
			"name",
			"avatar",
			"device",
			"userId",
			"userName",
			"showAppointed",
		]),
	},
};
</script>
<style scoped>
/* .q-toolbar {
  position: relative;
  padding: 0 10px 2px 2px !important;
  min-height: 50px;
  width: 100%;
} */
.mybanner {
	/* background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(82, 204, 81, 1) 36%,
    rgba(82, 204, 81, 1) 100%
  ); */
	background: linear-gradient(145deg, #1976d2 11%, #0f477e 75%);
}
.my-menu-link {
	color: black;
	background: #eaeef1;
	border-top-left-radius: 0px;
	border-top-right-radius: 20px;
	border-bottom-right-radius: 20px;
	border-bottom-left-radius: 0px;
}
</style>