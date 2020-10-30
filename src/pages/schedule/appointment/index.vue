<template>
  <q-page>
    <div class="q-pa-sm">
      <q-card>
        <q-tabs
          v-model="tab"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          :dense="$q.screen.lt.md"
          narrow-indicator
          inline-label
        >
          <q-tab name="barangay" label="Scheduled" />
          <q-tab name="list" label="List" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="barangay">
            <q-pull-to-refresh @refresh="refresh" icon="autorenew">
              <q-table
                class="my-sticky-header-table"
                flat
                bordered
                title="Scheduled"
                :loading="loading"
                :columns="headers"
                :data="showAppointed"
                dense
                :filter="search"
                :rows-per-page-options="[40,80]"
                row-key="passid"
                binary-state-sort
                hide-top
              >
                <template v-slot:body-cell-members_id="props">
                  <q-td :props="props">
                    <div>{{props.value}}</div>
                    <div class="my-table-details">{{ props.row.barangay }} - {{ props.row.purok }}</div>
                  </q-td>
                </template>
                <template v-slot:body-cell-fullname="props">
                  <q-td :props="props">
                    <div>{{props.value}}</div>
                    <div class="my-table-details">{{ $moment(props.row.ts).fromNow() }}</div>
                  </q-td>
                </template>
                <template v-slot:body-cell-Gender="props">
                  <q-td :props="props">
                    <div>{{props.value}}</div>
                    <div class="my-table-details">{{ props.row.age }}</div>
                  </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                  <q-td :props="props">
                    <div class="col-auto">
                      <q-btn color="grey-7" size="xs" round flat icon="more_vert">
                        <q-menu cover auto-close>
                          <q-list dense>
                            <q-item clickable v-ripple v-close-popup @click="approved(props.row)">
                              <q-item-section avatar>
                                <q-icon color="primary" name="thumb_up_alt" />
                              </q-item-section>
                              <q-item-section>Approved</q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item clickable v-ripple v-close-popup @click="declined(props.row)">
                              <q-item-section avatar>
                                <q-icon color="negative" name="thumb_down_alt" />
                              </q-item-section>
                              <q-item-section>Decline</q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item clickable v-ripple v-close-popup @click="onTransfer(props.row)">
                              <q-item-section avatar>
                                <q-icon color="green" name="repeat" />
                              </q-item-section>
                              <q-item-section>Transfer</q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </q-btn>
                    </div>
                  </q-td>
                </template>
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
          </q-tab-panel>

          <q-tab-panel name="list">
            <q-table
              class="my-sticky-header-table"
              flat
              bordered
              title="List"
              :loading="loading"
              :columns="headersList"
              :data="listsData"
              dense
              :filter="searchList"
              :rows-per-page-options="[20,40]"
              row-key="passid"
            >
              <template v-slot:top-right>
                <q-input
                  dense
                  rounded
                  debounce="500"
                  style="width:150px"
                  v-model="searchList"
                  placeholder="Search"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
              <template v-slot:body-cell-members_id="props">
                <q-td :props="props">
                  <div>{{props.value}}</div>
                  <div class="my-table-details">{{ props.row.barangay }} - {{ props.row.purok }}</div>
                </q-td>
              </template>
              <template v-slot:body-cell-fullname="props">
                <q-td :props="props">
                  <div>{{props.value}}</div>
                  <div class="my-table-details">{{ $moment(props.row.ts).fromNow() }}</div>
                </q-td>
              </template>
              <template v-slot:body-cell-Gender="props">
                <q-td :props="props">
                  <div>{{props.value}}</div>
                  <div class="my-table-details">{{ props.row.age }}</div>
                </q-td>
              </template>
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <div class="col-auto">
                    <q-btn color="grey-7" size="xs" round flat icon="more_vert">
                      <q-menu cover auto-close>
                        <q-list>
                          <q-item clickable v-ripple v-close-popup @click="onForward(props.row)">
                            <q-item-section avatar>
                              <q-icon color="green" name="skip_next" />
                            </q-item-section>
                            <q-item-section>Forward</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                </q-td>
              </template>
            </q-table>
            <xmenu showfilter @filter="dlgfilter = true" :showAdd="false" :showPrint="false"></xmenu>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
      <div style="position: absolute; visibility: hidden;" class="qrcode" ref="qrCodeUrl"></div>
    </div>
    <dlg v-model="dlgfilter" :showCommand="false" title="Filter">
      <filterx @data="showAppointList"></filterx>
    </dlg>
    <dlg v-model="dlgTransfer" :showCommand="false" :title="title">
      <department @data="transfered"></department>
    </dlg>
    <dlg v-model="dlgForward" :showCommand="false" :title="title">
      <department @data="forward"></department>
    </dlg>
  </q-page>
</template>
<script>
import { exportFile } from "quasar";
import Resource from "src/api/resource";
import { mapGetters } from "vuex";
import xmenu from "#/menu";
import filterx from "#/filter";
import dlg from "#/dlg";
import store from "src/store";
import department from "./transfer";
export default {
  components: {
    xmenu,
    filterx,
    dlg,
    department,
  },
  data() {
    return {
      title: "",
      selected: [],
      tab: "barangay",
      dlgfilter: false,
      dlgTransfer: false,
      dlgForward: false,
      search: "",
      searchList: "",
      showIndi: false,
      loading: false,
      mainData: [],
      headers: [
        {
          name: "members_id",
          label: "HN",
          field: "members_id",
          align: "left",
        },
        {
          name: "fullname",
          label: "Full name",
          field: "fullname",
          align: "left",
        },
        {
          name: "Gender",
          label: "Gender",
          field: "gender",
          align: "left",
        },
        { name: "actions", label: "Action", field: "action", align: "center" },
      ],
      listsData: [],
      headersList: [
        {
          name: "members_id",
          label: "HN",
          field: "members_id",
          align: "left",
        },
        {
          name: "fullname",
          label: "Full name",
          field: "fullname",
          align: "left",
        },
        {
          name: "Gender",
          label: "Gender",
          field: "gender",
          align: "left",
        },
        { name: "actions", label: "Action", field: "action", align: "center" },
      ],
    };
  },
  methods: {
    async refresh(done) {
      this.showAppoint();
      done();
    },
    async showAppoint() {
      await store.dispatch("global/showAppointed");
    },
    async showAppointList() {
      this.dlgfilter = false;
      const { data } = await new Resource(
        "Appointment/showAppointedList"
      ).list();
      this.listsData = data;
    },

    approved(item) {
      this.$q
        .dialog({
          title: "Confirmation",
          message:
            "Are you sure to approve this record " + item.members_id + " ?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.approveSave(item);
        })
        .onCancel(() => {
          // console.log('Cancel')
        });
    },
    declined(item) {
      this.$q
        .dialog({
          title: "Confirmation",
          message:
            "Are you sure to decline this record " + item.members_id + " ?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.declinedSave(item);
        })
        .onCancel(() => {
          // console.log('Cancel')
        });
    },
    onTransfer(item) {
      this.title = "Transfer";
      this.dlgTransfer = true;
      this.selected = item;
    },
    onForward(item) {
      this.title = "Forward";
      this.dlgForward = true;
      this.selected = item;
    },
    async transfered(item) {
      this.$q.loading.show();
      const par = { data: this.selected, department: item };
      this.dlgTransfer = false;
      const { data } = await new Resource("Appointment/transfer").store(par);
      this.showAppoint();
      this.$q.notify(data.Message);
      this.$q.loading.hide();
    },
    async forward(item) {
      this.$q.loading.show();
      const par = { data: this.selected, department: item };
      this.dlgForward = false;
      const { data } = await new Resource("Appointment/forward").store(par);
      this.showAppointList();
      this.$q.notify(data.Message);
      this.$q.loading.hide();
      this.$socket.client.emit("sendEntered", item);
    },
    async approveSave(item) {
      this.$q.loading.show();
      this.loading = true;
      const { data } = await new Resource("Appointment/approved").store(item);
      this.$q.notify(data.Message);
      this.loading = false;
      await this.showAppoint();
      this.$q.loading.hide();
      this.showAppointList();
    },
    async declinedSave(item) {
      this.$q.loading.show();
      this.loading = true;
      const { data } = await new Resource("Appointment/decline").store(item);
      this.$q.notify(data.Message);
      this.loading = false;
      await this.showAppoint();
      this.$q.loading.hide();
      this.showAppointList();
    },
    showList() {},
    async addNew() {
      await this.getRef();
    },
  },
  mounted() {
    // this.showAppointed();
    this.showAppointList();
  },
  computed: {
    ...mapGetters(["showAppointed"]),
  },
};
</script>
<style lang="stylus" scoped>
.q-tab-panel {
  padding: 0px;
}

.q-card__section--vert {
  padding: 2px;
}

.my-table-details {
  font-size: 0.85em;
  font-style: italic;
  max-width: 200px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
}
</style>