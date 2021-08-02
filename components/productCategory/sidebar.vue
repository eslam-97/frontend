<template>
  <div>
    <div class="sidebar-filter">
      <div class="sidebar-title text-center py-4 text-h6 blue-grey lighten-5">
        {{ $t("RefineSearch") }}
      </div>
      <v-divider></v-divider>
      <v-expansion-panels
        v-model="panel"
        hover
        multiple
        focusable
        flat
        class="pt-0 panels"
      >
        <v-expansion-panel>
          <v-hover v-slot="{ hover }">
            <v-expansion-panel-header
              :class="$i18n.locale == 'ar' ? 'text-start' : ''"
            >
              <span
                :class="hover ? 'orange--text text--darken-4' : ''"
                class=""
              >
                {{ $t("Brand") }}
              </span>
            </v-expansion-panel-header>
          </v-hover>

          <v-expansion-panel-content>
            <div
              class="d-flex align-center"
              v-for="brand in brands"
              :key="brand.en_brand"
            >
              <v-checkbox
                v-if="$i18n.locale == 'en'"
                @click="getBrand(brand.en_brand)"
                multiple
                v-model="brandFilters"
                :value="brand.en_brand"
                class=""
              >
                <template v-slot:label>
                  <span>{{ brand.en_brand }}</span>
                  <small class="pl-2"> ({{ brand.product_count }})</small>
                </template>
              </v-checkbox>

              <v-checkbox
                v-if="$i18n.locale == 'ar'"
                @click="getBrand(brand.en_brand)"
                multiple
                v-model="brandFilters"
                :value="brand.en_brand"
                class=""
              >
                <template v-slot:label>
                  <span>{{ brand.ar_brand }}</span>
                  <small class="pr-2"> ({{ brand.product_count }})</small>
                </template>
              </v-checkbox>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-hover v-slot="{ hover }">
            <v-expansion-panel-header class="text-start">
              <span
                :class="hover ? 'orange--text text--darken-4' : ''"
                class=""
              >
                {{ $t("Price") }}
              </span>
            </v-expansion-panel-header>
          </v-hover>

          <v-expansion-panel-content dir="auto">
            <div class="mt-16">
              <v-range-slider
                v-model="range"
                hide-details
                color="teal lighten-2"
                thumb-label="always"
                thumb-size="48"
                :min="price[0]"
                :max="price[1]"
                @change="priceSlider($event)"
                class="pa-0 my-0"
              >
              </v-range-slider>
              <p class="text-center mt-n2 grey--text">
                {{ price[1] }} EGP - {{ price[0] }} EGP
              </p>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel v-if="type !== 'Accessories'">
          <v-hover v-slot="{ hover }">
            <v-expansion-panel-header
              dir="auto"
              :class="$i18n.locale == 'ar' ? 'text-right' : ''"
            >
              <span
                :class="hover ? 'orange--text text--darken-4' : ''"
                class=""
              >
                {{ $t("Color") }}
              </span>
            </v-expansion-panel-header>
          </v-hover>

          <v-expansion-panel-content>
            <div
              class="d-flex align-center"
              v-for="item in colors"
              :key="item.color"
            >
              <v-checkbox
                v-if="$i18n.locale == 'en'"
                v-model="colorFilters"
                :value="item.color"
                @click="getColor(item.color)"
                multiple
                class=""
              >
                <template v-slot:label>
                  <span>{{ item.color }}</span>
                  <small class="pl-2"> ({{ item.quantity }})</small>
                </template>
              </v-checkbox>
              <v-checkbox
                v-if="$i18n.locale == 'ar'"
                v-model="colorFilters"
                :value="item.color"
                @click="getColor(item.color)"
                multiple
                class=""
              >
                <template v-slot:label>
                  <span>{{ item.ar_color }}</span>
                  <small class="pr-2"> ({{ item.quantity }})</small>
                </template>
              </v-checkbox>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel v-if="type !== 'Accessories'">
          <v-hover v-slot="{ hover }">
            <v-expansion-panel-header
              dir="auto"
              :class="$i18n.locale == 'ar' ? 'text-right' : ''"
            >
              <span
                :class="hover ? 'orange--text text--darken-4' : ''"
                class=""
              >
                {{ $t("OperatingSystem") }}</span
              >
            </v-expansion-panel-header>
          </v-hover>

          <v-expansion-panel-content>
            <div
              class="d-flex align-center"
              v-for="item in operatingSystem"
              :key="item.OperatingSystem"
            >
              <v-checkbox
                v-if="$i18n.locale == 'en'"
                @click="getOS(item.OperatingSystem)"
                multiple
                v-model="OSFilters"
                :value="item.OperatingSystem"
                class=""
              >
                <template v-slot:label>
                  <span>{{ item.OperatingSystem }}</span>
                  <small class="pl-2"> ({{ item.quantity }})</small>
                </template>
              </v-checkbox>
              <v-checkbox
                v-if="$i18n.locale == 'ar'"
                @click="getOS(item.OperatingSystem)"
                multiple
                v-model="OSFilters"
                :value="item.OperatingSystem"
                class=""
              >
                <template v-slot:label>
                  <span>{{ item.ar_OperatingSystem }}</span>
                  <small class="pr-2"> ({{ item.quantity }})</small>
                </template>
              </v-checkbox>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "sidebar",
  data() {
    return {
      panel: [0, 1, 2, 3],
      range: this.$store.state.filters.productPrice,
      brandFilters: [],
      colorFilters: [],
      OSFilters: []
    };
  },

  props: ["type"],

  mounted() {
    if (this.selectedFilters.length > 0) {
      this.brandFilters = this.selectedFilters.slice(0);
    }
  },

  async fetch() {
    await this.$store.dispatch("filters/productBrand", [this.type]),
      this.$store.dispatch("filters/productColor", [this.type]),
      this.$store.dispatch("filters/productOperatingSystem", [this.type]);
  },

  methods: {
    priceSlider(priceSelected) {
      this.$store.commit("filters/setProductPriceFiltered", [
        priceSelected[0],
        priceSelected[1]
      ]);
    },

    getBrand(brand) {
      this.colorFilters = [];
      this.OSFilters = [];
      this.$store.dispatch("filters/productByBrand", [this.type, brand]);
      this.$store.commit("filters/setProductPriceFiltered", []);
    },

    getColor(color) {
      this.brandFilters = [];
      this.OSFilters = [];
      this.$store.dispatch("filters/productByColor", [this.type, color]);
      this.$store.commit("filters/setProductPriceFiltered", []);
    },

    getOS(OS) {
      this.colorFilters = [];
      this.brandFilters = [];
      this.$store.dispatch("filters/productByOperatingSystem", [this.type, OS]);
      this.$store.commit("filters/setProductPriceFiltered", []);
    }
  },

  computed: {
    ...mapGetters({
      brands: "filters/getProductBrand",
      price: "filters/getProductPrice",
      colors: "filters/getProductColor",
      operatingSystem: "filters/getProductOperatingSystem",
      selectedFilters: "filters/getSelectedFilters"
    })
  },
  watch: {
    price() {
      this.range = this.$store.state.filters.productPrice;
    },

    selectedFilters() {
      if (this.selectedFilters.length > 0) {
        console.log(this.selectedFilters);
        this.brandFilters = this.selectedFilters.slice(0);
        console.log(this.brandFilters);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar-filter {
  height: auto;
  width: 100%;
  border: 1px ridge #c9c9c9;
}
.panels {
  height: fit-content;
}
</style>
