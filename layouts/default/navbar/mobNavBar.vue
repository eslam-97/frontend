<template>
  <div class="bar-height">
    <v-app-bar
      elevate-on-scroll
      fixed
      hide-on-scroll
      scroll-target=""
      style="padding: 0"
      color="blue-grey lighten-5"
    >
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-toolbar-title
        style="font-size: 1rem"
        :class="$i18n.locale == 'ar' ? 'mr-2' : 'pl-0'"
      >
        {{ $t("menu") }}
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <span style="font-size: 1.6rem; letter-spacing: 0.1rem">Techshop </span>

      <v-spacer></v-spacer>
      <v-hover v-slot="{ hover }">
        <v-btn
          @click="mobSearch = !mobSearch"
          :small="$vuetify.breakpoint.smAndDown"
          :class="$i18n.locale == 'ar' ? 'ml-4' : 'mr-4'"
          icon
        >
          <v-icon
            :color="hover ? 'orange darken-4' : ''"
            :size="$vuetify.breakpoint.smAndDown ? 27 : 33"
            >mdi-magnify</v-icon
          >
        </v-btn>
      </v-hover>

      <v-hover v-slot="{ hover }">
        <nuxt-link :to="localePath('/WishList')" class="text-decoration-none">
          <v-btn
            :small="$vuetify.breakpoint.smAndDown"
            :class="$i18n.locale == 'ar' ? 'ml-5' : 'mr-5'"
            icon
          >
            <v-badge
              overlap
              :value="
                wishListProducts.product && wishListProducts.product.length > 0
                  ? true
                  : false
              "
              :content="
                wishListProducts.product
                  ? wishListProducts.product.length
                  : null
              "
              color="red"
            >
              <v-icon
                :color="hover ? 'orange darken-4' : ''"
                :size="$vuetify.breakpoint.smAndDown ? 25 : 30"
                >mdi-heart-outline</v-icon
              >
            </v-badge>
          </v-btn>
        </nuxt-link>
      </v-hover>

      <v-hover v-slot="{ hover }">
        <nuxt-link
          :to="localePath('/ShoppingCart')"
          class="text-decoration-none"
        >
          <v-btn :small="$vuetify.breakpoint.smAndDown" class="mr-0" icon>
            <v-badge
              overlap
              :value="
                cartProducts.product && cartProducts.product.length > 0
                  ? true
                  : false
              "
              :content="
                cartProducts.product ? cartProducts.product.length : null
              "
              color="red"
            >
              <v-icon
                :color="hover ? 'orange darken-4' : ''"
                :size="$vuetify.breakpoint.smAndDown ? 25 : 30"
                >mdi-cart-outline</v-icon
              >
            </v-badge>
          </v-btn>
        </nuxt-link>
      </v-hover>
    </v-app-bar>

      <div
        :style="$vuetify.breakpoint.xs ? 'width: 97%' : 'width: 60%'"
        class="search-input mx-auto"
        v-if="mobSearch && $vuetify.breakpoint.mdAndDown"
      >
        <search />
      </div>

    <v-navigation-drawer
      class="nav-drawer"
      fixed
      app
      :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
      :right="$i18n.locale == 'ar' ? true : false"
      v-model="drawer"
      color="blue-grey lighten-5"
      v-if="!$vuetify.breakpoint.lg"
      absolute
      temporary
    >
      <v-expansion-panels focusable flat>
        <v-expansion-panel v-if="$auth.loggedIn" class="blue-grey lighten-5">
          <v-expansion-panel-header
            class="px-1 py-2"
            :class="$i18n.locale == 'ar' ? 'pr-0' : ''"
          >
            <v-list-item dir="auto">
              <v-list-item-avatar>
                <v-img
                  :src="'http://localhost:8000/' + $auth.user.avatar"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ $auth.user.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-list dense class="my-1 pa-0 ml-5" nav>
               <nuxt-link
                    :to="localePath('/Account')"
                    class="text-decoration-none"
                  >
              <v-list-item link class="">
                <v-hover v-slot="{ hover }">
                    <v-list-item-title
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
                    </v-list-item-title>
                </v-hover>
              </v-list-item>
              </nuxt-link>

              <nuxt-link
                :to="localePath('/Account')"
                class="text-decoration-none"
              >
                <v-list-item style="min-height: 34px" link class="">
                  <v-hover v-slot="{ hover }">
                    <v-list-item-title
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
                    </v-list-item-title>
                  </v-hover>
                </v-list-item>
              </nuxt-link>

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
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-list dense nav v-if="!$auth.loggedIn" class="my-3">
        <v-list-item>
          <nuxt-link :to="localePath('/register')" class="text-decoration-none">
            <v-btn color="brown lighten-4" raised class="mx-0">
              {{ $t("signUp") }}
            </v-btn>
          </nuxt-link>
          <nuxt-link :to="localePath('/login')" class="text-decoration-none">
            <v-btn
              color="brown lighten-4"
              raised
              class="mx-2"
              style="letter-spacing: 0.16rem"
            >
              {{ $t("login") }}
            </v-btn>
          </nuxt-link>
        </v-list-item>
      </v-list>

      <v-divider class="mx-5"></v-divider>

      <v-list class="ml-0 pb-0">
        <v-hover v-slot="{ hover }">
          <nuxt-link :to="localePath('/')" class="text-decoration-none">
            <v-list-item link>
              <v-icon :color="hover ? 'orange darken-4' : ''" class="ml-2"
                >mdi-home</v-icon
              >
              <v-list-item-title
                class="ml-2 d-flex flex-row justify-space-between"
              >
                <span :class="hover ? 'orange--text text--darken-4' : ''">
                  {{ $t("home") }}</span
                >
              </v-list-item-title>
            </v-list-item>
          </nuxt-link>
        </v-hover>
      </v-list>

      <v-expansion-panels focusable flat class="pt-0">
        <v-expansion-panel class="blue-grey lighten-5">
          <v-hover v-slot="{ hover }">
            <v-expansion-panel-header
              :class="$i18n.locale == 'ar' ? 'pr-4' : ''"
            >
              <div class="blue-grey lighten-5 d-flex flex-row">
                <v-icon
                  :color="hover ? 'orange darken-4' : ''"
                  :class="$i18n.locale == 'ar' ? 'ml-2' : 'mr-2'"
                >
                  mdi-laptop</v-icon
                >
                <span
                  :class="hover ? 'orange--text text--darken-4' : ''"
                  class="mt-1"
                >
                  {{ $t("LAPTOP") }}</span
                >
              </div>
            </v-expansion-panel-header>
          </v-hover>

          <v-expansion-panel-content>
            <v-list-item
              v-for="brand in productCategories.LAPTOP"
              @click="getBrand('LAPTOP', brand.en_brand)"
              :key="brand.en_brand"
              link
            >
              <v-hover v-slot="{ hover }">
                <v-list-item-content>
                  <v-list-item-title>
                    <span
                      v-if="$i18n.locale == 'en'"
                      :class="
                        hover ? 'orange--text text--darken-4' : 'black--text'
                      "
                    >
                      {{ brand.en_brand }}</span
                    >
                    <span
                      v-if="$i18n.locale == 'ar'"
                      :class="
                        hover ? 'orange--text text--darken-4' : 'black--text'
                      "
                    >
                      {{ brand.ar_brand }}</span
                    >
                  </v-list-item-title>
                </v-list-item-content>
              </v-hover>
            </v-list-item>
            <v-divider
              :class="$i18n.locale == 'ar' ? 'ml-5' : 'mr-5'"
            ></v-divider>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel class="blue-grey lighten-5">
          <v-hover v-slot="{ hover }">
            <v-expansion-panel-header
              :class="$i18n.locale == 'ar' ? 'pr-4' : ''"
            >
              <div class="blue-grey lighten-5 d-flex flex-row">
                <v-icon
                  :color="hover ? 'orange darken-4' : ''"
                  :class="$i18n.locale == 'ar' ? 'ml-2' : 'mr-2'"
                >
                  mdi-cellphone</v-icon
                >
                <span
                  :class="hover ? 'orange--text text--darken-4' : ''"
                  class="mt-1"
                >
                  {{ $t("MOBILE") }}</span
                >
              </div>
            </v-expansion-panel-header>
          </v-hover>

          <v-expansion-panel-content>
            <v-list-item
              v-for="brand in productCategories.MOBILE"
              @click="getBrand('MOBILE', brand.en_brand)"
              :key="brand.en_brand"
              link
            >
              <v-hover v-slot="{ hover }">
                <v-list-item-content>
                  <v-list-item-title>
                    <span
                      v-if="$i18n.locale == 'en'"
                      :class="
                        hover ? 'orange--text text--darken-4' : 'black--text'
                      "
                    >
                      {{ brand.en_brand }}
                    </span>
                    <span
                      v-if="$i18n.locale == 'ar'"
                      :class="
                        hover ? 'orange--text text--darken-4' : 'black--text'
                      "
                    >
                      {{ brand.ar_brand }}</span
                    >
                  </v-list-item-title>
                </v-list-item-content>
              </v-hover>
            </v-list-item>
            <v-divider
              :class="$i18n.locale == 'ar' ? 'ml-5' : 'mr-5'"
            ></v-divider>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel class="blue-grey lighten-5">
          <v-hover v-slot="{ hover }">
            <v-expansion-panel-header
              :class="$i18n.locale == 'ar' ? 'pr-4' : ''"
            >
              <div class="blue-grey lighten-5 d-flex flex-row">
                <v-icon
                  :color="hover ? 'orange darken-4' : ''"
                  :class="$i18n.locale == 'ar' ? 'ml-2' : 'mr-2'"
                >
                  mdi-tablet</v-icon
                >
                <span
                  :class="hover ? 'orange--text text--darken-4' : ''"
                  class="mt-1"
                >
                  {{ $t("TABLET") }}
                </span>
              </div>
            </v-expansion-panel-header>
          </v-hover>

          <v-expansion-panel-content>
            <v-list-item
              v-for="brand in productCategories.TABLET"
              @click="getBrand('TABLET', brand.en_brand)"
              :key="brand.en_brand"
              link
            >
              <v-hover v-slot="{ hover }">
                <v-list-item-content>
                  <v-list-item-title>
                    <span
                      v-if="$i18n.locale == 'en'"
                      :class="
                        hover ? 'orange--text text--darken-4' : 'black--text'
                      "
                    >
                      {{ brand.en_brand }}</span
                    >
                    <span
                      v-if="$i18n.locale == 'ar'"
                      :class="
                        hover ? 'orange--text text--darken-4' : 'black--text'
                      "
                    >
                      {{ brand.ar_brand }}</span
                    >
                  </v-list-item-title>
                </v-list-item-content>
              </v-hover>
            </v-list-item>
            <v-divider
              :class="$i18n.locale == 'ar' ? 'ml-5' : 'mr-5'"
            ></v-divider>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel class="blue-grey lighten-5">
          <v-hover v-slot="{ hover }">
            <v-expansion-panel-header
              :class="$i18n.locale == 'ar' ? 'pr-4' : ''"
            >
              <div class="blue-grey lighten-5 d-flex flex-row">
                <v-icon
                  :color="hover ? 'orange darken-4' : ''"
                  :class="$i18n.locale == 'ar' ? 'ml-2' : 'mr-2'"
                >
                  mdi-shopping-outline</v-icon
                >
                <span
                  :class="hover ? 'orange--text text--darken-4' : ''"
                  class="mt-1"
                >
                  {{ $t("ACCESSORIES") }}</span
                >
              </div>
            </v-expansion-panel-header>
          </v-hover>

          <v-expansion-panel-content>
            <v-list-item
              v-for="brand in productCategories.ACCESSORIES"
              @click="getBrand('ACCESSORIES', brand.en_brand)"
              :key="brand.en_brand"
              link
            >
              <v-hover v-slot="{ hover }">
                <v-list-item-content>
                  <v-list-item-title>
                    <span
                      v-if="$i18n.locale == 'en'"
                      :class="
                        hover ? 'orange--text text--darken-4' : 'black--text'
                      "
                    >
                      {{ brand.en_brand }}</span
                    >
                    <span
                      v-if="$i18n.locale == 'ar'"
                      :class="
                        hover ? 'orange--text text--darken-4' : 'black--text'
                      "
                    >
                      {{ brand.ar_brand }}</span
                    >
                  </v-list-item-title>
                </v-list-item-content>
              </v-hover>
            </v-list-item>
            <v-divider
              :class="$i18n.locale == 'ar' ? 'ml-5' : 'mr-5'"
            ></v-divider>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-list class="ml-0 pt-0">
        <v-hover v-slot="{ hover }">
          <v-list-item link>
            <v-icon :color="hover ? 'orange darken-4' : ''" class="ml-2"
              >mdi-forum</v-icon
            >
            <v-list-item-title
              class="ml-2 d-flex flex-row justify-space-between"
            >
              <span :class="hover ? 'orange--text text--darken-4' : ''">
                {{ $t("AboutUs") }}</span
              >
            </v-list-item-title>
          </v-list-item>
        </v-hover>
      </v-list>

      <v-divider class="mx-5"></v-divider>

      <v-expansion-panels focusable flat>
        <v-expansion-panel class="blue-grey lighten-5">
          <v-expansion-panel-header :class="$i18n.locale == 'ar' ? 'pr-4' : ''">
            <v-hover v-slot="{ hover }">
              <div class="d-flex flex-row">
                <span :class="$i18n.locale == 'ar' ? 'ml-2' : 'mr-2'">
                  <v-icon :color="hover ? 'orange darken-4' : ''">
                    mdi-translate
                  </v-icon>
                </span>
                <span :class="hover ? 'orange--text text--darken-4' : ''">
                  {{ $t("language") }}
                </span>
              </div>
            </v-hover>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list-item @click.prevent.stop="$i18n.setLocale('ar')" link>
              <v-hover v-slot="{ hover }">
                <v-list-item-title dir="auto" class="ml-2">
                  <img
                    src="../../../assets/img/egypt.png"
                    height="18"
                    width="18"
                    class="ml-1 mb-n1"
                    alt=""
                  />
                  <span
                    class=""
                    :class="hover ? 'orange--text text--darken-4' : ''"
                  >
                    العربية
                    <v-icon v-if="$i18n.locale == 'ar'" color="success" right>
                      mdi-checkbox-marked-circle
                    </v-icon></span
                  >
                </v-list-item-title>
              </v-hover>
            </v-list-item>

            <v-list-item @click.prevent.stop="$i18n.setLocale('en')" link>
              <v-hover v-slot="{ hover }">
                <v-list-item-content>
                  <v-list-item-title dir="auto" class="ml-2">
                    <img
                      src="../../../assets/img/britain.png"
                      height="18"
                      width="18"
                      class="ml-1 mb-n1"
                      alt=""
                    />
                    <span :class="hover ? 'orange--text text--darken-4' : ''">
                      English
                      <v-icon v-if="$i18n.locale == 'en'" color="success" right>
                        mdi-checkbox-marked-circle
                      </v-icon>
                    </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-hover>
            </v-list-item>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import search from "~/components/main/search";

export default {
  name: "mobNavBar",
  data() {
    return {
      mobSearch: false,
      drawer: null
    };
  },
  components: {
    search
  },
  methods: {
    logout() {
      this.$store.dispatch("authentication/logout");
      this.$router.push(this.localePath("/"));
    },

    getBrand(type, brand) {
      console.log(brand);
      this.$store.commit("filters/setSelectedFilters", []);
      this.$store.dispatch("filters/productByBrand", [type, brand]);
      this.$router.push(this.localePath("/" + type));
    }
  },

  computed: {
    ...mapGetters({
      cartProducts: "getCartProducts",
      wishListProducts: "getWishListProducts",
      productCategories: "home/getProductCategories"
    })
  }
};
</script>

<style lang="scss" scoped>
.nav-drawer {
  position: fixed;
  top: 0;
  height: 100%;
}
.bar-height {
  height: 3.5rem;
}
.search-input {
  margin-top: 3.7rem;
  position: relative;
  display: block;
}
</style>
