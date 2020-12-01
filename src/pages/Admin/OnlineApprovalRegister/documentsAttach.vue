<template>
	<div>
		<v-col>
			<v-card>
				<el-form :model="form" ref="entryForm" label-position="left">
					<el-row :gutter="10">
						<el-col>
							<v-col>
								<AttachmentGallery
									:images="images"
									@remove="onRemove"
									:skel="skel"
								/>
							</v-col>
						</el-col>
						<el-col>
							<q-btn
								color="primary"
								class="full-width"
								icon="check"
								label="Approved"
								@click="Approved"
							/>
						</el-col>
					</el-row>
				</el-form>
			</v-card>
		</v-col>
	</div>
</template>
<script>
import Resource from "@/api/resource";
import AttachmentGallery from "./doc";
import { axiosInstance } from "src/boot/axios";
export default {
	components: { AttachmentGallery },
	props: {
		idx: Object,
		proj_id: String,
		parameters: Object,
		uid: String,
	},
	data: () => ({
		skel: true,
		form: {
			id: 0,
			agenda_name: null,
		},
		// parameters: [],
		files: null,
		urlx: "",
		images: [],
		loading: false,
		idxx: null,
	}),
	methods: {
		async Approved() {
			this.$q.loading.show();
			await new Resource("online/approved").get(this.uid).then(({ data }) => {
				this.$q.notify(data.Message);
				this.$q.loading.hide();
				this.$emit("done");
			});
		},
		reset() {
			this.$refs.myFileInput.value = "";
		},
		onRemove(item) {
			this.idxx = item;
			this.remove();
		},

		async getImage() {
			const datax = new Resource("online/getAttach");
			await datax
				.get(this.idx)
				.then(({ data }) => {
					if (data.length == 0) {
						this.skel = false;
					}
					data.forEach((element, x) => {
						axiosInstance
							.get("online/documentView/" + element.id, {
								responseType: "arraybuffer",
							})
							.then((res) => {
								this.skel = false;
								let blob = new Blob([res], { type: "application/*" });
								blob.name = element.file_name;
								let datax = {
									description: element.file_name,
									image: window.URL.createObjectURL(blob),
									id: element.id,
									name: element.entry_type,
								};
								this.images.push(datax);
							})
							.catch(() => {
								this.skel = false;
							});
					});
				})
				.catch(() => {
					this.skel = false;
				});
			// this.images = data;
		},
	},
	created() {
		this.urlx = "mod_bac/project/upload";
		this.getImage();
	},
	watch: {
		"idx.id": {
			handler(NewData, oldData) {
				this.images = [];
				this.getImage();
			},
		},
	},
};
</script>
