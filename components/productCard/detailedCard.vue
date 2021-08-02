<template>
  <div>
    <v-alert width="500" class="alert" :value="alert" :type="alertType">
      {{ alertMsg }}
    </v-alert>

    <v-container :fluid="$vuetify.breakpoint.mdAndDown">
      <loading :loading="loading" opacity="0.5" />
      <v-row class="mb-10">
        <client-only>
          <v-col
            v-if="$vuetify.breakpoint.smAndDown"
            sm="8"
            cols="12"
            class=""
            offset-sm="2"
            offset="0"
          >
            <agile
              ref="mobSlider"
              dir="auto"
              :options="myOptions3"
              class="slider mx-auto"
            >
              <div class="slide">
                <v-img
                  contain
                  :src="imgurl() + product.image"
                  class="card-img"
                  max-height="350"
                >
                  <v-badge
                    offset-x="-10"
                    offset-y="20"
                    bordered
                    v-if="product.discount !== 0"
                    class="ml-3 mb-n2"
                    content=" - 5% "
                    color="red"
                  >
                  </v-badge>
                </v-img>
              </div>

              <div class="slide">
                <v-img
                  contain
                  :src="imgurl() + product.image_2"
                  class="card-img"
                  max-height="350"
                >
                  <v-badge
                    offset-x="-10"
                    offset-y="20"
                    bordered
                    v-if="product.discount !== 0"
                    class="ml-3 mb-n2"
                    content=" - 5% "
                    color="red"
                  >
                  </v-badge>
                </v-img>
              </div>
            </agile>
            <div dir="auto" class="mt-3 text-center">
              <v-btn class="mx-2" @click="$refs.mobSlider.goToPrev()" icon
                ><v-icon>mdi-chevron-left</v-icon></v-btn
              >
              <v-btn class="mx-2" @click="$refs.mobSlider.goToNext()" icon
                ><v-icon>mdi-chevron-right</v-icon></v-btn
              >
            </div>
          </v-col>
        </client-only>

        <client-only>
          <v-col
            v-if="$vuetify.breakpoint.mdAndUp"
            cols="6"
            md="5"
            class=""
            offset-md="0"
            offset="3"
          >
            <div class="d-flex flex-column mr-3">
              <agile
                dir="auto"
                ref="main"
                :as-nav-for="asNavFor1"
                :options="myOptions2"
                class="slider mx-auto"
                @after-change="e => (currentSlide = e.currentSlide)"
              >
                <div class="slide">
                  <v-img
                    contain
                    :src="imgurl() + product.image_2"
                    class="card-img"
                    height="400"
                  >
                    <v-badge
                      offset-x="-10"
                      offset-y="20"
                      bordered
                      v-if="product.discount !== 0"
                      class="ml-3 mb-n2"
                      content=" - 5% "
                      color="red"
                    >
                    </v-badge>
                  </v-img>
                </div>

                <div class="slide">
                  <v-img
                    contain
                    :src="imgurl() + product.image"
                    class="card-img"
                    height="400"
                  >
                    <v-badge
                      offset-x="-10"
                      offset-y="20"
                      bordered
                      v-if="product.discount !== 0"
                      class="ml-3 mb-n2"
                      content=" - 5% "
                      color="red"
                    >
                    </v-badge>
                  </v-img>
                </div>

                <div class="slide">
                  <v-img
                    contain
                    :src="imgurl() + product.image_2"
                    class="card-img"
                    height="400"
                  >
                    <v-badge
                      offset-x="-10"
                      offset-y="20"
                      bordered
                      v-if="product.discount !== 0"
                      class="ml-3 mb-n2"
                      content=" - 5% "
                      color="red"
                    >
                    </v-badge>
                  </v-img>
                </div>
              </agile>

              <agile
                dir="auto"
                ref="thumbnails"
                :as-nav-for="asNavFor2"
                :options="myOptions"
                class="slider mx-auto"
              >
                <div
                  @mouseover="$refs.main.goTo(0)"
                  class="slide px-2 thumbnails-wraper"
                >
                  <v-img
                    contain
                    :src="imgurl() + product.image_2"
                    class="thumbnails-img"
                    width="auto"
                    max-height="70"
                  >
                  </v-img>
                </div>

                <div
                  @mouseover="$refs.main.goTo(1)"
                  class="slide px-2 thumbnails-wraper"
                >
                  <v-img
                    contain
                    :src="imgurl() + product.image"
                    class="thumbnails-img"
                    width="auto"
                    max-height="70"
                  >
                  </v-img>
                </div>

                <div
                  @mouseover="$refs.main.goTo(2)"
                  class="slide px-2 thumbnails-wraper"
                >
                  <v-img
                    contain
                    :src="imgurl() + product.image_2"
                    class="thumbnails-img"
                    width="auto"
                    max-height="70"
                  >
                  </v-img>
                </div>
              </agile>
            </div>
          </v-col>
        </client-only>

        <v-col class="mt-2" cols="12" md="7">
          <div class="mx-md-0 mx-sm-16 mx-0">
            <v-row class="mb-0">
              <div v-if="$i18n.locale == 'en'" class="card-title">
                {{ product.name }}
              </div>
              <div v-if="$i18n.locale == 'ar'" class="card-title">
                {{ product.ar_name }}
              </div>
            </v-row>

            <v-row class="mb-5">
              <v-rating
                dir="auto"
                :value="rateCount(product.rating)"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
                class="pa-0"
              >
              </v-rating>
              <span>
                <v-badge
                  :class="$i18n.locale == 'en' ? 'ml-3' : 'mr-3'"
                  :content="reviewCount(product.rating)"
                  inline
                  color="grey lighten-3 black--text"
                >
                </v-badge>
              </span>
              <span
                ><small> {{ $t("Review") }} </small></span
              >
            </v-row>

            <v-row class="mb-7">
              <div class="card-price">{{ product.totalprice }} EGP</div>
              &nbsp; &nbsp;
              <div
                v-if="product.discount !== 0"
                class="deleted-price text-decoration-line-through"
              >
                {{ product.price }} EGP
              </div>
            </v-row>

            <v-row class="sub-text">
              {{ $t("Brand") }}:&nbsp;
              <p v-if="$i18n.locale == 'en'">
                {{ brand(product.name) }}
              </p>
              <p v-if="$i18n.locale == 'ar'">
                {{ brand(product.ar_name) }}
              </p>
            </v-row>

            <v-row class="sub-text">
              {{ $t("Category") }}:&nbsp;
              <p>{{ type }}</p>
            </v-row>

            <v-row class="sub-text mb-1">
              {{ $t("Avaiability") }}:&nbsp;
              <v-badge
                class=""
                :content="product.availability"
                inline
                color="grey"
              >
              </v-badge>
              &nbsp;

              <p class="orange--text text--darken-4">
                {{ $t("InStock") }}
              </p>
            </v-row>

            <span class="sub-text-title"> {{ $t("Overview") }}: </span>
            <p class="sub-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididu labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco ex ea commodo
              consequat.
            </p>

            <v-row justify="space-between" class="mt-11 d-flex">
              <v-col
                class="
                           justify-end
                           d-flex
                           justify-md-start
                           order-md-1 order-2
                        "
                cols="5"
                md="4"
              >
                <div class="">
                  <v-btn
                    @click="quantityNum == 1 ? '' : quantityNum--"
                    elevation="0"
                    color="grey lighten-3"
                    small
                    fab
                  >
                    <v-icon color="red">mdi-arrow-down</v-icon>
                  </v-btn>
                  <span class="px-3 px-auto mx-2 py-2 qty-num">
                    {{ quantityNum }}
                  </span>
                  <v-btn
                    @click="
                      quantityNum == product.availability ? '' : quantityNum++
                    "
                    elevation="0"
                    color="grey lighten-3"
                    small
                    fab
                  >
                    <v-icon color="red">mdi-arrow-up</v-icon>
                  </v-btn>
                </div>
              </v-col>

              <v-col
                class="text-center mx-auto order-md-2 order-3"
                cols="10"
                md="4"
              >
                <div>
                  <v-hover v-slot="{ hover }">
                    <v-btn
                      v-if="cartIcon == false"
                      rounded
                      :outlined="hover"
                      large
                      elevation="5"
                      class="btn-text"
                      @click="addToCart()"
                      width="200"
                      color="orange darken-4"
                    >
                      {{ $t("addToCart") }}
                    </v-btn>
                    <v-btn
                      v-else
                      rounded
                      :outlined="hover"
                      large
                      elevation="5"
                      class="btn-text"
                      @click="deleteProduct()"
                      width="220"
                      color="orange darken-4"
                    >
                      {{ $t("addedToCart") }}
                      <v-icon
                        size="25"
                        :color="hover ? 'orange darken-4' : 'black'"
                        right
                      >
                        mdi-checkbox-marked-circle
                      </v-icon>
                    </v-btn>
                  </v-hover>
                </div>
              </v-col>

              <v-col class="order-md-3 order-1" cols="4" md="3">
                <div class="d-flex justify-center justify-md-end">
                  <v-tooltip v-if="wishListIcon == false" bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        @click="addToWishlist()"
                        elevation="2"
                        outlined
                        color="orange darken-4"
                        icon
                        large
                      >
                        <v-icon>mdi-heart-outline</v-icon>
                      </v-btn>
                    </template>
                    <small> {{ $t("addtowishlist") }} </small>
                  </v-tooltip>
                  <v-tooltip v-else bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        @click="deleteWishlistProduct()"
                        elevation="2"
                        outlined
                        color="orange darken-4"
                        icon
                        large
                        class="mx-3"
                      >
                        <v-icon color="red"> mdi-heart </v-icon>
                      </v-btn>
                    </template>
                    <small>{{ $t("RemoveFromWishlist") }} </small>
                  </v-tooltip>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import loading from "~/components/main/loading.vue";
import { mapGetters } from "vuex";

export default {
  name: "detailedCard",
  data() {
    return {
      quantityNum: 1,
      wishListIcon: false,
      cartIcon: false,
      alert: false,
      alertMsg: "",
      loading: false,
      alertType: "success",
      currentSlide: 0,
      asNavFor1: [],
      asNavFor2: [],
      myOptions: {
        dots: false,
        navButtons: false,
        slidesToShow: 2,
        responsive: [
          {
            breakpoint: 580,
            settings: {
              navButtons: false,
              dots: false,
              slidesToShow: 3
            }
          }
        ]
      },
      myOptions2: {
        dots: false,
        navButtons: false,
        fade: false
      },
      myOptions3: {
        dots: true,
        navButtons: false,
        fade: false,
        pauseOnHover: true,
        changeDelay: 8000
      },
      tabs: null
    };
  },

  mounted() {
    this.agileRefs();
    this.existingCartProducts;
    this.existingWishListProducts;
  },
  components: {
    loading
  },

  props: ["product", "type"],

  methods: {
    addToCart() {
      if (this.$auth.loggedIn) {
        this.alertMsg = this.$i18n.t(
          "ProductAddedToYourShoppingCartSuccessfully"
        );
        this.displayAlert("success");
        this.cartIcon = true;
        this.$store.dispatch("addToUserCart", [
          this.$auth.user.id,
          this.product.id,
          this.quantityNum
        ]);

        this.$store.dispatch("userCartProducts", [this.$auth.user.id]);
      } else {
        this.alertMsg = this.$i18n.t(
          "PleaseRegisterOrLoginToEnjoyYourShoppingCart"
        );
        this.displayAlert("warning");
      }
    },

    addToWishlist() {
      if (this.$auth.loggedIn) {
        this.alertMsg = this.$i18n.t("ProductAddedToYourWishlistSuccessfully");
        this.displayAlert("success");
        this.wishListIcon = !this.wishListIcon;
        this.$store.dispatch("addToUserWishList", [
          this.$auth.user.id,
          this.product.id
        ]);

        this.$store.dispatch("userWishlistProducts", [this.$auth.user.id]);
      } else {
        this.alertMsg = this.$i18n.t(
          "PleaseRegisterOrLoginToEnjoyYourWishlist"
        );
        this.displayAlert("warning");
      }
    },

    deleteProduct() {
      if (this.$auth.loggedIn) {
        this.alertMsg = this.$i18n.t(
          "ProductdeletedfromYourShoppingCartSuccessfully"
        );
        this.displayAlert("success");
        this.cartIcon = false;
        this.$store.dispatch("deleteCartProduct", [
          this.$auth.user.id,
          this.product.id
        ]);

        this.$store.dispatch("userCartProducts", [this.$auth.user.id]);
      } else {
        this.alertMsg = this.$i18n.t(
          "PleaseRegisterOrLoginToEnjoyYourShoppingCart"
        );
        this.displayAlert("warning");
      }
    },

    deleteWishlistProduct() {
      if (this.$auth.loggedIn) {
        this.alertMsg = this.$i18n.t(
          "ProductdeletedfromYourWishlistSuccessfully"
        );
        this.displayAlert("success");
        this.wishListIcon = !this.wishListIcon;
        this.$store.dispatch("deleteWishlistProduct", [
          this.$auth.user.id,
          this.product.id
        ]);

        this.$store.dispatch("userWishlistProducts", [this.$auth.user.id]);
      } else {
        this.alertMsg = this.$i18n.t(
          "PleaseRegisterOrLoginToEnjoyYourWishlist"
        );
        this.displayAlert("warning");
      }
    },

    agileRefs() {
      this.asNavFor1.push(this.$refs.thumbnails);
      this.asNavFor2.push(this.$refs.main);
    },

    imgurl() {
      return "http://localhost:8000/";
    },

    reviewCount(reviews) {
      if (reviews) {
        if (Object.keys(reviews).length > 0) {
          return Object.keys(reviews).length;
        } else {
          return "0";
        }
      }
    },

    rateCount(reviews) {
      if (reviews) {
        let rateTotal = 0;
        let rate = 0;
        for (let i = 0; i < reviews.length; i++) {
          rate = reviews[i].rate;
          rateTotal = rateTotal + rate / reviews.length;
        }
        return Math.round(rateTotal);
      }
    },

    brand(name) {
      if (name) {
        return name
          .split(" ")
          .splice(0, 1)
          .join(" ");
      }
    },

    displayAlert(value) {
      if (value == "warning") {
        this.alertType = value;
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 1500);
      } else {
        this.loading = true;
        this.alert = false;
        this.alertType = value;
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
      getLang: "getLang",
      addToCartMsg: "getAddToCartMsg",
      wishListProducts: "getWishListProducts",
      cartProducts: "getCartProducts"
    }),

    existingWishListProducts() {
      if (this.wishListProducts.product) {
        let idList = [];
        this.wishListProducts.product.forEach(element => {
          idList.push(element.id);
        });
        if (idList.includes(this.product.id)) {
          this.wishListIcon = true;
        } else {
          this.wishListIcon = false;
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
        } else {
          this.cartIcon = false;
        }
      }
    }
  },
  watch: {
    wishListProducts() {
      this.existingWishListProducts;
    },
    cartProducts() {
      this.existingCartProducts;
    }
  }
};
</script>

<style lang="scss" scoped>
.slider {
  width: 90%;
}
.thumbnails-wraper {
  background-color: rgb(255, 255, 255);
  .thumbnails-img {
    cursor: pointer;
    &:hover {
      background-color: rgb(245, 245, 245);
    }
  }
}
.slide-arrow {
  transform: translateY(-65px);
}

.card-img {
  border: 0.001rem solid #dfdfdf;
}
.card-title {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.08rem;
  color: rgb(82, 82, 82);
  line-height: 2.2rem;
}
.card-price {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 0.05rem;
  color: rgb(206, 75, 0);
}
.deleted-price {
  margin-top: 0.3rem;
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.05rem;
  color: rgb(151, 151, 151);
}
.sub-text {
  font-size: 0.9rem;
  font-weight: 400;
  color: rgb(31, 31, 31);
  letter-spacing: 0.05rem;
  p {
    font-size: 0.9rem;
    color: rgb(121, 121, 121);
  }
}
.sub-text-title {
  font-size: 1rem;
  font-weight: 500;
  color: rgb(0, 0, 0);
  letter-spacing: 0.05rem;
}
.btn-text {
  font-weight: 600;
  letter-spacing: 0.1rem;
}
.qty-num {
  background-color: rgb(250, 250, 250);
  border: 0.001rem solid #eeeeee;
}
.alert {
  z-index: 99999;
  position: fixed;
  top: 12%;
  right: 5%;
  padding: 0 20px;
}
@media (max-width: 900px) {
  .card-title {
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 0.05rem;
    color: rgb(82, 82, 82);
    line-height: 2rem;
  }
}
</style>
