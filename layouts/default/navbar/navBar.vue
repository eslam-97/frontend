<template>
  <div class="bar-height">
    <v-app-bar
      class="app-bar"
      elevate-on-scroll
      fixed
      hide-on-scroll
      scroll-target=""
      color=" blue-grey lighten-5"
    >
      <nuxt-link class="text-decoration-none black--text" to="/">
        <p :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'" class="header-title">
          TECH SHOP
        </p>
      </nuxt-link>
      <template v-slot:extension>
        <v-tabs
          @click="tab = 5"
          hide-slider
          :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
          :optional="true"
          active-class="orange--text text--darken-4"
          v-model="tab"
          class="nav-tabs"
        >
          <v-tab
            nuxt
            active-class="orange--text text--darken-4"
            to="/laptop"
            :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
            @mouseover="tab = 0"
            @mouseout="tab = null"
            class="black--text tab-0"
          >
            {{ $t("LAPTOP") }}
          </v-tab>
          <v-tab
            nuxt
            to="/mobile"
            active-class="orange--text text--darken-4"
            :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
            @mouseover="tab = 1"
            @mouseout="tab = null"
            class="black--text tab-1"
          >
            {{ $t("MOBILE") }}
          </v-tab>

          <v-tab
            nuxt
            to="/tablet"
            active-class="orange--text text--darken-4"
            :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
            @mouseover="tab = 2"
            @mouseout="tab = null"
            class="black--text tab-2"
          >
            {{ $t("TABLET") }}
          </v-tab>

          <v-tab
            nuxt
            active-class="orange--text text--darken-4"
            to="accessories"
            :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
            @mouseover="tab = 3"
            @mouseout="tab = null"
            class="black--text tab-3"
          >
            {{ $t("ACCESSORIES") }}
          </v-tab>

          <v-tabs-items id="nav-tabs-position" v-model="tab">
            <v-tab-item
              class="nav-content"
              @mouseover="tab = 0"
              @mouseleave="tab = null"
              transition="fade-transition"
            >
              <v-list class="grey lighten-2" nav>
                <v-list-item
                  v-for="brand in productCategories.LAPTOP"
                  @click="filterByBrand('LAPTOP', brand.en_brand)"
                  :key="brand.en_brand"
                  link
                >
                  <span v-if="$i18n.locale == 'en'" class="black--text">
                    {{ brand.en_brand }}</span
                  >
                  <span v-if="$i18n.locale == 'ar'" class="black--text">
                    {{ brand.ar_brand }}</span
                  >
                </v-list-item>
              </v-list>
            </v-tab-item>

            <v-tab-item
              class="nav-content"
              @mouseover="tab = 1"
              @mouseleave="tab = null"
              transition="fade-transition"
            >
              <v-list class="grey lighten-2">
                <v-list-item
                  v-for="brand in productCategories.MOBILE"
                  :key="brand.en_brand"
                  @click="filterByBrand('MOBILE', brand.en_brand)"
                  class="text-decoration-none"
                >
                  <span v-if="$i18n.locale == 'en'" class="black--text">
                    {{ brand.en_brand }}</span
                  >
                  <span v-if="$i18n.locale == 'ar'" class="black--text">
                    {{ brand.ar_brand }}</span
                  >
                </v-list-item>
              </v-list>
            </v-tab-item>

            <v-tab-item
              class="nav-content"
              @mouseover="tab = 2"
              @mouseleave="tab = null"
              transition="fade-transition"
            >
              <v-list class="grey lighten-2">
                <v-list-item
                  v-for="brand in productCategories.TABLET"
                  :key="brand.en_brand"
                  @click="filterByBrand('TABLET', brand.en_brand)"
                  link
                >
                  <span v-if="$i18n.locale == 'en'" class="black--text">
                    {{ brand.en_brand }}</span
                  >
                  <span v-if="$i18n.locale == 'ar'" class="black--text">
                    {{ brand.ar_brand }}</span
                  >
                </v-list-item>
              </v-list>
            </v-tab-item>

            <v-tab-item
              class="nav-content"
              @mouseover="tab = 3"
              @mouseleave="tab = null"
              transition="fade-transition"
            >
              <v-list class="grey lighten-2">
                <v-list-item
                  v-for="brand in productCategories.ACCESSORIES"
                  :key="brand.en_brand"
                  @click="filterByBrand('ACCESSORIES', brand.en_brand)"
                  link
                >
                  <span v-if="$i18n.locale == 'en'" class="black--text">
                    {{ brand.en_brand }}</span
                  >
                  <span v-if="$i18n.locale == 'ar'" class="black--text">
                    {{ brand.ar_brand }}</span
                  >
                </v-list-item>
              </v-list>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </template>
      <v-spacer></v-spacer>
      <div class="search-input">
        <search />
      </div>
      <v-spacer></v-spacer>
      <navIcons />
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import navIcons from "./navIcons";
import search from "~/components/main/search";

export default {
  name: "navBar",
  data() {
    return {
      tab: null
    };
  },

  components: {
    navIcons,
    search
  },

  methods: {
    filterByBrand(type, brand) {
      this.$router.push(this.localePath("/" + type));
      setTimeout(() => {
        this.$store.commit("filters/setSelectedBrand", brand);
      }, 100);
    }
  },

  computed: {
    ...mapGetters({
      productCategories: "home/getProductCategories"
    })
  }
};
</script>

<style lang="scss" scoped>
.bar-height {
  height: 7rem;
}
.app-bar {
  z-index: 999;
  .header-title {
    letter-spacing: 0.1rem !important;
    margin: 1.3rem 0 0 2.2rem;
    font-size: 2rem;
    &[dir="rtl"] {
      margin: 1.3rem 2rem 0 0rem;
    }
  }
  .search-input {
    width: 30rem;
  }
  .nav-tabs {
    z-index: 9999;
    margin-left: 12rem !important;
    &[dir="rtl"] {
      margin-right: 12rem;
    }
    #nav-tabs-position {
      background-color: transparent;
      .nav-content {
        width: 500px;
      }
    }
  }
}
@media (max-width: 1100px) {
  .search-input {
    width: 18rem !important;
  }
}
</style>
