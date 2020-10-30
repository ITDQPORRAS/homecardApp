<template>
  <div class="q-pa-xs row">
    <div class="col-12 col-md-12 q-pa-xs">
      <q-select
        ref="relation"
        dense
        v-model="v_department"
        :options="departmentData"
        option-value="id"
        option-label="department"
        label="Department"
        stack-label
        lazy-rules
        map-options
        emit-value
        input-debounce="0"
        use-input
        @filter="filterDepartment"
      />
    </div>
    <div class="col-12 col-md-12 q-pa-xs">
      <q-btn
        v-show="v_department"
        class="full-width"
        @click="ok"
        rounded
        color="primary"
        label="Ok"
      />
    </div>
  </div>
</template>
<script>
import Resource from "src/api/resource";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      v_department: null,
      departmentData: [],
    };
  },
  methods: {
    async getDepartment() {
      //   const { data } = await new Resource("Reader/Departments").list();
      this.department = this.DepartmentList;
    },
    filterDepartment(val, update) {
      if (val === "") {
        update(() => {
          this.departmentData = this.department;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.departmentData = this.department.filter(
          (v) => v.department.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    ok() {
      this.$emit("data", this.v_department);
    },
  },
  beforeMount() {
    this.getDepartment();
  },
  computed: {
    ...mapGetters(["DepartmentList"]),
  },
};
</script>