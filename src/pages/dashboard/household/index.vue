<template>
  <q-page>
    <div class="q-pa-xs row">
      <div class="col-6 col-md q-pa-xs">
        <q-card @click="total" v-ripple:green>
          <q-card-section class="bg-green-4 text-white">
            <countTo
              class="text-h4 text-center"
              :startVal="populationOld.count *1 || 0"
              :endVal="populations.count *1 || 0"
              :duration="3000"
            ></countTo>
            <div class="text-subtitle2 text-center">Total Population</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 col-md q-pa-xs">
        <q-card @click="down18" v-ripple:purple>
          <q-card-section class="bg-purple-4 text-white">
            <countTo
              class="text-h4 text-center"
              :startVal="populationOld['18<=']*1|| 0"
              :endVal="populations['18<=']*1|| 0"
              :duration="3200"
            ></countTo>
            <div class="text-subtitle2 text-center">18 yrs old and below</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md q-pa-xs">
        <q-card @click="mid" v-ripple:lime>
          <q-card-section class="bg-lime-4 text-white">
            <countTo
              class="text-h4 text-center"
              :startVal="populationOld['18>60<']*1|| 0"
              :endVal="populations['18>60<']*1|| 0"
              :duration="3400"
            ></countTo>
            <div class="text-subtitle2 text-center">18 above and 60 below</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 col-md q-pa-xs">
        <q-card @click="up60" v-ripple:red>
          <q-card-section class="bg-red-4 text-white">
            <countTo
              class="text-h4 text-center"
              :startVal="populationOld['60>=']*1|| 0"
              :endVal="populations['60>=']*1|| 0"
              :duration="3600"
            ></countTo>
            <div class="text-subtitle2 text-center">60 yrs old and above</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 col-md q-pa-xs">
        <q-card @click="nobirth" v-ripple:cyan>
          <q-card-section class="bg-cyan-4 text-white">
            <countTo
              class="text-h4 text-center"
              :startVal="populationOld['null']*1|| 0"
              :endVal="populations['null']*1|| 0"
              :duration="3800"
            ></countTo>
            <div class="text-subtitle2 text-center">No Birthdate</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 q-pa-xs">
        <q-table
          :title="title"
          :data="datax"
          :columns="columns"
          :filter="search"
          :pagination.sync="pagination"
          :loading="loading"
          @request="onRequest"
          binary-state-sort
          row-key="name"
          dense
        >
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
          <template v-slot:body-cell-lastName="props">
            <q-td :props="props">{{props.row.lastName}} {{props.row.suffix}}</q-td>
          </template>
          <template v-slot:header-cell-client_guid="props">
            <q-th :props="props">
              <q-input v-model="listHeader.client_guid" :label="props.col.label" type="text" dense></q-input>
            </q-th>
          </template>
          <template v-slot:header-cell-Barangay="props">
            <q-th :props="props">
              <q-input v-model="listHeader.Barangay" :label="props.col.label" type="text" dense></q-input>
            </q-th>
          </template>
          <template v-slot:header-cell-rep_address="props">
            <q-th :props="props">
              <q-input v-model="listHeader.rep_address" :label="props.col.label" type="text" dense></q-input>
            </q-th>
          </template>
          <template v-slot:header-cell-firstName="props">
            <q-th :props="props">
              <q-input v-model="listHeader.firstName" :label="props.col.label" type="text" dense></q-input>
            </q-th>
          </template>
          <template v-slot:header-cell-middleName="props">
            <q-th :props="props">
              <q-input v-model="listHeader.middleName" :label="props.col.label" type="text" dense></q-input>
            </q-th>
          </template>
          <template v-slot:header-cell-lastName="props">
            <q-th :props="props">
              <q-input v-model="listHeader.lastName" :label="props.col.label" type="text" dense></q-input>
            </q-th>
          </template>
          <template v-slot:header-cell-age="props">
            <q-th :props="props">
              <q-input v-model="listHeader.age" :label="props.col.label" type="text" dense></q-input>
            </q-th>
          </template>
          <template v-slot:header-cell-member_type="props">
            <q-th :props="props">
              <q-input v-model="listHeader.member_type" :label="props.col.label" type="text" dense></q-input>
            </q-th>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>
<script>
import Resource from "src/api/resource";
import countTo from "vue-count-to";
import { mapGetters } from "vuex";
export default {
  components: { countTo },
  data() {
    return {
      title: "Total Population",
      loading: false,
      pagination: {
        sortBy: "brgy_name",
        descending: false,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 15,
      },
      populationOld: {
        count: 0,
        "18<=": 0,
        "18>60<": 0,
        "60>=": 0,
        null: 0,
      },
      data: {
        total: 0,
        _18: 0,
        _60: 0,
        _mid: 0,
        _null: 0,
      },
      listHeader: {
        client_guid: "",
        Barangay: "",
        rep_address: "",
        firstName: "",
        middleName: "",
        lastName: "",
        age: "",
        member_type: "",
      },
      columns: [
        {
          name: "client_guid",
          label: "HH No.",
          field: "client_guid",
          align: "left",
          // sortable: true,
        },
        {
          name: "Barangay",
          label: "Barangay",
          field: "brgy_name",
          align: "left",
          // sortable: true,
        },
        {
          name: "rep_address",
          label: "Purok",
          field: "rep_address",
          align: "left",
          // sortable: true,
        },

        {
          name: "firstName",
          label: "First name",
          field: "firstName",
          align: "left",
          // sortable: true,
        },
        {
          name: "middleName",
          label: "Middle name",
          field: "middleName",
          align: "left",
          // sortable: true,
        },
        {
          name: "lastName",
          label: "last name",
          field: "lastName",
          align: "left",
          // sortable: true,
        },
        {
          name: "age",
          label: "Age",
          field: "age",
          align: "left",
          // sortable: true,
        },
        {
          name: "member_type",
          label: "Position",
          field: "member_type",
          align: "left",
          // sortable: true,
        },
      ],
      datax: [],
      search: "",
      type: "all",
      count: 0,
      countDown: 3,
    };
  },
  methods: {
    async onRequest(props) {
      if (this.countDown == 0) {
        this.loading = true;
        const { page, rowsPerPage, sortBy, descending } = props.pagination;
        const filter = this.listHeader;
        this.pagination.rowsNumber = await this.getRowsNumberCount(filter);
        // this.pagination.rowsNumber = this.count;
        const fetchCount =
          rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage;
        const startRow = (page - 1) * rowsPerPage;
        const returnedData = await this.fetchFromServer(
          startRow,
          fetchCount,
          filter,
          sortBy,
          descending
        );
        this.loading = false;
        this.datax = returnedData;
        this.pagination.page = page;
        this.pagination.rowsPerPage = rowsPerPage;
        this.pagination.sortBy = sortBy;
        this.pagination.descending = descending;
      }
    },
    async fetchFromServer(startRow, count, filter, sortBy, descending) {
      const par = {
        startRow: startRow,
        count: count,
        filter: filter,
        sortBy: sortBy,
        descending: descending,
        type: this.type,
      };
      const { data } = await new Resource("Dashboard/showPopulationList").list(
        par
      );
      return data;
    },
    async getRowsNumberCount(filter) {
      const par = {
        filter: filter,
        type: this.type,
      };
      const { data } = await new Resource("Dashboard/showPopulationCount").list(
        par
      );
      return data[0].count;
    },
    total() {
      this.countDown = 0;
      this.count = this.populations.count * 1 || 0;
      this.type = "all";
      this.title = "Total Population";
      const par = {
        pagination: this.pagination,
        filters: this.listHeader,
      };
      this.onRequest(par);
    },
    nobirth() {
      this.countDown = 0;
      this.count = this.populations["null"] * 1 || 0;
      this.type = "nobirth";
      this.title = "No Birthdate";
      const par = {
        pagination: this.pagination,
        filters: this.listHeader,
      };
      this.onRequest(par);
    },
    down18() {
      this.countDown = 0;
      this.count = this.populations["18<="] * 1 || 0;
      this.title = "18 yrs old and below";
      this.type = "18down";
      const par = {
        pagination: this.pagination,
        filters: this.listHeader,
      };
      this.onRequest(par);
    },
    mid() {
      this.countDown = 0;
      this.count = this.populations["18>60<"] * 1 || 0;
      this.type = "mid";
      this.title = "18 above and 60 below";
      const par = {
        pagination: this.pagination,
        filters: this.listHeader,
      };
      this.onRequest(par);
    },
    up60() {
      this.countDown = 0;
      this.count = this.populations["60>="] * 1 || 0;
      this.type = "60up";
      this.title = "60 yrs old and above";
      const par = {
        pagination: this.pagination,
        filters: this.listHeader,
      };
      this.onRequest(par);
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
  },
  mounted() {
    this.total();
  },
  watch: {
    listHeader: {
      handler(val) {
        this.countDown = 3;
        this.countDownTimer();
      },
      deep: true,
    },
    countDown(val) {
      if (val == 0) {
        const par = {
          pagination: this.pagination,
          filters: this.listHeader,
        };
        this.onRequest(par);
      }
    },
    populations: {
      handler(newVal, OldVal) {
        this.populationOld = OldVal;
      },
      deep: true,
    },
  },
  created() {
    this.countDownTimer();
  },
  computed: {
    ...mapGetters(["populations"]),
  },
};
</script>