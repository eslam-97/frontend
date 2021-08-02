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
      <p :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'" class="header-title">
        shopiland
      </p>
      <template v-slot:extension>
        <v-tabs
          @click="tab = 5"
          :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
          :optional="true"
          active-class="orange--text text--darken-4"
          v-model="tab"
          class="nav-tabs"
        >
          <v-tabs-slider color="orange darken-2"></v-tabs-slider>
          <v-tab
            @click.capture.stop="tab = 0"
            :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
            @mouseover="tab = 0"
            @mouseout="tab = null"
            class="black--text tab-0"
          >
            {{ $t("LAPTOP") }}
          </v-tab>

          <v-tab
            @click.capture.stop="tab = 1"
            :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
            @mouseover="tab = 1"
            @mouseout="tab = null"
            class="black--text tab-1"
          >
            {{ $t("MOBILE") }}
          </v-tab>

          <v-tab
            @click.capture.stop="tab = 2"
            :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
            @mouseover="tab = 2"
            @mouseout="tab = null"
            class="black--text tab-2"
          >
            {{ $t("TABLET") }}
          </v-tab>

          <v-tab
            @click.capture.stop="tab = 3"
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
                  @click="getBrand('LAPTOP', brand.en_brand)"
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
                  @click="getBrand('MOBILE', brand.en_brand)"
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
                  @click="getBrand('TABLET', brand.en_brand)"
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
                  @click="getBrand('ACCESSORIES', brand.en_brand)"
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
    getBrand(type, brand) {
      console.log(brand);
      this.$store.commit("filters/setSelectedFilters", []);
      this.$store.dispatch("filters/productByBrand", [type, brand]);
      this.$router.push(this.localePath("/" + type));
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
        width: 700px;
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
