<template>
	<q-page>
		<div class="q-pa-sm">
			<q-card>
				<q-pull-to-refresh @refresh="getList">
					<q-table
						class="my-sticky-header-table"
						flat
						title="Member Approval"
						bordered
						:loading="loading"
						:columns="headers"
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

						<template v-slot:body-cell-Created="props">
							<q-td :props="props">
								<div>{{ $moment(props.row.Created).fromNow() }}</div>
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
											clickable
											v-ripple
											@click="Docs(props.row)"
											v-close-popup
										>
											<q-item-section avatar>
												<q-icon name="attach_file" />
											</q-item-section>
											<q-item-section>View Docs</q-item-section>
										</q-item>
									</template>
								</info>
							</q-td>
						</template>
					</q-table>
				</q-pull-to-refresh>
			</q-card>
			<q-dlg
				v-model="dlgRegister"
				:title="selectedDocs.name"
				:showCommand="false"
			>
				<AttachmentGallery
					:idx="idx"
					:uid="uid"
					:parameters="parameters"
					@done="getList"
				/>
			</q-dlg>
		</div>
	</q-page>
</template>
<script>
import Resource from "@/api/resource";
import EventBus from "./events";
import info from "#/Information";
import { LocalStorage } from "quasar";
import AttachmentGallery from "./documentsAttach";
export default {
	name: "list",
	components: { info, AttachmentGallery },
	data() {
		return {
			idx: 0,
			uid: 0,
			parameters: {},
			selectedDocs: [],
			dlgRegister: false,

			allowadd: false,
			disabledEdit: false,
			disabledDel: false,
			disabledView: false,
			search: null,
			loading: false,
			headers: [
				{
					name: "name",
					label: "Name",
					field: "name",
					align: "left",
				},
				{
					name: "birthdate",
					label: "Birth Date",
					field: "birthdate",
					align: "left",
				},
				{
					name: "brgy_name",
					label: "Barangay",
					field: "brgy_name",
					align: "left",
				},
				{
					name: "rep_address",
					label: "Purok",
					field: "rep_address",
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
				const datax = new Resource("UserSettings/MemberApproval");
				const { data } = await datax.list(this.filter);
				this.list = data;
				this.loading = false;
				this.dlgRegister = false;
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
		async Docs(item) {
			this.dlgRegister = true;
			this.idx = item.id;
			this.uid = item.id;
			this.selectedDocs = item;
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
