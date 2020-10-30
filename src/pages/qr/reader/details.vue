<template>
  <div>
    <q-card>
      <q-pull-to-refresh @refresh="getList">
        <q-table
          class="my-sticky-header-table"
          flat
          title="History"
          bordered
          :loading="loading"
          :columns="headers"
          :data="lists"
          :dense="$q.screen.lt.md"
          :filter="search"
          :rows-per-page-options="[20,30]"
          row-key="idx"
        >
          <template v-slot:top-right>
            <q-input
              dense
              rounded
              debounce="500"
              style="width:150px"
              v-model="search"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </q-pull-to-refresh>
    </q-card>
  </div>
</template>
<script>
import Resource from "src/api/resource";
export default {
  props: {
    codex: { type: String, default: "" }
  },
  data() {
    return {
      search: "",
      loading: false,
      lists: [],
      headers: [
        { name: "name", label: "Guard Name", field: "name", align: "center" },
        { label: "DateTime", field: "ts", align: "center" },
        { label: "Last Name", field: "lastName", align: "center" },
        { label: "First Name", field: "firstName", align: "center" }
      ]
    };
  },
  methods: {
    async getList(done) {
      this.loading = true;
      const datax = new Resource("Reader/details");
      const { data } = await datax.get(this.codex);
      this.lists = data;
      this.loading = false;
      done();
    }
  },
  mounted() {
    this.getList();
  },
  watch: {
    code: function(val) {
      this.getList();
    }
  }
};
</script>