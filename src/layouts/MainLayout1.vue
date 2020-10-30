<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-toolbar-title>Title</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-expansion-item expand-separator icon="perm_identity" label="Account">
          <q-list>
            <router-link
              to="/rans"
              exact
              tag="div"
              class="item item-link drawer-closer cursor-pointer"
            >
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="bluetooth" />
                </q-item-section>

                <q-item-section>Icon as avatar</q-item-section>
              </q-item>
            </router-link>
            <router-link to="/" exact tag="div" class="item item-link drawer-closer cursor-pointer">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="teal" text-color="white" icon="bluetooth" />
                </q-item-section>

                <q-item-section>Avatar-type icon</q-item-section>
              </q-item>
            </router-link>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar rounded color="purple" text-color="white" icon="bluetooth" />
              </q-item-section>

              <q-item-section>Rounded avatar-type icon</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white">R</q-avatar>
              </q-item-section>

              <q-item-section>Letter avatar-type</q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-expansion-item expand-separator icon="signal_wifi_off" label="Wifi settings">
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from "components/EssentialLink.vue";

export default {
  name: "MainLayout",

  // components: {
  //   EssentialLink
  // },

  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.mobile,
      essentialLinks: [
        {
          title: "Docs",
          caption: "quasar.dev",
          icon: "school",
          link: "https://quasar.dev"
        },
        {
          title: "Github",
          caption: "github.com/quasarframework",
          icon: "code",
          link: "https://github.com/quasarframework"
        },
        {
          title: "Discord Chat Channel",
          caption: "chat.quasar.dev",
          icon: "chat",
          link: "https://chat.quasar.dev"
        },
        {
          title: "Forum",
          caption: "forum.quasar.dev",
          icon: "record_voice_over",
          link: "https://forum.quasar.dev"
        },
        {
          title: "Twitter",
          caption: "@quasarframework",
          icon: "rss_feed",
          link: "https://twitter.quasar.dev"
        },
        {
          title: "Facebook",
          caption: "@QuasarFramework",
          icon: "public",
          link: "https://facebook.quasar.dev"
        },
        {
          title: "Quasar Awesome",
          caption: "Community Quasar projects",
          icon: "favorite",
          link: "https://awesome.quasar.dev"
        }
      ]
    };
  }
};
</script>
