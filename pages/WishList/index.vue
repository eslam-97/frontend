<template>
  <div>
    <div class="breadCrumb-header">
      <v-container>
        <breadCrumb :breadCrumb="breadCrumb" :childBreadCrumb="[]" />
      </v-container>
    </div>
    <loading color="white" :loading="pageLoading" opacity="1" />

    <v-container id="container" v-if="productExist" fluid>
      <div class="main-title text-start">
        {{ $t("MyWishList") }} ({{ wishListProducts.product.length }})
      </div>

      <v-card flat class="card">
        <v-row class="row text-center main-header">
          <v-col class="px-0" cols="2">
            <div class="text-md-h6">{{ $t("Image") }}</div>
          </v-col>

          <v-col class="px-0" cols="4">
            <div class="text-md-h6">{{ $t("Product") }}</div>
          </v-col>

          <v-col class="px-0" cols="2">
            <div class="text-md-h6">{{ $t("Price") }}</div>
          </v-col>

          <v-col class="px-0" cols="2">
            <div class="text-md-h6">{{ $t("Availabile") }}</div>
          </v-col>

          <v-col class="px-0" cols="2">
            <div class="text-md-h6">{{ $t("Action") }}</div>
          </v-col>
        </v-row>

        <div v-for="product in wishListProducts.product" :key="product.id">
          <products :product="product" />
        </div>
      </v-card>
    </v-container>

    <v-row v-if="productExist" class="mb-16 mt-13" justify="space-around">
      <v-hover v-slot="{ hover }">
        <nuxt-link class="text-decoration-none" to="/">
          <v-btn
            tile
            elevation="3"
            :outlined="!hover"
            :large="$vuetify.breakpoint.mdAndUp"
            color="orange darken-3"
          >
            {{ $t("continueShopping") }}
          </v-btn>
        </nuxt-link>
      </v-hover>

      <nuxt-link class="text-decoration-none" to="/ShoppingCart">
        <v-hover v-slot="{ hover }">
          <v-btn
            :large="$vuetify.breakpoint.mdAndUp"
            tile
            elevation="3"
            :outlined="!hover"
            color="orange darken-3"
            >{{ $t("gotocart") }}
          </v-btn>
        </v-hover>
      </nuxt-link>
    </v-row>

    <emptyWishList v-if="!productExist" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import products from "~/components/wishList/product";
import breadCrumb from "~/components/main/breadCrumb";
import loading from "~/components/main/loading";
import emptyWishList from "~/components/wishList/noProduct";

export default {
  middleware({ app, redirect, $auth }) {
    if (!$auth.loggedIn) {
      if (app.i18n.vm.locale == "en") {
        return redirect("/login");
      } else if (app.i18n.vm.locale == "ar") {
        return redirect("/ar/login");
      }
    }
  },
  data() {
    return {
      pageLoading: true,
      loading: false,
      productExist: false,
      breadCrumb: {
        name: this.$i18n.t("wishlist"),
        link: "/WishList"
      }
    };
  },
  created() {
    this.$store.dispatch("userWishlistProducts", [this.$auth.user.id]);
  },

  mounted() {
    setTimeout(() => {
      this.pageLoading = false;
      if (
        this.wishListProducts.product &&
        this.wishListProducts.product.length > 0
      ) {
        this.productExist = true;
      } else {
        this.productExist = false;
      }
    }, 3000);
  },

  components: {
    products,
    breadCrumb,
    emptyWishList,
    loading
  },

  computed: {
    ...mapGetters({
      wishListProducts: "getWishListProducts"
    })
  },

  watch: {
    wishListProducts() {
      this.pageLoading = false;
      if (
        this.wishListProducts.product &&
        this.wishListProducts.product.length > 0
      ) {
        this.productExist = true;
      } else {
        this.productExist = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.breadCrumb-header {
  height: 5rem;
  background-color: rgba(231, 231, 231, 0.4);
}
.loading-icon {
  position: fixed;
  top: 43%;
  left: 46%;
}
#container {
  margin: 0 auto;
  max-width: 80%;
  overflow: auto;
  .main-title {
    margin-top: 1rem;
    font-size: 1.6rem;
  }
  .main-header {
    div {
      font-weight: 600 !important;
    }
  }
  .card {
    background-color: rgb(255, 255, 255);
    margin: 1rem 0;
    height: auto;
    .row {
      width: 100%;
      margin: auto;
      border-bottom: 0.5px solid rgb(211, 211, 211);
    }
  }
}
@media (max-width: 960px) {
  #container {
    max-width: 100%;
  }
}
</style>
