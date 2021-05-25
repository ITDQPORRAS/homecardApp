<template>
	<div class="row">
		<div class="col">
              <q-select clearable  v-model="data.groups" :options="['UCT','PANTAWID']" label="Group" />
        </div>
	</div>
</template>
<script>
export default {
    props: {
        data: {
            type: Object,
            default:null
        },
    },
    data() {
        return {
            groups: null
        }
    },
    watch: {
        'data.groups'() {
            this.$emit('save')
        }
    },
}
</script>