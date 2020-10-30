<template>
  <div>
    <q-pull-to-refresh @refresh="getList">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
          inline-label
        >
          <q-tab name="barangay" label="Barangay" />
          <q-tab name="list" label="Persons" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="barangay">
            <q-table
              class="my-sticky-header-table"
              flat
              bordered
              :loading="loading"
              :columns="headers"
              :data="barangay"
              :dense="$q.screen.lt.md"
              :filter="search"
              :rows-per-page-options="[20,30]"
              row-key="idx"
              hide-top
            >
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <div class="col-auto">
                    <q-btn
                      @click="showName(props.row)"
                      color="grey-7"
                      size="sm"
                      round
                      flat
                      icon="arrow_forward_ios"
                    ></q-btn>
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
          </q-tab-panel>

          <q-tab-panel name="list">
            <q-table
              class="my-sticky-header-table"
              flat
              :title="BarangayName"
              bordered
              :loading="loading"
              :columns="headersList"
              :data="listsName"
              :dense="$q.screen.lt.md"
              :filter="searchName"
              :rows-per-page-options="[20,30]"
              row-key="idx"
              @row-click="onRowClick"
            >
              <template v-slot:top-left>
                <q-btn @click="print">Print</q-btn>
              </template>
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <div class="col-auto">
                    <q-btn color="grey-7" size="xs" round flat icon="arrow_forward_ios"></q-btn>
                  </div>
                </q-td>
              </template>
              <template v-slot:top-right>
                <q-input
                  dense
                  rounded
                  debounce="500"
                  style="width:150px"
                  v-model="searchName"
                  placeholder="Search"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
            </q-table>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-pull-to-refresh>
    <div style="position: absolute; visibility: hidden;" class="qrcode" ref="qrCodeUrl"></div>
  </div>
</template>
<script>
import Resource from "src/api/resource";
import { mapGetters } from "vuex";
import QRCode from "qrcodejs2";
import JsPDF from "jspdf";
export default {
  data() {
    return {
      tab: "barangay",
      search: "",
      searchName: "",
      loading: false,
      BarangayName: null,
      listsName: [],
      headers: [
        { name: "name", label: "Name", field: "brgy_name", align: "left" },
        { name: "actions", label: "Action", field: "action", align: "center" }
      ],
      headersList: [
        {
          name: "lastName",
          label: "Last Name",
          field: "lastName",
          align: "left"
        },
        {
          name: "firstName",
          label: "First Name",
          field: "firstName",
          align: "left"
        }
      ]
    };
  },
  methods: {
    // async getList(done) {
    //   this.loading = true;
    //   const datax = new Resource("Reader/barangay");
    //   const { data } = await datax.list();
    //   this.lists = data;
    //   this.loading = false;
    //   done();
    // },
    async print() {
      console.log(process.env);
      alert(process.env.MY_API);
      try {
        this.loading = true;
        const dataR = new Resource("Reader/Print");
        const par = { main: null };
        const { data } = await dataR.list();
        if (data.status === "success") {
          this.loading = false;
          window.open(
            "http://localhost:8000/quasar/backends_qr/public/" + "./prints.pdf"
          );
        }
      } catch (error) {
        this.$message({ message: error, type: "error" });
        this.loading = false;
      }

      // var doc = new JsPDF("", "pt", "a4"); //Initialize pdf

      // var canvasDiv = document.createElement("div"); //New dom element, if there is only one page, you can use the page element directly
      // canvasDiv.id = "canvas";
      // this.$refs.qrCodeUrl.append(canvasDiv);
      // var qrcode = new QRCode("canvas", {
      //   //qrcode generates QR code
      //   text: "sample",
      //   width: 70,
      //   height: 70,
      //   colorDark: "#000000",
      //   colorLight: "#ffffff",
      //   correctLevel: QRCode.CorrectLevel.H
      // });
      // let canvas = document.getElementById("canvas").querySelector("canvas"); //Get the canvas element
      // var dataURL = canvas.toDataURL();
      // canvas = null;

      // var img = new Image();
      // img.src = "nagacebu_brand_logo.png";
      // doc.text("Hello world!", 10, 20);
      // doc.addImage(img, "JPEG", 10, 10, 150, 40); //pdf to add image
      // doc.addImage(dataURL, "JPEG", 180, 10, 40, 40); //pdf to add image
      // doc.save("QRcode.pdf"); //Download
    },
    async showName(item) {
      console.log(item);
      this.tab = "list";
      this.Barangay = item.brgy_name;
      this.loading = true;
      const datax = new Resource("Reader/NamePerBarangay");
      const { data } = await datax.get(item.id);
      this.listsName = data;

      this.loading = false;
    },
    onRowClick(evt, row) {
      this.$emit("selected", row);
    }
  },
  mounted() {
    // this.getList();
  },
  computed: {
    ...mapGetters(["barangay"])
  }
};
</script>
<style lang="stylus" scoped>
.q-tab-panel {
  padding: 0px;
}

.q-card__section--vert {
  padding: 2px;
}
</style>