<template>
  <div>
    <loading :loading="isloading" opacity="1" color="white" />

    <div class="breadCrumb-header">
      <v-container>
        <breadCrumb :breadCrumb="breadCrumb" :childBreadCrumb="[]" />
      </v-container>
    </div>

    <product v-if="productExist" :products="cartProducts" />
    <noProduct v-if="!productExist" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import product from "~/components/ShoppingCart/products";
import noProduct from "~/components/ShoppingCart/noProduct";
import breadCrumb from "~/components/main/breadCrumb";
import loading from "~/components/main/loading";

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
      isloading: true,
      productExist: false,
      breadCrumb: {
        name: this.$i18n.t("shoppingCart"),
        link: "/ShoppingCart"
      }
    };
  },

  created() {
    this.$store.dispatch("userCartProducts", [this.$auth.user.id]);
  },

  mounted() {
    setTimeout(() => {
      this.isloading = false;
    }, 2500);
  },

  components: {
    product,
    breadCrumb,
    noProduct,
    loading
  },

  computed: {
    ...mapGetters({ cartProducts: "getCartProducts" })
  },

  watch: {
    cartProducts() {
      this.isloading = false;
      if (this.cartProducts.product && this.cartProducts.product.length > 0) {
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
</style>
