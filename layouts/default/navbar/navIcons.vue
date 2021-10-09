<template>
  <div class="d-flex">
    <!--  user menu -->

    <v-menu
      class="nav-menu"
      v-if="$auth.loggedIn"
      open-on-hover
      close-delay="300"
      bottom
      offset-y
      nudge-left="70"
      nudge-width="140"
      nudge-bottom="5"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-hover v-slot="{ hover }">
          <nuxt-link :to="localePath('/Account')" class="text-decoration-none">
            <div
              :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
              id="acc-div"
              class="d-flex flex-column align-center bar-item"
              v-bind="attrs"
              v-on="on"
            >
              <img
                style="border-radius: 50%"
                :src="imgUrl() + $auth.user.avatar"
                width="32"
                height="32"
              />

              <span
                :class="
                  hover ? ['orange--text', 'text--darken-4'] : 'black--text'
                "
                class=""
                >{{ $auth.user.username }}</span
              >
            </div>
          </nuxt-link>
        </v-hover>
      </template>

      <div style="z-index: 99999" class="">
        <v-list dense class="pt-0 pa-0" nav>
          <v-list-item-title class="grey lighten-3 py-3 px-3 text-center">
            <span class="">
              {{ $t("welcome") }} , {{ $auth.user.username }}</span
            >
          </v-list-item-title>

          <v-list-item style="min-height: 34px" link class="">
            <v-hover v-slot="{ hover }">
              <nuxt-link
                :to="localePath('/Account')"
                class="text-decoration-none"
              >
                <v-list-item-subtitle
                  :class="hover ? 'orange--text text--darken-4' : ''"
                  class="pa-0"
                >
                  <v-icon
                    small
                    :color="hover ? 'orange darken-4' : 'black'"
                    class=""
                    >mdi-account
                  </v-icon>
                  {{ $t("myAccount") }}
                </v-list-item-subtitle>
              </nuxt-link>
            </v-hover>
          </v-list-item>

          <v-list-item style="min-height: 34px" link class="">
            <v-hover v-slot="{ hover }">
              <nuxt-link
                class="text-decoration-none"
                :to="localePath('/Account')"
              >
                <v-list-item-subtitle
                  :class="hover ? 'orange--text text--darken-4' : ''"
                  class="pa-0"
                >
                  <v-icon
                    small
                    :color="hover ? 'orange darken-4' : 'black'"
                    class=""
                    >mdi-format-list-checkbox
                  </v-icon>
                  {{ $t("myOrders") }}
                </v-list-item-subtitle>
              </nuxt-link>
            </v-hover>
          </v-list-item>

          <v-divider class="mx-2"></v-divider>
          <v-list-item link class="">
            <v-hover v-slot="{ hover }">
              <v-list-item-title
                @click="logout()"
                :class="hover ? 'orange--text text--darken-4' : ''"
                class="pa-0"
              >
                <v-icon
                  small
                  :color="hover ? 'orange darken-4' : 'black'"
                  class=""
                  >mdi-exit-to-app
                </v-icon>
                {{ $t("logout") }}
              </v-list-item-title>
            </v-hover>
          </v-list-item>
        </v-list>
      </div>
    </v-menu>

    <!-- account menu -->

    <v-menu
      v-if="!$auth.loggedIn"
      class="nav-menu"
      close-delay="300"
      open-on-hover
      bottom
      offset-y
      nudge-left="50"
      nudge-width="100"
      nudge-bottom="8"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-hover v-slot="{ hover }">
          <div>
            <nuxt-link
              :to="localePath('/Account')"
              class="text-decoration-none"
            >
              <div
                :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
                id="acc-div"
                class="d-flex flex-column align-center bar-item"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon
                  :color="hover ? 'orange darken-4' : 'black'"
                  class="icon acc-icon"
                  >mdi-account-outline
                </v-icon>
                <span
                  :class="
                    hover ? ['orange--text', 'text--darken-4'] : 'black--text'
                  "
                  class=""
                >
                  {{ $t("Account") }}</span
                >
              </div>
            </nuxt-link>
          </div>
        </v-hover>
      </template>

      <v-list class="pb-5 pt-3">
        <v-list-item class="text-center">
          <v-list-item-title class="pa-0 py-2">
            <v-hover v-slot="{ hover }">
              <nuxt-link
                :to="localePath('/register')"
                class="text-decoration-none"
              >
                <v-btn
                  elevation="2"
                  outlined
                  block
                  :color="hover ? '#E65100' : 'black'"
                >
                  {{ $t("signUp") }}</v-btn
                >
              </nuxt-link>
            </v-hover>
          </v-list-item-title>
        </v-list-item>

        <v-list-item class="text-center">
          <v-list-item-title class="pa-0">
            <v-hover v-slot="{ hover }">
              <nuxt-link
                :to="localePath('/login')"
                class="text-decoration-none"
              >
                <v-btn
                  elevation="2"
                  outlined
                  block
                  :color="hover ? '#E65100' : 'black'"
                >
                  {{ $t("login") }}</v-btn
                >
              </nuxt-link>
            </v-hover>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- wish list menu -->

    <v-menu
      :close-on-content-click="false"
      class="nav-menu"
      close-delay="300"
      open-on-hover
      bottom
      offset-y
      nudge-width="330"
      nudge-left="165"
      nudge-bottom="8"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-hover v-slot="{ hover }">
          <div
            :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
            id="icon-div"
            class="bar-item"
            v-bind="attrs"
            v-on="on"
          >
            <nuxt-link
              :to="localePath('/WishList')"
              class="text-decoration-none"
            >
              <div
                class="d-flex flex-column align-center"
                :class="
                  hover ? ['orange--text', 'text--darken-4'] : 'black--text'
                "
              >
                <v-badge
                  :value="wishlistNotification"
                  :content="wishlistNotification"
                  color="red"
                >
                  <v-icon
                    :color="hover ? 'orange darken-4' : 'black'"
                    class="icon"
                    >mdi-heart-outline</v-icon
                  >
                </v-badge>
                <span class=""> {{ $t("wishlist") }}</span>
              </div>
            </nuxt-link>
          </div>
        </v-hover>
      </template>

      <div class="white">
        <div
          class="cart-wrapper"
          v-if="wishListProducts.product && wishListProducts.product.length > 0"
        >
          <v-overlay
            style="height: 100%"
            color="white"
            opacity="0.6"
            :value="loading"
          >
            <v-progress-circular
              color="grey lighten-3"
              indeterminate
              size="50"
              class="loading-icon"
              v-if="loading"
            >
            </v-progress-circular>
          </v-overlay>

          <div v-for="product in wishListProducts.product" :key="product.id">
            <v-hover v-slot="{ hover }">
              <div :id="product.id">
                <v-card
                  :class="hover ? 'grey lighten-5' : 'white'"
                  elevation="0"
                  hover
                  nuxt
                  class="d-flex py-2"
                >
                  <v-img
                    contain
                    :src="imgUrl() + product.image"
                    height="90"
                    width="90"
                  >
                    <v-overlay
                      opacity="0.3"
                      v-if="hover"
                      absolute
                      color="grey lighten-5"
                    >
                    </v-overlay>
                  </v-img>

                  <v-list-item-title
                    class="align-self-start mt-1 d-flex flex-column"
                  >
                    <span v-if="$i18n.locale == 'en'" class="cart-title ml-2"
                      >{{ productName(product.name) }}
                    </span>
                    <span v-if="$i18n.locale == 'ar'" class="cart-title ml-2"
                      >{{ productName(product.ar_name) }}
                    </span>
                    <small class="ml-3 mt-1 grey--text">{{
                      product.productcode
                    }}</small>
                    <span class="font-weight-medium align-self-start mt-3 ml-4"
                      >{{ product.totalprice }} EGP</span
                    >
                  </v-list-item-title>

                  <span
                    class="mt-2 d-flex flex-column justify-space-between"
                    :class="$i18n.locale == 'en' ? 'mr-3' : 'ml-3'"
                  >
                    <v-tooltip
                      :left="$i18n.locale == 'en'"
                      :right="$i18n.locale == 'ar'"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-hover v-slot="{ hover }">
                          <v-icon
                            @click="deleteWishlistProduct(product.id)"
                            :color="hover ? 'black' : 'grey darken-1'"
                            v-bind="attrs"
                            v-on="on"
                          >
                            mdi-close-circle
                          </v-icon>
                        </v-hover>
                      </template>
                      <span class="cart-subtitle">
                        {{ $t("remove") }}
                      </span>
                    </v-tooltip>
                  </span>
                </v-card>
              </div>
            </v-hover>
            <v-divider dark class="grey lighten-4"></v-divider>
          </div>

          <v-divider class="grey lighten-3"></v-divider>

          <div class="text-center pt-2 pb-4 grey lighten-4">
            <v-btn outlined tile large elevation="4" color="#ff5700">
              {{ $t("viewWishlist") }}</v-btn
            >
          </div>
        </div>
        <div
          v-else
          class="d-flex align-items justify-center flex-column pt-5 pb-10"
        >
          <v-icon x-large>mdi-heart-broken </v-icon>
          <span class="text-center">
            {{ $t("youDoNotHaveAnyThingInYourWishListYet") }}</span
          >
        </div>
      </div>
    </v-menu>

    <!-- cart menu -->

    <v-menu
      class="nav-menu"
      close-delay="300"
      :close-on-content-click="false"
      open-on-hover
      bottom
      offset-y
      nudge-width="380"
      nudge-left="300"
      nudge-bottom="8"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-hover v-slot="{ hover }">
          <div
            :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
            id="icon-div"
            class="bar-item"
            v-bind="attrs"
            v-on="on"
          >
            <nuxt-link
              class="text-decoration-none black--text"
              :to="localePath('/ShoppingCart')"
            >
              <div
                class="d-flex flex-column align-center"
                :class="
                  hover ? ['orange--text', 'text--darken-4'] : 'black--text'
                "
              >
                <v-badge
                  :value="cartNotification"
                  :content="cartNotification"
                  color="red"
                >
                  <v-icon
                    :color="hover ? 'orange darken-4' : 'black'"
                    class="icon"
                    >mdi-cart-outline</v-icon
                  >
                </v-badge>
                <span class=""> {{ $t("Cart") }}</span>
              </div>
            </nuxt-link>
          </div>
        </v-hover>
      </template>

      <div class="white">
        <div
          class="cart-wrapper"
          v-if="cartProducts.product && cartProducts.product.length > 0"
        >
          <v-overlay
            style="height: 100%"
            color="white"
            opacity="0.6"
            :value="loading"
          >
            <v-progress-circular
              color="grey lighten-3"
              indeterminate
              size="50"
              class="loading-icon"
              v-if="loading"
            >
            </v-progress-circular>
          </v-overlay>

          <div v-for="product in cartProducts.product" :key="product.id">
            <v-hover v-slot="{ hover }">
              <div :id="product.id">
                <v-card
                  :class="hover ? 'grey lighten-5' : ''"
                  elevation="0"
                  hover
                  class="d-flex py-2"
                >
                  <v-img
                    contain
                    :src="imgUrl() + product.image"
                    height="90"
                    width="90"
                  >
                    <v-overlay
                      opacity="0.3"
                      v-if="hover"
                      absolute
                      color="grey lighten-4"
                    >
                    </v-overlay>
                  </v-img>

                  <v-list-item-title
                    class="align-self-start mt-1 ml-2 d-flex flex-column"
                  >
                    <span v-if="$i18n.locale == 'en'" class="cart-title">
                      {{ productName(product.name) }}
                    </span>
                    <span v-if="$i18n.locale == 'ar'" class="cart-title">
                      {{ productName(product.ar_name) }}
                    </span>
                    <small class="ml-2 mt-1 grey--text">{{
                      product.productcode
                    }}</small>
                    <span class="font-weight-medium align-self-start mt-3 ml-1"
                      >{{ product.totalprice }} EGP</span
                    >
                  </v-list-item-title>

                  <span
                    class="mt-2 d-flex flex-column justify-space-between"
                    :class="$i18n.locale == 'en' ? 'mr-3' : 'ml-3'"
                  >
                    <v-tooltip
                      :left="$i18n.locale == 'en'"
                      :right="$i18n.locale == 'ar'"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-hover v-slot="{ hover }">
                          <v-icon
                            @click="deleteProduct(product.id)"
                            :color="hover ? 'black' : 'grey darken-1'"
                            v-bind="attrs"
                            v-on="on"
                          >
                            mdi-close-circle
                          </v-icon>
                        </v-hover>
                      </template>
                      <span class="cart-subtitle">
                        {{ $t("remove") }}
                      </span>
                    </v-tooltip>
                  </span>
                </v-card>
              </div>
            </v-hover>
            <v-divider dark class="grey lighten-4"></v-divider>
          </div>

          <v-divider class="grey lighten-4"></v-divider>

          <div class="text-center grey lighten-5 pt-2 pb-3">
            <nuxt-link
              class="text-decoration-none"
              :to="localePath('/ShoppingCart')"
            >
              <v-btn tile color="primary mx-3"> {{ $t("viewCart") }}</v-btn>
            </nuxt-link>
            <v-btn tile color="orange darken-4 mx-3">
              {{ $t("Checkout") }}</v-btn
            >
          </div>
        </div>

        <div
          v-else
          class="d-flex align-center justify-center pt-5 pb-10 flex-column"
        >
          <v-icon size="50">mdi-shopping-outline </v-icon>
          <span class="text-center">
            {{ $t("youDoNotHaveAnyThingInYourShoppingCartYet") }}</span
          >
        </div>
      </div>
    </v-menu>

    <v-divider
      :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
      class="mt-5 lang-divid"
      vertical
    ></v-divider>

    <!-- lang menu  -->

    <v-menu
      class="nav-menu"
      close-on-content-click
      close-delay="200"
      open-on-hover
      bottom
      offset-y
      nudge-width="50"
      nudge-left="25"
    >
      <template v-slot:activator="{ on, attrs }">
        <div
          :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
          id="lang"
          class="d-flex flex-row bar-item py-3 align-center"
          v-bind="attrs"
          v-on="on"
        >
          <img
            v-if="$i18n.locale == 'en'"
            :dir="$i18n.locale == 'en' ? 'rtl' : 'ltr'"
            src="../../../assets/img/britain.png"
            height="20"
            width="20"
            class="mr-1 lang-icon"
            alt=""
          />

          <img
            v-if="$i18n.locale == 'ar'"
            :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
            src="../../../assets/img/egypt.png"
            height="20"
            width="20"
            class="mr-1 lang-icon"
            alt=""
          />

          <small v-if="$i18n.locale == 'ar'" class="mb-0 pa-0"
            >العربية
            <v-icon class="pa-0">mdi-menu-down</v-icon>
          </small>
          <small v-if="$i18n.locale == 'en'" class="mb-0 pa-0"
            >English
            <v-icon class="pa-0">mdi-menu-down</v-icon>
          </small>
        </div>
      </template>

      <v-list dense nav class="">
        <v-list-item
          @click.prevent.stop="$i18n.setLocale('en')"
          link
          class="text-center"
          ><v-list-item-content>
            <v-list-item-title dir="auto">
              <img
                src="../../../assets/img/britain.png"
                height="18"
                width="18"
                class="mx-1 mb-n1"
                alt=""
              />
              English<v-icon
                small
                v-if="$i18n.locale == 'en'"
                color="success"
                right
              >
                mdi-checkbox-marked-circle
              </v-icon>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          @click.prevent.stop="$i18n.setLocale('ar')"
          link
          class="text-center"
          ><v-list-item-content>
            <v-list-item-title dir="auto">
              <img
                src="../../../assets/img/egypt.png"
                height="18"
                width="18"
                class="mx-1 mb-n1"
                alt=""
              />
              العربية
              <v-icon v-if="$i18n.locale == 'ar'" color="success" right>
                mdi-checkbox-marked-circle
              </v-icon></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "navIcons",
  data() {
    return {
      loading: false,
      cartNotification: this.$store.state.cartProducts
        ? this.$store.state.cartProducts.product.length
        : null,
      wishlistNotification: this.$store.state.wishListProducts
        ? this.$store.state.wishListProducts.product.length
        : null
    };
  },
  mounted() {
    if (this.$auth.user) {
      this.$echo
        .channel("notification")
        .listen("addToCartNotification", data => {
          this.cartNotification = this.cartProducts
            ? this.cartProducts.product.length + 1
            : 1;
        })
        .listen("deleteFromCartNotification", data => {
          this.cartNotification = this.cartProducts
            ? this.cartProducts.product.length - 1
            : null;
        })
        .listen("addToWishlistNotification", data => {
          this.wishlistNotification = this.wishListProducts
            ? this.wishListProducts.product.length + 1
            : 1;
        })
        .listen("deleteFromWishlistNotification", data => {
          this.wishlistNotification = this.wishListProducts
            ? this.wishListProducts.product.length - 1
            : null;
        });
    }
  },

  methods: {
    deleteWishlistProduct(id) {
      this.loading = true;
      this.$store.dispatch("deleteWishlistProduct", [this.$auth.user.id, id]);
      this.$store.dispatch("userWishlistProducts", [this.$auth.user.id]);
    },

    deleteProduct(id) {
      this.loading = true;
      this.$store.dispatch("deleteCartProduct", [this.$auth.user.id, id]);
      this.$store.dispatch("userCartProducts", [this.$auth.user.id]);
    },

    logout() {
      this.$store.dispatch("authentication/logout");
      this.$router.push(this.localePath("/"));
    },

    imgUrl() {
      return "http://localhost:8000/";
    },

    productName(name) {
      return name
        .split(" ")
        .slice(0, 2)
        .join(" ");
    }
  },

  computed: {
    ...mapGetters({
      cartProducts: "getCartProducts",
      wishListProducts: "getWishListProducts"
    })
  },

  watch: {
    cartProducts() {
      this.loading = false;
      if (this.cartProducts) {
        this.cartNotification = this.cartProducts.product.length;
      } else {
        this.cartNotification = null;
      }
    },
    wishListProducts() {
      this.loading = false;
      if (this.wishListProducts) {
        this.wishlistNotification = this.wishListProducts.product.length;
      } else {
        this.wishlistNotification = null;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-menu {
  z-index: 9999 !important;
}
.bar-item {
  cursor: pointer;
  margin: 1.4rem 1.3rem 0 0;
  &[dir="rtl"] {
    margin: 1.4rem 0rem 0 1rem;
  }
  .icon {
    font-size: 1.7rem;
  }
  .acc-icon {
    font-size: 1.9rem;
  }
  span {
    font-size: 0.9rem;
    cursor: pointer;
  }
}
#acc-div {
  margin-top: 1.2rem;
}
#icon-div {
  margin: 1.45rem 1.8rem 0 0;
  &[dir="rtl"] {
    margin: 1.45rem 0.5rem 0 0.7rem;
  }
}
.lang-divid {
  margin-left: 0.8rem;
  &[dir="rtl"] {
    margin: 0 0.8rem 0 0;
  }
}
#lang {
  margin: 1.5rem 1.3rem 0 0.7rem;
  font-size: 1rem;
  &[dir="rtl"] {
    margin: 1.5rem 0.7rem 0 0.8rem;
  }
}
.lang-icon {
  &[dir="rtl"] {
    margin-left: 0.3rem;
  }
}
.cart-title {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.05rem;
}
.cart-subtitle {
  font-size: 0.8rem;
  font-weight: 400;
}
.cart-wrapper {
  max-height: 24.5rem;
  height: auto;
  overflow-y: auto;
}
.deleteItem {
  animation: delete 2s 0s 1 normal forwards;
  -webkit-animation: delete 2s 0s 1 normal forwards;
  -o-animation: delete 2s 0s 1 normal forwards;
  -moz-animation: delete 2s 0s 1 normal forwards;
}

@keyframes delete {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
