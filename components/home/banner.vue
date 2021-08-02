<template>
  <div>
    <v-container>
      <v-row class="mb-15">
        <v-carousel
          hide-delimiter-background
          height="auto"
          cycle
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(image, i) in carouselImages" :key="i">
            <v-img
              class="banner-img"
              :src="require('./../../assets/img/' + image)"
            >
            </v-img>
          </v-carousel-item>
        </v-carousel>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row class="row-margin" justify="center">
        <v-col cols="6" sm="5" md="3">
          <nuxt-link :to="localePath('/laptop')" class="text-decoration-none">
            <v-card @click="laptopProducts()" hover>
              <v-img
                contain
                max-height="250"
                class="align-end justify-center white--text"
                :src="require('./../../assets/img/laptop.jpg')"
              >
              </v-img>

              <v-row align="center" justify="center">
                <v-card-title class="pb-2 pt-5">
                  {{ $t("LAPTOP") }}
                </v-card-title>
              </v-row>
            </v-card>
          </nuxt-link>
        </v-col>

        <v-col cols="6" sm="5" md="3">
          <nuxt-link :to="localePath('/mobile')" class="text-decoration-none">
            <v-card @click="mobileProducts()" hover>
              <v-img
                max-height="250"
                contain
                :src="require('./../../assets/img/mobile.jpg')"
              ></v-img>

              <v-row align="center" justify="center">
                <v-card-title class="pb-2 pt-5">
                  {{ $t("MOBILE") }}
                </v-card-title>
              </v-row>
            </v-card>
          </nuxt-link>
        </v-col>

        <v-col cols="6" sm="5" md="3">
          <nuxt-link :to="localePath('/tablet')" class="text-decoration-none">
            <v-card @click="tabletProducts()" hover>
              <v-img
                max-height="200"
                contain
                :src="require('./../../assets/img/tablet.jpg')"
              ></v-img>

              <v-row align="center" justify="center">
                <v-card-title class="pb-2 pt-5">
                  {{ $t("TABLET") }}
                </v-card-title>
              </v-row>
            </v-card>
          </nuxt-link>
        </v-col>

        <v-col cols="6" sm="5" md="3">
          <nuxt-link
            :to="localePath('/accessories')"
            class="text-decoration-none"
          >
            <v-card @click="accessoriesProducts()" hover>
              <v-img
                max-height="250"
                contain
                :src="require('./../../assets/img/accessories.jpg')"
              ></v-img>

              <v-row align="center" justify="center">
                <v-card-title class="pb-2 pt-5">
                  {{ $t("ACCESSORIES") }}
                </v-card-title>
              </v-row>
            </v-card>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "banner",
  data() {
    return {
      carouselImages: [
        "y6s.jpg",
        "Mi-11-Lite-AN-1920x760.png",
        "Mi-11.png",
        "banner1.png",
        "hpban.png"
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.banner-img {
  height: 25rem;
  width: 100%;
  margin: auto;
}
.row-margin {
  margin: 0 5rem;
}

@media (max-width: 1200px) {
  .row-margin {
    margin: 0;
  }
}
@media (max-width: 600px) {
  .banner-img {
    height: 15rem;
  }
}
</style>
