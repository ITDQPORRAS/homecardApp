<template>
	<div class="q-pa-sm">
		<q-table
			title="Willing to Vaccine"
			:data="data"
			:columns="columns"
			row-key="name"
			:pagination.sync="pagination"
			hide-bottom
		/>
	</div>
</template>
<script>
import Resource from "src/api/resource";
export default {
	data() {
		return {
			data: [],
			pagination: {
				descending: false,
				page: 1,
				rowsPerPage: 15,
				rowsNumber: 15,
			},
			columns: [
				{
					label: "Category",
					field: "category",
					align: "left",
				},
				{
					label: "Yes",
					field: "Yes",
					// format: (val, row) => `${val}%`,
					format: (val, row) =>
						`${parseFloat(val)
							.toFixed(2)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} %`,
				},
				{
					label: "No",
					field: "No",
					format: (val, row) =>
						`${parseFloat(val)
							.toFixed(2)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} %`,
				},
				{
					label: "Unknown",
					field: "Unknown",
					format: (val, row) =>
						`${parseFloat(val)
							.toFixed(2)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} %`,
				},
				{
					label: "Yes",
					field: "yescount",
					format: (val, row) =>
						`${parseFloat(val)
							.toFixed(0)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
				},
				{
					label: "No",
					field: "nocount",
					format: (val, row) =>
						`${parseFloat(val)
							.toFixed(0)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
				},
				{
					label: "Unknown",
					field: "unknowncount",
					format: (val, row) =>
						`${parseFloat(val)
							.toFixed(0)
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
				},
			],
		};
	},
	methods: {
		async getPercentage() {
			await new Resource("vaccine/getPercentage").list().then(({ data }) => {
				this.data = data;
			});
		},
	},
	mounted() {
		this.getPercentage();
	},
};
</script>