<template>
  <div class="main">
    <loading color="black" :loading="loading" opacity="0.5" />
    <v-alert width="500" class="alert" :value="alert" type="success">
      {{ alertMsg }}
    </v-alert>

    <v-row class="row pb-1">
      <v-col cols="2" class="px-0 pb-0">
        <v-img
          contain
          max-height="110"
          :height="$vuetify.breakpoint.smAndDown ? '80' : '120'"
          :width="$vuetify.breakpoint.smAndDown ? '80' : '120'"
          max-width="120"
          class="img mx-auto"
          :src="imageUrl() + product.image"
        >
        </v-img>
      </v-col>

      <v-col cols="4" class="px-0 d-flex align-items align-center flex-column">
        <div v-if="$i18n.locale == 'en'" class="product-name mx-1 my-auto pb-2">
          {{ productName(product.name) }}
        </div>

        <div v-if="$i18n.locale == 'ar'" class="product-name mx-1 my-auto pb-2">
          {{ productName(product.ar_name) }}
        </div>

        <div v-if="$vuetify.breakpoint.smAndUp" class="d-flex align-end">
          <v-rating
            dir="auto"
            :value="rateCount(product.rating)"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
            class="mx-2"
          >
          </v-rating>
          <span class="mx-1 product-ratting">{{
            rateCount(product.rating)
          }}</span>
          <span class="mx-1 product-ratting"
            >({{ reviewCount(product.rating) }})</span
          >
        </div>
      </v-col>

      <v-col cols="2" class="d-flex justify-center align-center"
        ><div class="product-price px-1">{{ product.totalprice }} EGP</div>
      </v-col>

      <v-col cols="2" class="px-0 d-flex justify-center align-center"
        ><div v-if="product.availability > 0" class="product-price">
          {{ $t("InStock") }}
        </div>
      </v-col>

      <v-col
        cols="2"
        class="px-0 d-flex align-center justify-center"
        :class="$vuetify.breakpoint.smAndDown ? 'flex-column' : 'flex-row'"
      >
        <v-tooltip v-if="cartAdd" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-hover v-slot="{ hover }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                class="mx-1"
                @click="addToCart(product.id)"
                :color="hover ? 'orange darken-4' : 'grey darken-2'"
                icon
              >
                <v-icon>mdi-cart-outline</v-icon>
              </v-btn>
            </v-hover>
          </template>
          <span> {{ $t("addToCart") }} </span>
        </v-tooltip>

        <v-tooltip v-else bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-hover v-slot="{ hover }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                class="mx-1"
                @click="deleteCartProduct(product.id)"
                :color="hover ? 'orange darken-4' : 'grey darken-2'"
                icon
              >
                <v-icon>mdi-cart-check</v-icon>
              </v-btn>
            </v-hover>
          </template>
          <span> {{ $t("removeFromShoppingCart") }} </span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-hover v-slot="{ hover }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                class="mx-1"
                @click="deleteProduct(product.id)"
                :color="hover ? 'orange darken-4' : 'grey darken-2'"
                icon
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-hover>
          </template>
          <span> {{ $t("remove") }} </span>
        </v-tooltip>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import loading from "~/components/main/loading";
import { mapGetters } from "vuex";
export default {
  name: "products",
  data() {
    return {
      totalPrice: 0,
      subTotalPrice: 0,
      cartAdd: true,
      loading: false,
      alert: false,
      alertMsg: ""
    };
  },
  components: {
    loading
  },
  mounted() {
    this.existingCartProducts;
  },

  props: ["product"],

  methods: {
    imageUrl() {
      return "http://localhost:8000/";
    },

    productName(name) {
      if (this.product) {
        return name
          .split(" ")
          .splice(0, 3)
          .join(" ");
      }
    },

    deleteProduct(id) {
      this.$store.dispatch("deleteWishlistProduct", [this.$auth.user.id, id]);
      this.$store.dispatch("userWishlistProducts", [this.$auth.user.id]);
      this.alertMsg = this.$i18n.t(
        "ProductdeletedfromYourWishlistSuccessfully"
      );
      this.displayAlert();
    },

    deleteCartProduct(id) {
      this.$store.dispatch("deleteCartProduct", [this.$auth.user.id, id]);
      this.$store.dispatch("userCartProducts", [this.$auth.user.id]);
      this.alertMsg = this.$i18n.t(
        "ProductdeletedfromYourShoppingCartSuccessfully"
      );
      this.displayAlert();
      this.cartAdd = true;
    },

    reviewCount(reviews) {
      if (reviews) {
        return reviews.length;
      }
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

    addToCart(id) {
      this.$store.dispatch("addToUserCart", [this.$auth.user.id, id, 1]);
      this.$store.dispatch("userCartProducts", [this.$auth.user.id]);
      this.alertMsg = this.$i18n.t(
        "ProductAddedToYourShoppingCartSuccessfully"
      );
      this.displayAlert();
      this.cartAdd = false;
    },

    displayAlert() {
      this.loading = true;
      this.alert = false;
      setTimeout(() => {
        this.loading = false;
        this.alert = true;
      }, 2500);
      setTimeout(() => {
        this.alert = false;
      }, 5000);
    }
  },

  computed: {
    ...mapGetters({
      cartProducts: "getCartProducts"
    }),

    existingCartProducts() {
      if (this.cartProducts.product) {
        let idList = [];
        this.cartProducts.product.forEach(element => {
          idList.push(element.id);
        });
        if (idList.includes(this.product.id)) {
          this.cartAdd = false;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.row {
  width: 100%;
  margin: auto;
  border-bottom: 0.5px solid rgb(211, 211, 211);
  .img {
    background-color: rgb(255, 255, 255);
  }
  span {
    font-size: 1.2rem;
  }
  .product-name {
    font-size: 1.3rem;
    font-weight: 500;
    letter-spacing: 0.05rem;
  }
  .product-price {
    font-size: 1.1rem;
    font-weight: 400;
  }
  .product-ratting {
    font-size: 0.9rem;
    font-weight: 400;
    color: rgb(155, 155, 155);
  }
}
.alert {
  z-index: 99999;
  position: fixed;
  top: 10%;
  right: 5%;
}
@media (max-width: 960px) {
  #container {
    max-width: 100%;
  }
  .product-name {
    font-size: 0.9rem !important;
    font-weight: 500 !important;
    letter-spacing: 0.02rem !important;
  }
  .product-price {
    font-size: 0.8rem !important;
    font-weight: 400;
  }
}
</style>
