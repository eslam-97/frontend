<template>
  <div>
    <loading color="white" :loading="pageLoading" opacity="1" />
    <v-alert width="auto" class="alert" :value="alert" :type="alertType">
      {{ alertMsg }}
    </v-alert>

    <v-container v-if="!pageLoading" class="mt-md-7 px-10">
      <loading color="black" :loading="loading" opacity="0.5" />

      <v-row
        justify="space-between"
        :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
      >
        <v-col class="pa-0" md="auto" cols="12">
          <breadCrumb :breadCrumb="laptopBreadCrumb" :childBreadCrumb="[]" />
        </v-col>

        <v-col class="pa-0" md="auto" cols="11">
          <productFilter :type="type" />
        </v-col>

        <v-col
          v-if="$vuetify.breakpoint.smAndDown && $vuetify.breakpoint.width != 0"
          cols="1"
        >
          <div class="mr-0">
            <v-icon @click="drawer = !drawer" large>mdi-filter </v-icon>

            <v-navigation-drawer
              hide-overlay
              floating
              absolute
              class="filter-drawer"
              :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
              :right="$i18n.locale == 'en' ? true : false"
              v-model="drawer"
              color="blue-grey lighten-5"
              temporary
            >
              <sidebar :type="type" />
            </v-navigation-drawer>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="!pageLoading" class="sidebar-container">
      <v-row justify="start">
        <v-col class="" v-if="$vuetify.breakpoint.mdAndUp" cols="3">
          <sidebar :type="type" />
        </v-col>

        <v-col class="mx-auto" cols="12" md="9">
          <v-row dir="auto" justify="center" class="">
            <v-col
              v-for="product in paginatedProducts"
              :key="product.id"
              cols="5"
              sm="4"
              class="mb-7"
            >
              <productCard
                @display-alert="displayAlert($event)"
                :product="product"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <div class="text-center mb-10">
                <v-pagination
                  v-if="paginatedProducts.length == 12"
                  v-model="currentPage"
                  :length="totalPages"
                  prev-icon="mdi-menu-left"
                  next-icon="mdi-menu-right"
                  @input="paginationPage($event)"
                ></v-pagination>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import breadCrumb from "~/components/main/breadCrumb";
import sidebar from "~/components/productCategory/sidebar";
import productCard from "~/components/productCard/card";
import productFilter from "~/components/productCategory/filters";
import loading from "~/components/main/loading.vue";

import { mapGetters } from "vuex";

export default {
  name: "productPage",
  data() {
    return {
      drawer: false,
      filteredProducts: [],
      maxPrice: "",
      minPrice: "",
      pageSize: 12,
      totalPages: 0,
      currentPage: 1,
      paginatedProducts: [],
      pageLoading: true,
      alert: false,
      alertMsg: "",
      loading: false,
      alertType: "success"
    };
  },

  async fetch() {
    await this.$store.dispatch("filters/filterProducts", [this.type]);
  },
  // mounted() {
  //   this.$store.dispatch("filters/filterProducts", [this.type]);
  // },

  components: {
    breadCrumb,
    sidebar,
    productCard,
    productFilter,
    loading
  },

  props: ["laptopBreadCrumb", "type"],

  methods: {
    paginationPage(pageNum) {
      this.currentPage = pageNum;
      this.paginate;
    },

    displayAlert(value) {
      if (value.type == "warning") {
        this.alertMsg = value.msg;
        this.alertType = value.type;
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 2500);
      } else {
        this.loading = true;
        this.alert = false;
        this.alertMsg = value.msg;
        this.alertType = value.type;
        setTimeout(() => {
          this.loading = false;
          this.alert = true;
        }, 1500);
        setTimeout(() => {
          this.alert = false;
        }, 4500);
      }
    }
  },

  computed: {
    ...mapGetters({
      products: "filters/getFilterdProduct",
      priceFiltered: "filters/getPriceFiltered",
      paginationNum: "filters/getPaginationNum"
    }),

    priceRange() {
      const prices = [];
      if (this.products.length !== 0) {
        this.products.forEach(element => {
          prices.push(element.totalprice);
        });
        this.maxPrice = Math.max(...prices);
        this.minPrice = Math.min(...prices);
        this.$store.commit("filters/setPriceRange", [
          this.minPrice,
          this.maxPrice
        ]);
      }
    },

    filterProductByPrice() {
      if (this.priceFiltered.length > 0) {
        this.filteredProducts = this.products.filter(
          element =>
            element.totalprice >= this.priceFiltered[0] &&
            element.totalprice <= this.priceFiltered[1]
        );
      }
      if (this.priceFiltered.length == 0) {
        this.filteredProducts = this.products.filter(
          element =>
            element.totalprice >= this.minPrice &&
            element.totalprice <= this.maxPrice
        );
      }
    },

    paginate() {
      this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
      if (this.currentPage < 1) {
        this.currentPage = 1;
      } else if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
      let startIndex = (this.currentPage - 1) * this.pageSize;
      let endIndex = Math.min(startIndex + this.pageSize, this.products.length);
      this.paginatedProducts = this.filteredProducts.slice(
        startIndex,
        endIndex
      );
    }
  },
  watch: {
    products() {
      this.priceRange;
      this.filterProductByPrice;
      this.paginate;
    },
    priceFiltered() {
      this.filterProductByPrice;
    },
    paginationNum() {
      this.pageSize = this.paginationNum;
      this.paginate;
    },
    filteredProducts() {
      this.paginate;
    },
    paginatedProducts() {
      setTimeout(() => {
        this.pageLoading = false;
      }, 100);
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-drawer {
  width: 40%;
  position: absolute;
  height: auto !important;
  top: 57.5px !important;
}

.alert {
  z-index: 99999;
  position: fixed;
  top: 10%;
  right: 5%;
}
</style>
