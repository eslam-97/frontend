<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card class="card">
        <div class="img-container">
          <v-hover v-slot="{ hover }">
            <nuxt-link
              :to="$i18n.locale == 'en' ? {
                     name: routeName(product.type)+'-product___en',
                     params: {
                        product: productParam(),
                        id: product.id,
                        parentRoute: product.type,
                     }
                  }: {
                     name: routeName(product.type)+'-product___ar',
                     params: {
                        product: productParam(),
                        id: product.id,
                        parentRoute: product.ar_type,
                     }},"
            >
              <v-img contain :src="imgurl() + product.image" class="card-img">
                <v-fade-transition>
                  <v-overlay
                    v-if="$vuetify.breakpoint.smAndUp"
                    opacity="0.3"
                    z-index="10"
                    absolute
                    :value="hover"
                  >
                  </v-overlay>
                </v-fade-transition>

                <v-badge
                  dir="auto"
                  v-if="product.discount != 0"
                  class="mb-n2 ml-5"
                  :content="'-' + product.discount"
                  color="red"
                >
                </v-badge>
              </v-img>
            </nuxt-link>
          </v-hover>

          <div v-if="$vuetify.breakpoint.smAndUp" class="icon-wrapper">
            <div
              dir="auto"
              v-if="hover"
              :class="hover ? 'animate' : ''"
              class="card-icons d-flex flex-column"
            >
              <v-tooltip v-if="wishListIcon == false" left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    dark
                    small
                    v-bind="attrs"
                    v-on="on"
                    @click="addToWishlist()"
                    color="primary"
                    class="mb-2"
                  >
                    <v-icon large class="icon" dark>mdi-heart-outline</v-icon>
                  </v-btn>
                </template>
                <small> {{ $t("addtowishlist") }}</small>
              </v-tooltip>

              <v-tooltip v-else left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    dark
                    small
                    v-bind="attrs"
                    v-on="on"
                    @click="deleteWishlistProduct()"
                    color="primary"
                    class="mb-2"
                  >
                    <v-icon
                      large
                      class="icon"
                      dark
                      v-if="wishListIcon == true"
                      color="red"
                      >mdi-heart</v-icon
                    >
                  </v-btn>
                </template>
                <small>{{ $t("RemoveFromWishlist") }}</small>
              </v-tooltip>

              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" fab dark small color="primary"
                    ><v-icon dark class="icon"
                      >mdi-image-multiple</v-icon
                    ></v-btn
                  >
                </template>
                <small> {{ $t("quickview") }} </small>
              </v-tooltip>
            </div>
          </div>
          <div
            id="mob-card-icons"
            class="d-flex flex-column"
            v-if="$vuetify.breakpoint.smAndDown"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon class="icon">mdi-heart-outline </v-icon>
                </v-btn>
              </template>
              <small> {{ $t("addtowishlist") }} </small>
            </v-tooltip>
          </div>
        </div>

        <v-card-title>
          <v-row dir="auto" class="card-title-wrap">
            <nuxt-link
              class="text-decoration-none card-title-wrap"
              :to="$i18n.locale == 'en' ? {
                     name: routeName(product.type)+'-product___en',
                     params: {
                        product: productParam(),
                        id: product.id,
                        parentRoute: product.type,
                     }
                  }: {
                     name: routeName(product.type)+'-product___ar',
                     params: {
                        product: productParam(),
                        id: product.id,
                        parentRoute: product.ar_type,
                     }},"
            >
              <span v-if="$i18n.locale == 'en'" class="mb-1 card-title">
                {{ product.name }}
              </span>
              <span v-if="$i18n.locale == 'ar'" class="mb-1 card-title">
                {{ product.ar_name }}
              </span>
            </nuxt-link>
          </v-row>
        </v-card-title>

        <v-row
          v-if="product.rating"
          align="end"
          dir="auto"
          justify="center"
          class="card-rate"
        >
          <v-rating
            :value="rateCount(product.rating)"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          >
          </v-rating>
          <small class="grey--text ml-1 mr-2">{{
            rateCount(product.rating)
          }}</small>
          <small v-if="product.rating" class="grey--text"
            >({{ reviewCount(product.rating) }})
          </small>
        </v-row>

        <v-row dir="auto" justify="center" class="card-price">
          <span :class="product.discount ? 'ml-7' : ''">
            {{ product.totalprice }} EGP &nbsp;</span
          >
          <span
            v-if="product.discount != 0"
            :class="
              true ? 'font-weight-light text-decoration-line-through' : ''
            "
            >{{ product.price }}
          </span>
        </v-row>

        <v-card-actions>
          <v-row dir="auto" justify="center" class="mb-1">
            <v-btn
              v-if="cartIcon == false"
              :outlined="!hover"
              tile
              color="success"
              class="card-btn"
              @click="addToCart()"
            >
              {{ $t("addToCart") }}
            </v-btn>

            <v-btn
              v-else
              :outlined="!hover"
              tile
              color="success"
              class="card-btn"
              @click="deleteProduct()"
            >
              {{ $t("addedToCart") }}
              <v-icon :color="hover ? 'white' : 'success'">
                mdi-checkbox-marked-circle
              </v-icon>
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "productCard",
  data() {
    return {
      wishListIcon: false,
      cartIcon: false,
      loading: false,
      alert: true
    };
  },

  mounted() {
    this.existingWishListProducts();
    this.existingCartProducts();
  },

  props: ["product"],

  methods: {
    addToCart() {
      if (this.$auth.loggedIn) {
        this.$emit("display-alert", {
          msg: this.$i18n.t("ProductAddedToYourShoppingCartSuccessfully"),
          type: "success"
        });

        this.cartIcon = true;
        this.$store.dispatch("addToUserCart", [
          this.$auth.user.id,
          this.product.id,
          1
        ]);

        this.$store.dispatch("userCartProducts", [this.$auth.user.id]);
      } else {
        this.$emit("display-alert", {
          msg: this.$i18n.t("PleaseRegisterOrLoginToEnjoyYourShoppingCart"),
          type: "warning"
        });
      }
    },

    addToWishlist() {
      if (this.$auth.loggedIn) {
        this.$emit("display-alert", {
          msg: this.$i18n.t("ProductAddedToYourWishlistSuccessfully"),
          type: "success"
        });

        this.wishListIcon = !this.wishListIcon;
        this.$store.dispatch("addToUserWishList", [
          this.$auth.user.id,
          this.product.id
        ]);

        this.$store.dispatch("userWishlistProducts", [this.$auth.user.id]);
      } else {
        this.$emit("display-alert", {
          msg: this.$i18n.t("PleaseRegisterOrLoginToEnjoyYourWishlist"),
          type: "warning"
        });
      }
    },
    deleteWishlistProduct() {
      if (this.$auth.loggedIn) {
        this.$emit("display-alert", {
          msg: this.$i18n.t("ProductdeletedfromYourWishlistSuccessfully"),
          type: "success"
        });

        this.wishListIcon = !this.wishListIcon;
        this.loading = true;
        this.$store.dispatch("deleteWishlistProduct", [
          this.$auth.user.id,
          this.product.id
        ]);

        this.$store.dispatch("userWishlistProducts", [this.$auth.user.id]);
      } else {
        this.$emit("display-alert", {
          msg: this.$i18n.t("PleaseRegisterOrLoginToEnjoyYourWishlist"),
          type: "warning"
        });
      }
    },
    deleteProduct() {
      if (this.$auth.loggedIn) {
        this.$emit("display-alert", {
          msg: this.$i18n.t("ProductdeletedfromYourShoppingCartSuccessfully"),
          type: "success"
        });

        this.cartIcon = false;
        this.loading = true;
        this.$store.dispatch("deleteCartProduct", [
          this.$auth.user.id,
          this.product.id
        ]);
        this.$store.dispatch("userCartProducts", [this.$auth.user.id]);
      } else {
        this.$emit("display-alert", {
          msg: this.$i18n.t("PleaseRegisterOrLoginToEnjoyYourShoppingCart"),
          type: "warning"
        });
      }
    },
    existingWishListProducts() {
      if (this.wishListProducts.product) {
        let idList = [];
        this.wishListProducts.product.forEach(element => {
          idList.push(element.id);
        });

        if (idList.includes(this.product.id)) {
          this.wishListIcon = true;
        }
      }
    },
    existingCartProducts() {
      if (this.cartProducts.product) {
        let idList = [];
        this.cartProducts.product.forEach(element => {
          idList.push(element.id);
        });

        if (idList.includes(this.product.id)) {
          this.cartIcon = true;
        }
      }
    },

    imgurl() {
      return "http://localhost:8000/";
    },

    reviewCount(reviews) {
      return Object.keys(reviews).length;
    },

    rateCount(reviews) {
      let rateTotal = 0;
      let rate = 0;
      for (let i = 0; i < reviews.length; i++) {
        rate = reviews[i].rate;
        rateTotal = rateTotal + rate / reviews.length;
      }
      return Math.round(rateTotal);
    },

    productParam() {
      if (this.$i18n.locale == "en") {
        return this.product.name
          .split(" ")
          .splice(0, 3)
          .join(" ");
      } else if (this.$i18n.locale == "ar") {
        return this.product.ar_name
          .split(" ")
          .splice(0, 3)
          .join(" ");
      }
    },

    routeName(value) {
      return value.toLowerCase();
    }
  },
  computed: {
    ...mapGetters({
      addToCartMsg: "getAddToCartMsg",
      wishListProducts: "getWishListProducts",
      cartProducts: "getCartProducts"
    })
  }
};
</script>

<style lang="scss" scoped>
.card {
  height: auto;
  .img-container {
    position: relative;
    width: 100%;
    height: 250px;
    min-height: 250px;
    max-height: 250px;
    overflow: hidden;
    .card-img {
      width: 100%;
      height: 100%;
      &:hover {
        cursor: pointer;
      }
    }
    .card-icons {
      z-index: 1;
      position: absolute !important;
      bottom: 1rem;
      right: 0.5rem;
      animation: cardIcons 0.5s ease-in-out 0s 1 normal forwards;
      -webkit-animation: cardIcons 0.5s ease-in-out 0s 1 normal forwards;
      -o-animation: cardIcons 0.5s ease-in-out 0s 1 normal forwards;
      -moz-animation: cardIcons 0.5s ease-in-out 0s 1 normal forwards;
      .icon {
        font-size: 1.2rem !important;
      }
    }
    #mob-card-icons {
      z-index: 999 !important;
      position: absolute !important;
      right: 0.5rem;
      .icon {
        font-size: 1.7rem !important;
        z-index: 99999 !important;
      }
    }
  }
  .card-title-wrap {
    overflow: hidden;
    width: 100% !important;
    color: black;
    margin: 0 auto;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
      color: #e65100;
    }
    .card-title {
      max-width: 100% !important;
      font-size: 1.3rem;
      font-weight: 500;
      cursor: pointer;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .card-price {
    margin: 1rem 0 1.1rem;
    font-weight: 500;
    span {
      font-size: 1rem;
    }
  }
}

.red {
  color: red !important;
}
@keyframes cardIcons {
  from {
    right: -4rem;
  }
  to {
    right: 0.5rem;
  }
}
</style>
