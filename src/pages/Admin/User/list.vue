<template>
  <q-page>
    <div class="q-pa-sm">
      <q-card>
        <q-pull-to-refresh @refresh="getList">
          <q-table
            class="my-sticky-header-table"
            flat
            title="User Profile List"
            bordered
            :loading="loading"
            :columns="headers"
            :visible-columns="visibleColumns"
            :data="list"
            dense
            :filter="search"
            :pagination.sync="pagination"
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
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <info
                  @edit="edit(props.row)"
                  :showEdit="true"
                  :showCancel="false"
                  :disabledEdit="disabledEdit"
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
    <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn :disabled="allowadd" fab icon="add" color="primary" @click="add"/>
    </q-page-sticky>-->
  </q-page>
</template>
<script>
import Resource from "@/api/resource";
import EventBus from "./events";
import info from "#/Information";
export default {
  name: "list",
  components: { info },
  data() {
    return {
      allowadd: false,
      disabledEdit: false,
      disabledDel: false,
      disabledView: false,
      search: null,
      loading: false,
      headers: [
        { name: "User", label: "User Name", field: "name", align: "left" },
        { name: "Email", label: "Email", field: "email", align: "left" },
        { name: "Created", label: "Created", field: "Created", align: "left" },
        { name: "Status", label: "Status", field: "Status", align: "left" },
        {
          name: "actions",
          label: "Action",
          field: "actions",
          align: "right",
          width: "100px",
        },
      ],
      visibleColumns: [
        "User",
        "Email",
        "Created",
        "actions",
        "Office",
        "Status",
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
    // async checkpermission() {
    //   const par = {
    //     userid: this.$store.getters["userId"],
    //     frm: "User Profile",
    //   };
    //   const datax = new Resource("UserSettings/CheckPermission");
    //   const { data } = await datax.list(par);
    //   if (data.length === 0) {
    //     this.allowadd = true;
    //     this.disabledEdit = true;
    //     this.disabledDel = true;
    //     this.disabledView = true;
    //   } else {
    //     this.disabledView = data[0].Read === 1 ? false : true;
    //     this.allowadd = data[0].Create === 1 ? false : true;
    //     this.disabledEdit = data[0].Write === 1 ? false : true;
    //     this.disabledDel = data[0].Delete === 1 ? false : true;
    //   }
    // },
  },
  beforeMount() {
    // this.checkpermission();
  },
  mounted() {
    this.getList();
    EventBus.$on("list", () => {
      this.getList();
    });
  },
};
</script>
