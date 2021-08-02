<template>
  <div class="main">
    <div class="row-align text-center">
      <v-icon class="cart-icon">mdi-heart-broken </v-icon>

      <p class="text-1">{{ $t("NoProductsInyourWishList") }}</p>

      <p class="text-3">
        {{ $t("YouCanStartToDiscoverShopilandWithCategoryLinks") }}
      </p>

      <v-btn nuxt color="blue-grey lighten-1">
        <nuxtLink class="text-decoration-none white--text" to="/">
          {{ $t("goToHomePage") }}
        </nuxtLink>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "emptyWishList",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.main {
  background-color: rgb(255, 255, 255);
  height: 90vh;
  .row-align {
    padding-top: 20vh;
    .cart-icon {
      font-size: 8rem;
    }
    .text-1 {
      font-size: 1.8rem;
      margin-bottom: 2rem;
    }
    .text-3 {
      font-size: 1.1rem;
      margin-bottom: 3rem;
    }
  }
}
</style>
