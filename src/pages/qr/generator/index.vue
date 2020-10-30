<template>
  <q-page class="container">
    <div class="row justify-center">
      <div class="col-12 q-pt-lg text-center text-blue-grey-9">
        <span class="text-subtitle1">Enter QRCode</span>
      </div>
      <div class="col-10 q-pt-lg text-center">
        <q-input rounded outlined v-model="text" :readonly="!read" label="Value">
          <template v-slot:append>
            <q-icon name="loop" @click="read = !read" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
      <div class="col-12 q-pt-md text-center">
        <qriously :value="text" :size="230" />
      </div>
    </div>
    <dlg v-model="dlgshow" title="Back" :showCommand="showCommand">
      <detailx @selected="selected" />
    </dlg>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="filter_alt" @click="dlgshow = true" color="primary" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { Cookies } from "quasar";
import dlg from "#/dlg";
import detailx from "./barangay";
export default {
  components: { detailx, dlg },
  name: "Generator",
  data() {
    return {
      text: "",
      read: false,
      dlgshow: false,
      showCommand: false
    };
  },
  mounted() {
    this.getCode();
  },
  methods: {
    getCode() {
      this.text = this.$q.cookies.get("codex");
    },
    selected(item) {
      this.dlgshow = false;
      this.text = item.client_guid;
    }
  },
  watch: {
    text: function(val) {
      Cookies.set("codex", val);
    }
  }
};
</script>
