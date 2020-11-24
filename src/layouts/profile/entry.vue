<template>
	<div class="q-pa-sm">
		<div class="row q-col-gutter-md">
			<div class="col-12 col-md-3">
				<q-input
					:dense="$q.screen.lt.md"
					stack-label
					ref="firstName"
					color="primary"
					v-model="form.firstName"
					label="First Name"
				></q-input>
			</div>
			<div class="col-12 col-md-3">
				<q-input
					:dense="$q.screen.lt.md"
					stack-label
					ref="middleName"
					color="primary"
					v-model="form.middleName"
					label="Middle Name"
				></q-input>
			</div>
			<div class="col-8 col-md-3">
				<q-input
					:dense="$q.screen.lt.md"
					stack-label
					ref="lastName"
					color="primary"
					v-model="form.lastName"
					label="Last Name"
					lazy-rules
				></q-input>
			</div>
			<div class="col-4 col-md-3">
				<q-input
					:dense="$q.screen.lt.md"
					stack-label
					color="primary"
					v-model="form.suffix"
					label="Extension"
				></q-input>
			</div>
			<div class="col-6 col-md-3">
				<q-input
					v-model="form.birthdate"
					mask="date"
					label="Birth Date"
					stack-label
					:dense="$q.screen.lt.md"
				>
					<template v-slot:hint>YYYY/MM/DD</template>
					<template v-slot:append>
						<q-icon name="event" class="cursor-pointer">
							<q-popup-proxy
								ref="qDateProxy"
								transition-show="scale"
								transition-hide="scale"
							>
								<q-date
									v-model="form.birthdate"
									@input="() => $refs.qDateProxy.hide()"
								/>
							</q-popup-proxy>
						</q-icon>
					</template>
				</q-input>
			</div>
			<div class="col-6 col-md-3">
				<q-select
					:dense="$q.screen.lt.md"
					v-model="gender"
					:options="genderx"
					option-value="Gender"
					option-label="Gender"
					label="Gender"
					stack-label
					lazy-rules
				/>
			</div>
			<div class="col-6 col-md-3">
				<q-input
					:dense="$q.screen.lt.md"
					:readonly="datax.rep_id === 0 ? false : true"
					stack-label
					ref="purok"
					v-model="datax.rep_address"
					color="primary"
					label="Purok"
				></q-input>
			</div>
			<div class="col-6 col-md-3">
				<q-input
					readonly
					:dense="$q.screen.lt.md"
					stack-label
					ref="Barangay"
					v-model="datax.brgy_name"
					color="primary"
					label="Barangay"
				></q-input>
			</div>
			<div class="col-6 col-md-6">
				<q-select
					ref="relation"
					:dense="$q.screen.lt.md"
					v-model="form.member_type"
					:options="relation"
					option-value="id"
					option-label="description"
					label="Relationship"
					stack-label
					lazy-rules
					:rules="[
						(val) =>
							(val !== null && val !== '') || 'Please select a relationship',
					]"
				/>
			</div>
			<div class="col-6 col-md-6">
				<q-input
					:dense="$q.screen.lt.md"
					stack-label
					ref="contact_number"
					color="primary"
					v-model="form.contact_number"
					label="Contact #"
				></q-input>
			</div>
			<div class="col-12 col-md-12 text-right">
				<q-btn
					@click="save"
					:loading="loading"
					outline
					color="primary"
					label="Save"
				/>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			datax: [],
			form: {
				lastName: "",
				firstName: "",
				middleName: null,
				suffix: null,
				birthdate: "",
				gender: "",
				members_id: null,
				client_guid: null,
				member_type: null,
				contact_number: null,
			},
		};
	},
	mounted() {
		this.datax = { brgy_name: "", rep_address: "", rep_id: 0, client_guid: "" };
	},
};
</script>