<template>
  <q-page class="row full-height items-center">
    <div class="col text-center q-pa-sm">
      <div v-if="notallowed" class="text-h6" color="red">
        <!-- <b>Not Allowed!</b> -->
        <q-btn flat style="color: #FF0080" label="Not Allowed!" />
      </div>

      <q-btn
        color="primary"
        rounded
        icon="camera_alt"
        label="Read QRCode"
        size="lg"
        @click="turnCameraOn()"
        v-show="!showCamera"
      >
        <q-inner-loading :showing="loading">
          <q-spinner-gears size="20px" color="primary" />
        </q-inner-loading>
      </q-btn>

      <div class="text-subtitle2" v-if="result">
        <q-btn @click="details" flat style="color: #FF0080" :label="lastlog" />
      </div>
      <div class="text-subtitle2" v-if="result">
        <b>{{ result }}</b>
      </div>
      <div class="text-h5" v-if="result">
        <b>{{ barangay }}</b>
      </div>
      <div v-if="result">
        <q-list redonly bordered separator v-for="(item,i) in results" :key="i">
          <q-slide-item @left="onLeft(item)" @right="onRight(item)">
            <template v-slot:left>
              <q-icon name="done" />
            </template>
            <template v-slot:right>
              <q-icon name="close" />
            </template>
            <q-item>
              <q-item-section avatar>
                <q-avatar
                  color="primary"
                  text-color="white"
                >{{ item.firstName.charAt(0) + item.lastName.charAt(0) }}</q-avatar>
              </q-item-section>
              <q-item-section>{{ item.firstName + " " + item.lastName}}</q-item-section>
            </q-item>
          </q-slide-item>
        </q-list>
      </div>
      <div v-if="showCamera">
        <qrcode-stream :camera="camera" @decode="onDecode"></qrcode-stream>
      </div>
    </div>
    <dlg v-model="dlgshow" title="Back" :showCommand="showCommand">
      <detailx :codex="result" />
    </dlg>
    <q-page-sticky v-if="showCamera" position="bottom-right" :offset="[18, 18]">
      <q-btn @click="turnCameraOff()" fab icon="videocam_off" color="accent" />
    </q-page-sticky>
  </q-page>
</template>
<script>
import { QrcodeStream } from "vue-qrcode-reader";
import Resource from "src/api/resource";
import dlg from "#/dlg";
import detailx from "./details";
export default {
  name: "PageIndex",
  components: { QrcodeStream, dlg, detailx },
  data() {
    return {
      loading: false,
      isValid: undefined,
      camera: "auto",
      result: null,
      showCamera: false,
      results: [],
      lastlog: null,
      barangay: null,
      dlgshow: false,
      showCommand: false,
      notallowed: false,

      location: null,
      gettingLocation: false,
      errorStr: null,
      locational: {
        long: null,
        lat: null,
      },
    };
  },
  methods: {
    async onLeft(item) {
      const par = { main: item, location: this.locational };
      const datax = new Resource("Reader/validated");
      const { data } = await datax.store(par);
      if (data.status === "sucess") {
        this.$q.notify(data.Message);
        this.turnCameraOn();
      } else {
      }
    },
    onRight(item) {
      // alert("right");
      // this.$q.notify("Right action triggered. Resetting in 1 second.");
    },
    finalize(reset) {
      this.timer = setTimeout(() => {
        reset();
      }, 1000);
    },
    async onDecode(content) {
      this.turnCameraOff();
      await this.getdata(content);
    },
    turnCameraOn() {
      this.camera = "auto";
      this.showCamera = true;
      this.result = null;
      this.notallowed = false;
    },
    turnCameraOff() {
      this.camera = "off";
      this.showCamera = false;
    },
    details() {
      this.dlgshow = true;
    },
    async getdata(id) {
      try {
        this.loading = true;
        const datax = new Resource("Reader/show");
        const { data } = await datax.get(id);
        this.loading = false;

        if (data.result.length > 0) {
          if (data.allowed.length !== 1) {
            this.notallowed = true;
            this.$q.notify({
              type: "negative",
              message: `Record not Allowed`,
            });
          }
          if (data.last) {
            this.lastlog = this.$moment(data.last.ts).fromNow();
          }
          if (data.info) {
            this.barangay = data.info.brgy_name;
          }
          this.result = id;
          this.loading = false;
          this.results = data.result;
        } else {
          this.loading = false;
          this.$q.notify({
            type: "negative",
            message: `No Record Found`,
          });
        }
      } catch (error) {
        this.loading = false;
      }
    },
    sendLoation() {},
  },
  mounted() {
    // this.getLocation();
  },
  created() {
    //do we support geolocation
    if (!("geolocation" in navigator)) {
      this.errorStr = "Geolocation is not available.";
      return;
    }
    this.gettingLocation = true;
    // get position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.gettingLocation = false;
        console.log(pos);
        this.locational.lat = pos.coords.latitude;
        this.locational.long = pos.coords.longitude;
      },
      (err) => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      }
    );
  },
};
</script>

<style scoped>
.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
}
</style>
