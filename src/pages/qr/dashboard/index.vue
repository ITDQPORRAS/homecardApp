<template>
  <q-page>
    <div class="q-pa-sm">
      <q-card>
        <q-pull-to-refresh @refresh="getList">
          <q-table
            class="my-sticky-header-table"
            flat
            title="Summary"
            bordered
            :loading="loading"
            :columns="headerSum"
            :data="listSum"
            :dense="$q.screen.lt.md"
            :filter="search"
            :rows-per-page-options="[30,60]"
            row-key="idx"
            hide-bottom
          >
            <!-- <template v-slot:top-center>
              <div lang="text-subtitle1">asd</div>
            </template>-->
            <!-- <template v-slot:top-right>
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
            </template>-->
            <!-- <template v-slot:bottom-row>
              <q-tr>
                <q-td class="text-subtitle2">
                  <b>TOTAL</b>
                </q-td>
                <q-td class="text-center">
                  <b>
                    {{ sumField('count').toFixed(0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                  </b>
                </q-td>
                <q-td class="text-center">
                  <b>
                    {{ sumField('6-12AM').toFixed(0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                  </b>
                </q-td>
                <q-td class="text-center">
                  <b>
                    {{ sumField('12-6PM').toFixed(0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                  </b>
                </q-td>
                <q-td class="text-center">
                  <b>
                    {{ sumField('6-12PM').toFixed(0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                  </b>
                </q-td>
              </q-tr>
            </template>-->
          </q-table>
          <q-separator spaced inset vertical dark />
          <q-table
            class="my-sticky-header-table"
            flat
            :title="Tally"
            bordered
            :loading="loading"
            :columns="headers"
            :data="lists"
            :dense="$q.screen.lt.md"
            :filter="search"
            :rows-per-page-options="[30,60]"
            row-key="idx"
          >
            <template v-slot:top-center>
              <div lang="text-subtitle1">asd</div>
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
            <template v-slot:bottom-row>
              <q-tr>
                <q-td class="text-subtitle2">
                  <b>TOTAL</b>
                </q-td>
                <q-td class="text-center">
                  <b>
                    {{ sumField('count').toFixed(0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                  </b>
                </q-td>
                <q-td class="text-center">
                  <b>
                    {{ sumField('6-12AM').toFixed(0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                  </b>
                </q-td>
                <q-td class="text-center">
                  <b>
                    {{ sumField('12-6PM').toFixed(0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                  </b>
                </q-td>
                <q-td class="text-center">
                  <b>
                    {{ sumField('6-12PM').toFixed(0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                  </b>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-pull-to-refresh>
      </q-card>
    </div>
    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn fab icon="filter_alt" @click="dlgfilter = true" color="primary" />
    </q-page-sticky>
    <dlg v-model="dlgfilter" :showCommand="false" title="Filter">
      <filterx @data="filter">
        <template v-slot>
          <div>
            <q-select
              v-model="facilityMain"
              :options="facility"
              option-value="id"
              option-label="facility_name"
              label="Facility"
              stack-label
              lazy-rules
              :rules="[
            val => val !== null && val !== '' || 'Please select a Facility',
          ]"
            />
          </div>
        </template>
      </filterx>
    </dlg>
  </q-page>
</template>
<script>
import Resource from "src/api/resource";
import dlg from "#/dlg";
import filterx from "#/filter";
export default {
  components: { dlg, filterx },
  data() {
    return {
      facilityMain: [],
      facility: [],
      mobile: this.$q.platform.is.mobile,
      dlgEntry: false,
      fab2: null,
      search: "",
      Tally: "Today",
      lists: [],
      loading: false,
      dlgfilter: false,
      filters: {
        from: this.$moment(new Date().toLocaleString()).format("YYYY-MM-DD"),
        to: this.$moment(new Date().toLocaleString()).format("YYYY-MM-DD"),
        facility: "%",
      },
      headers: [
        {
          name: "brgy_name",
          label: "Barangay",
          field: "brgy_name",
          align: "left",
        },
        { label: "Total", field: "count", align: "center" },
        { name: "6-12AM", label: "6-12 AM", field: "6-12AM", align: "center" },
        { name: "12-6PM", label: "12-6 PM", field: "12-6PM", align: "center" },
        { name: "6-12PM", label: "6-12 PM", field: "6-12PM", align: "center" },
      ],
      headerSum: [
        {
          name: "facility",
          label: "Facility",
          field: "facility",
          align: "left",
        },
        {
          name: "count",
          label: "Total",
          field: "count",
          align: "center",
          format: (val, row) =>
            `${parseFloat(val)
              .toFixed(0)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
        },
        ,
      ],
      listSum: [],
      idx: 0,
    };
  },
  mounted() {
    this.getFacility();
    this.getList();
  },
  methods: {
    async getFacility() {
      const { data } = await new Resource("facility").list();
      this.facility = data;
    },
    async getList(done) {
      try {
        this.Tally = "";
        this.filters.facility = this.facilityMain.id;
        this.loading = true;
        const datax = new Resource("Reader/dashboard");
        const { data } = await datax.list(this.filters);
        this.loading = false;
        this.lists = data.facility;
        this.listSum = data.summary;
        this.Tally = this.facilityMain.facility_name;
        done();
      } catch (error) {
        this.loading = false;
      }
    },
    sumField(key) {
      return this.lists.reduce(
        (a, b) => parseFloat(a) + (parseFloat(+b[key]) || 0),
        0
      );
    },
    filter(data) {
      this.dlgfilter = false;
      this.filters = data;
      this.filters["facility"] = this.facilityMain;
      this.getList();
    },
    setname() {},
  },
};
</script>