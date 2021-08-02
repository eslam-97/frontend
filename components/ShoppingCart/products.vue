<template>
  <div class="main">
    <loading color="black" :loading="editLoading" opacity="0.5" />
    <v-alert width="500" class="alert" :value="alert" type="success">
      {{ alertMsg }}
    </v-alert>

    <v-app-bar
      v-if="$vuetify.breakpoint.smAndDown"
      class="grey lighten-5"
      scroll-threshold="200"
      style="z-index: 99999"
      fixed
      bottom
      hide-on-scroll
      scroll-target=""
      id="bottom-header"
      height="80"
    >
      <div id="btn-wrap" class="d-flex flex-column align-items">
        <span class="order-total mb-auto d-flex justify-space-between">
          <span class="mx-5"> {{ $t("orderTotal") }} </span>
          <span class="mx-5"> {{ totalPrice }} EGP</span>
        </span>
        <v-hover v-slot="{ hover }">
          <v-btn
            block
            :class="hover ? 'darken-2' : ''"
            tile
            id="mob-checkout-btn"
            color="success "
          >
            {{ $t("gotoCheckout") }}
          </v-btn>
        </v-hover>
      </div>
    </v-app-bar>

    <v-container id="con" :fluid="$vuetify.breakpoint.md">
      <div class="main-title text-start">
        {{ $t("YouHave") }}
        <span v-if="products" class="green--text num">
          {{ products.product.length }}</span
        >
        {{ $t("ItemsInYourCart") }}
      </div>

      <v-card elevation="4" class="card">
        <v-row class="grey lighten-4 row">
          <v-col cols="6" md="5">
            <div class="text-center">{{ $t("Product") }}</div>
          </v-col>

          <v-divider vertical></v-divider>
          <v-col cols="2" md="3">
            <div class="text-center">{{ $t("Quantity") }}</div>
          </v-col>

          <v-divider vertical></v-divider>
          <v-col cols="2">
            <div class="text-center">{{ $t("Price") }}</div>
          </v-col>

          <v-divider vertical></v-divider>
          <v-col cols="2">
            <div class="text-center">{{ $t("Total") }}</div>
          </v-col>
        </v-row>

        <v-row
          v-for="product in products.product"
          :key="product.id"
          class="row pb-1"
        >
          <v-col
            cols="6"
            md="5"
            class="d-flex pb-0"
            :class="
              $vuetify.breakpoint.smAndDown
                ? 'flex-column align-center'
                : 'flex-row'
            "
          >
            <v-img
              contain
              max-height="120"
              height="120"
              width="120"
              max-width="120"
              class="img"
              :src="imageUrl() + product.image"
            >
            </v-img>
            <div style="width: 100%" class="d-flex flex-column align-items">
              <div
                v-if="$i18n.locale == 'en'"
                :class="$vuetify.breakpoint.smAndDown ? 'mx-auto' : ''"
                class="product-name mb-auto"
              >
                {{ productName(product.name) }}
              </div>

              <div
                v-if="$i18n.locale == 'ar'"
                :class="$vuetify.breakpoint.smAndDown ? 'mx-auto' : ''"
                class="product-name mb-auto"
              >
                {{ productName(product.ar_name) }}
              </div>

              <div class="product-icons mt-auto pt-2 mx-auto d-flex">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-hover v-slot="{ hover }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
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
              </div>
            </div>
          </v-col>

          <v-col md="3" cols="2" class="d-flex justify-center align-center">
            <div
              :class="
                $vuetify.breakpoint.smAndDown
                  ? 'd-flex flex-column Quantity-icons'
                  : 'd-flex Quantity-icons'
              "
            >
              <v-btn
                class="px-2"
                @click="updateQuantity(product.id, product.pivot.quantity + 1)"
                icon
              >
                <v-icon class="icon">mdi-plus</v-icon>
              </v-btn>
              <v-divider vertical></v-divider>
              <span
                class="icon"
                :class="$vuetify.breakpoint.smAndDown ? 'px-3' : 'px-5 pt-1'"
                >{{ product.pivot.quantity }}</span
              >
              <v-divider vertical></v-divider>
              <v-btn
                class="px-2"
                @click="updateQuantity(product.id, product.pivot.quantity - 1)"
                icon
              >
                <v-icon class="icon">mdi-minus</v-icon>
              </v-btn>
            </div>
          </v-col>

          <v-col cols="2" class="d-flex justify-center align-center">
            {{ product.price * product.pivot.quantity }} EGP
          </v-col>

          <v-col cols="2" class="d-flex justify-center align-center">
            {{ product.totalprice * product.pivot.quantity }} EGP
          </v-col>
        </v-row>
      </v-card>

      <v-row class="second-row" justify="end" align="start">
        <v-simple-table dense class="table">
          <template v-slot:default>
            <tbody>
              <tr class="">
                <td>{{ $t("Subtotal") }}</td>
                <td class="px-16"></td>
                <td>{{ subTotalPrice }} EGP</td>
              </tr>
              <tr>
                <td>{{ $t("shipping") }}</td>
                <td class="px-16"></td>
                <td>0 EGP</td>
              </tr>
              <tr>
                <td class="py-3">{{ $t("Total") }}</td>
                <td class="px-16"></td>
                <td class="py-3">{{ totalPrice }} EGP</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-row>

      <v-row class="mb-16 mt-4" justify="space-around">
        <v-hover v-slot="{ hover }">
          <nuxt-link class="text-decoration-none" to="/">
            <v-btn elevation="3" :outlined="hover" color="orange darken-4">
              {{ $t("continueShopping") }}
            </v-btn>
          </nuxt-link>
        </v-hover>

        <v-hover v-slot="{ hover }">
          <v-btn elevation="3" :outlined="hover" color="success">
            {{ $t("gotoCheckout") }}
          </v-btn>
        </v-hover>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import loading from "~/components/main/loading";

export default {
  name: "product",
  data() {
    return {
      totalPrice: 0,
      subTotalPrice: 0,
      editLoading: false,
      wishListIcon: false,
      alert: false,
      alertMsg: ""
    };
  },
  mounted() {
    this.computePrice;
  },
  components: {
    loading
  },

  props: ["products"],

  methods: {
    imageUrl() {
      return "http://localhost:8000/";
    },

    productName(name) {
      if (this.products) {
        return name
          .split(" ")
          .splice(0, 3)
          .join(" ");
      }
    },

    deleteProduct(id) {
      this.alertMsg = this.$i18n.t(
        "ProductdeletedfromYourShoppingCartSuccessfully"
      );
      this.displayAlert();
      this.$store.dispatch("deleteCartProduct", [this.$auth.user.id, id]);
      this.$store.dispatch("userCartProducts", [this.$auth.user.id]);
    },

    updateQuantity(id, quantity) {
      if (quantity !== 0) {
        this.editLoading = true;
        this.$store.dispatch("addToUserCart", [
          this.$auth.user.id,
          id,
          quantity
        ]);
        this.$store.dispatch("userCartProducts", [this.$auth.user.id]);
      }
    },

    displayAlert() {
      this.editLoading = true;
      this.alert = false;
      setTimeout(() => {
        this.editLoading = false;
        this.alert = true;
      }, 1500);
      setTimeout(() => {
        this.alert = false;
      }, 4500);
    }
  },

  computed: {
    computePrice() {
      if (this.products) {
        this.totalPrice = 0;
        this.subTotalPrice = 0;
        if (this.products.product.length == 1) {
          this.totalPrice =
            this.products.product[0].totalprice *
            this.products.product[0].pivot.quantity;
          this.subTotalPrice =
            this.products.product[0].price *
            this.products.product[0].pivot.quantity;
        } else {
          this.products.product.forEach(element => {
            this.totalPrice += element.totalprice * element.pivot.quantity;
            this.subTotalPrice += element.price * element.pivot.quantity;
          });
        }
      }
    }
  },

  watch: {
    products() {
      this.computePrice;
      this.editLoading = false;
    }
  },
 
};
</script>

<style lang="scss" scoped>
.main {
  background-color: rgb(250, 250, 250);
  .main-title,
  .num {
    margin-top: 1rem;
    font-size: 1.6rem;
  }
  .card {
    margin: 1rem 0;
    height: auto;
    .row {
      width: 100%;
      margin: auto;
      border: 0.5px solid rgb(230, 230, 230);

      span {
        font-size: 1.2rem;
      }
      .product-name {
        font-size: 1.2rem;
        font-weight: 500;
        letter-spacing: 0.05rem;
      }
      .Quantity-icons {
        background-color: rgb(250, 250, 250);
        border: 0.5px solid rgb(230, 230, 230);
        .icon {
          font-size: 1rem !important;
          color: black;
        }
      }
    }
  }
}
.second-row {
  width: 100%;
  margin: auto;
  span {
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 0.05rem;
  }
  .table {
    background-color: rgb(250, 250, 250);
    width: auto;
    font-weight: 400;
    letter-spacing: 0.07rem;
    border: 0.5px solid rgb(240, 240, 240);
  }
}
#bottom-header {
  background-color: rgb(233, 233, 233);
  #btn-wrap {
    width: 100% !important;
    height: 100% !important;
    .order-total {
      font-size: 1.1rem;
      font-weight: 400;
      letter-spacing: 0.06rem;
    }
    #mob-checkout-btn {
      width: 100% !important;
      max-width: 100% !important;
      max-height: 40px;
      margin: 0 auto;
      color: white !important;
      font-weight: 600;
      letter-spacing: 0.08rem;
    }
  }
}

@media (max-width: 960px) {
  .second-row {
    .table {
      width: 100%;
    }
  }
  .card {
    .row {
      .product-name {
        font-size: 1rem !important;
        font-weight: 500 !important;
        letter-spacing: 0.02rem !important;
      }
    }
  }
}
</style>
