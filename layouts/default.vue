<template>
  <div id="app">
    <v-app>
      <mobNavBar
        class="navbar"
        v-if="!$vuetify.breakpoint.mdAndUp && $vuetify.breakpoint.width != 0"
      />

      <navBar
        v-if="$vuetify.breakpoint.mdAndUp && $vuetify.breakpoint.width != 0"
        class="navbar"
      />

      <sideNav />

      <nuxt></nuxt>

      <defaultFooter />
    </v-app>
  </div>
</template>

<script>
import mobNavBar from "./default/navbar/mobNavBar";
import navBar from "./default/navbar/navBar";
import defaultFooter from "./default/defaultFooter";
import sideNav from "./default/sideNav";

export default {
  components: {
    mobNavBar,
    navBar,
    defaultFooter,
    sideNav
  },
  data() {
    return {};
  },
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true });
  }
};
</script>
<style lang="scss">
.navbar {
  z-index: 9999;
  height: auto;
}

* {
  font-size: 1rem;
}
@media (max-width: 1200px) {
  * {
    font-size: 0.9rem;
  }
}
@media (max-width: 992px) {
  * {
    font-size: 0.87rem;
  }
}
@media (max-width: 768px) {
  * {
    font-size: 0.84rem;
  }
}
@media (max-width: 576px) {
  * {
    font-size: 0.81rem;
  }
}
@media (max-width: 380px) {
  * {
    font-size: 0.78rem;
  }
}
</style>
