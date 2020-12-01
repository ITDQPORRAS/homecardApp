<template>
	<q-page>
		<div class="q-pa-sm">
			<q-card>
				<q-pull-to-refresh @refresh="getList">
					<q-table
						class="my-sticky-header-table"
						flat
						title="Online User"
						bordered
						:loading="loading"
						:columns="headers"
						:visible-columns="visibleColumns"
						:data="list"
						:dense="$q.screen.lt.md"
						:filter="search"
						:pagination.sync="pagination"
					>
						<template v-slot:top-right>
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
						</template>

						<template v-slot:body-cell-User="props">
							<q-td :props="props">
								<span style="margin-right: 10px">
									<q-avatar
										:class="{
											'bg-positive': [
												'A',
												'I',
												'C',
												'P',
												'F',
												'T',
												'h',
												'a',
												'c',
												'd',
												'e',
												'f',
												'g',
												'0',
												'4',
												'5',
											].includes(props.row.name.charAt(0)),
											'bg-warning': [
												'H',
												'B',
												'J',
												'E',
												'R',
												'L',
												'U',
												'N',

												'i',
												'j',
												'k',
												'l',
												'm',
												'n',
												'6',
												'7',
												'8',
											].includes(props.row.name.charAt(0)),
											'bg-info': [
												'O',
												'D',
												'b',
												'Q',
												'K',
												'M',
												'S',
												'G',

												'o',
												'p',
												'q',
												'r',
												's',
												't',
												'u',
												'9',
												'&',
												'@',
												'(',
												')',
												'+',
												'[',
												']',
												'/',
											].includes(props.row.name.charAt(0)),
											'bg-negative': [
												'V',
												'W',
												'X',
												'Y',
												'Z',
												'v',
												'w',
												'x',
												'y',
												'z',
												'1',
												'2',
												'3',
											].includes(props.row.name.charAt(0)),
										}"
										size="30px"
										text-color="white"
										>{{ props.row.name.charAt(0) }}</q-avatar
									></span
								>
								<span>{{ props.row.name }}</span>
							</q-td>
						</template>
						<template v-slot:body-cell-actions="props">
							<q-td :props="props">
								<info
									@edit="edit(props.row)"
									:showEdit="false"
									:showCancel="false"
								>
									<template v-slot>
										<q-item
											v-show="showVerified(props.row.Status)"
											clickable
											v-ripple
											@click="verify(props.row)"
											v-close-popup
										>
											<q-item-section avatar>
												<q-icon name="thumb_up" />
											</q-item-section>
											<q-item-section>Verify</q-item-section>
										</q-item>
									</template>
								</info>
							</q-td>
						</template>
					</q-table>
				</q-pull-to-refresh>
			</q-card>
		</div>
	</q-page>
</template>
<script>
import Resource from "@/api/resourceOnline";
import EventBus from "./events";
import info from "#/q-information";
import { LocalStorage } from "quasar";
const TokenKey = "lgisOnline";
export default {
	name: "list",
	components: { info },
	data() {
		return {
			loginForm: {
				email: "itdqporrasssss@gmail.com",
				password: "itdqporras",
			},
			allowadd: false,
			disabledEdit: false,
			disabledDel: false,
			disabledView: false,
			search: null,
			loading: false,
			headers: [
				{
					name: "businesskind",
					label: "Kind of Business",
					field: "businesskind",
					align: "left",
				},
				{
					name: "tradeName",
					label: "Trade Name",
					field: "tradeName",
					align: "left",
				},
				{
					name: "businessName",
					label: "Business Name",
					field: "businessName",
					align: "left",
				},
				{ name: "Email", label: "Email", field: "email", align: "left" },
				{
					name: "taxpayer",
					label: "Tax Payer",
					field: "taxpayer",
					align: "left",
				},
				{ name: "Created", label: "Created", field: "Created", align: "left" },

				{
					name: "actions",
					label: "Action",
					field: "actions",
					align: "right",
					width: "100px",
				},
			],

			list: [],
			pagination: {
				page: 1,
				rowsPerPage: 15, // 0 means all rows
			},
		};
	},
	methods: {
		async getToken() {
			await new Resource("token")
				.post(this.loginForm)
				.then(({ data }) => {
					LocalStorage.set(TokenKey, data.token);
					this.getList();
				})
				.catch((error) => {
					this.$q.notify("Something Wrong!");
				});
		},
		async getInfo() {
			await new Resource("profile/getInfo")
				.get(getInfo()["user"].app_id)
				.then(({ data }) => {
					console.log(data);
				})
				.catch((error) => {
					this.$q.notify("Something Wrong!");
				});
		},
		showVerified: function (val) {
			if (val === "For Admin Verification") {
				return true;
			} else {
				return false;
			}
		},
		async getList(done) {
			try {
				this.loading = true;
				const datax = new Resource("UserSettings/GetUserList");
				const { data } = await datax.list(this.filter);
				this.list = data;
				this.loading = false;
				done();
			} catch (error) {
				this.loading = false;
			}
		},
		async add() {
			try {
				EventBus.$emit("entry");
				EventBus.$emit("add");
				this.loading = false;
			} catch (error) {
				this.loading = false;
			}
		},
		async edit(item) {
			try {
				EventBus.$emit("entry");
				EventBus.$emit("edit", item);
				this.loading = false;
			} catch (error) {
				this.loading = false;
			}
		},
		async verify(item) {
			try {
				this.$q.loading.show();
				this.loading = true;
				const par = { userid: item.id };
				const datax = new Resource("UserSettings/VerifyUser");
				const { data } = await datax.store(par);
				this.$q.notify(data.Message);
				this.getList();
				this.$q.loading.hide();
				this.loading = false;
			} catch (error) {
				this.$q.notify(error);
				this.$q.loading.hide();
				this.loading = false;
			}
		},
	},

	mounted() {
		this.getList();
		EventBus.$on("list", () => {
			this.getList();
		});
	},
};
</script>
