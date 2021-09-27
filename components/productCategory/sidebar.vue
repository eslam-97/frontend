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

          <v-expansion-panel-content class="pb-0">
            <div
              class="d-flex align-center"
              v-for="brand in brands"
              :key="brand.en_brand"
            >
              <v-checkbox
                v-if="$i18n.locale == 'en' && brand.product_count > 0"
                @click="filterByBrand()"
                v-model="brandFilters"
                :value="brand.en_brand"
                class=""
              >
                <template v-slot:label>
                  <span class="black--text">{{ brand.en_brand }}</span>
                  <small class="pl-2"> ({{ brand.product_count }})</small>
                </template>
              </v-checkbox>

              <v-checkbox
                v-if="$i18n.locale == 'ar' && brand.product_count > 0"
                @click="filterByBrand()"
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
                v-model="priceRange"
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
                {{ price[0] }} EGP - {{ price[1] }} EGP
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
                @click="filterByColor()"
                class=""
              >
                <template v-slot:label>
                  <span class="black--text">{{ item.color }}</span>
                  <small class="pl-2"> ({{ item.quantity }})</small>
                </template>
              </v-checkbox>
              <v-checkbox
                v-if="$i18n.locale == 'ar'"
                v-model="colorFilters"
                :value="item.color"
                @click="filterByColor()"
                class=""
              >
                <template v-slot:label>
                  <span class="black--text">{{ item.ar_color }}</span>
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
                @click="filterByOS()"
                v-model="OSFilters"
                :value="item.OperatingSystem"
                class=""
              >
                <template v-slot:label>
                  <span class="black--text">{{ item.OperatingSystem }}</span>
                  <small class="pl-2"> ({{ item.quantity }})</small>
                </template>
              </v-checkbox>
              <v-checkbox
                v-if="$i18n.locale == 'ar'"
                @click="filterByOS()"
                v-model="OSFilters"
                :value="item.OperatingSystem"
                class=""
              >
                <template v-slot:label>
                  <span class="black--text">{{ item.ar_OperatingSystem }}</span>
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
      priceRange: this.$store.state.home.productPrice,
      brandFilters: null,
      colorFilters: null,
      OSFilters: null,
      pricesSelected: [],
      filtersParams1: [],
      filtersParams2: [],
      filtersParams3: [],
      filtersParams4: []
    };
  },

  props: ["type"],

  fetch() {
    if (this.selectedBrand && this.selectedBrand.length > 0) {
      this.brandFilters = this.selectedBrand;
      this.filterByBrand();
      this.$store.dispatch("filters/productBrand", [this.type]);
      setTimeout(() => {
        this.$store.commit("filters/setSelectedBrand", []);
      }, 1000);
    } else {
      this.$store.dispatch("filters/productBrand", [this.type]),
        this.$store.dispatch("filters/productColor", [this.type]),
        this.$store.dispatch("filters/productOS", [this.type]);
    }
  },

  methods: {
    priceSlider(priceSelected) {
      this.pricesSelected = priceSelected.slice(0);
      this.filtersParams;
      this.$store.dispatch("filters/filterProducts", this.filtersParams1);
      this.$store.dispatch("filters/productBrand", this.filtersParams2),
        this.$store.dispatch("filters/productColor", this.filtersParams3),
        this.$store.dispatch("filters/productOS", this.filtersParams4);
      this.$store.commit("filters/setSelectedFilters", this.filtersParams1);
    },

    filterByBrand() {
      this.filtersParams;
      this.$store.dispatch("filters/filterProducts", this.filtersParams1);
      this.$store.dispatch("filters/productColor", this.filtersParams3),
        this.$store.dispatch("filters/productOS", this.filtersParams4);
      this.$store.commit("filters/setSelectedFilters", this.filtersParams1);
      this.$store.commit("filters/setProductPriceFiltered", []);
    },

    filterByColor() {
      this.filtersParams;
      this.$store.dispatch("filters/filterProducts", this.filtersParams1);
      this.$store.dispatch("filters/productBrand", this.filtersParams2),
        this.$store.dispatch("filters/productOS", this.filtersParams4);
      this.$store.commit("filters/setSelectedFilters", this.filtersParams1);
      this.$store.commit("filters/setProductPriceFiltered", []);
    },

    filterByOS() {
      this.filtersParams;
      this.$store.dispatch("filters/filterProducts", this.filtersParams1);
      this.$store.dispatch("filters/productBrand", this.filtersParams2),
        this.$store.dispatch("filters/productColor", this.filtersParams3),
        this.$store.commit("filters/setSelectedFilters", this.filtersParams1);
      this.$store.commit("filters/setProductPriceFiltered", []);
    }
  },

  computed: {
    ...mapGetters({
      brands: "filters/getProductBrand",
      price: "home/getProductPrice",
      colors: "filters/getProductColor",
      operatingSystem: "filters/getProductOperatingSystem",
      selectedBrand: "filters/getSelectedBrand"
    }),
    filtersParams() {
      this.filtersParams1 = [
        this.type,
        this.brandFilters,
        this.colorFilters,
        this.OSFilters,
        this.pricesSelected[0],
        this.pricesSelected[1]
      ];

      this.filtersParams2 = [
        this.type,
        this.colorFilters,
        this.OSFilters,
        this.pricesSelected[0],
        this.pricesSelected[1]
      ];
      this.filtersParams3 = [
        this.type,
        this.brandFilters,
        this.OSFilters,
        this.pricesSelected[0],
        this.pricesSelected[1]
      ];
      this.filtersParams4 = [
        this.type,
        this.brandFilters,
        this.colorFilters,
        this.pricesSelected[0],
        this.pricesSelected[1]
      ];
    }
  },
  watch: {
    selectedBrand() {
      if (this.selectedBrand.length > 0) {
        this.brandFilters = this.selectedBrand;
        this.filterByBrand();
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
