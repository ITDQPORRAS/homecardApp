
<template>
	<div>
		<q-input
			v-model="form.date_positive"
			label="Positive Date"
			stack-label
			mask="date"
		>
			<template v-slot:append>
				<q-icon name="event" class="cursor-pointer">
					<q-popup-proxy
						ref="qDateProxy1"
						transition-show="scale"
						transition-hide="scale"
					>
						<q-date
							v-model="form.date_positive"
							@input="() => $refs.qDateProxy1.hide()"
						/>
					</q-popup-proxy>
				</q-icon>
			</template>
		</q-input>

		<div>
			<q-select
				ref="status"
				v-model="form.finalRemarks"
				:options="finalRemarks"
				label="Final Status"
				stack-label
				lazy-rules
			></q-select>
		</div>

		<q-input v-model="form.date_recovered" label="Date" stack-label mask="date">
			<template v-slot:append>
				<q-icon name="event" class="cursor-pointer">
					<q-popup-proxy
						ref="qDateProxy3"
						transition-show="scale"
						transition-hide="scale"
					>
						<q-date
							v-model="form.date_recovered"
							@input="() => $refs.qDateProxy3.hide()"
						/>
					</q-popup-proxy>
				</q-icon>
			</template>
		</q-input>
	</div>
</template>>
<script>
export default {
	props: {
		form: Object,
	},
	data() {
		return {
			finalRemarks: ["RECOVERED", "DECEASED"],
		};
	},
};
</script>
