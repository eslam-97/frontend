<template>
  <div>
    <client-only placeholder="">
      <v-container>
        <v-row justify="start" align="center">
          <div class="slider-title">{{ sliderTitle }}</div>
        </v-row>
      </v-container>

      <v-row dir="auto" justify="center">
        <v-col md="11" cols="12">
          <agile dir="auto" ref="carousel" :options="myOptions" class="slider">
            <div
              v-for="product in products.slice(0, 15)"
              :key="product.id"
              class="card-wrapper"
            >
              <productCard v-on="$listeners" :product="product" />
            </div>
          </agile>
        </v-col>
      </v-row>

      <v-container>
        <v-row justify="end">
          <div dir="auto">
            <v-btn large icon @click="previous()" class="">
              <v-icon large>mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn large icon @click="next()" class="">
              <v-icon large>mdi-chevron-right </v-icon>
            </v-btn>
          </div>
        </v-row>
      </v-container>
    </client-only>
  </div>
</template>

<script>
import productCard from "~/components/productCard/card";

export default {
  name: "slider",
  data() {
    return {
      myOptions: {
        autoplay: false,
        dots: false,
        navButtons: false,
        slidesToShow: 2,
        infinite: true,
        responsive: [
          {
            breakpoint: 1264,
            settings: {
              slidesToShow: 5
            }
          },

          {
            breakpoint: 960,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3
            }
          }
        ]
      }
    };
  },
  methods: {
    next() {
      this.$refs.carousel.goToNext();
    },
    previous() {
      this.$refs.carousel.goToPrev();
    }
  },
  components: {
    productCard
  },
  props: ["sliderTitle", "products"]
};
</script>

<style lang="scss" scoped>
.slider-title {
  font-size: 2rem;
  border-bottom: 1px solid black;
}
.slider {
  height: auto;
  margin: 1rem 1rem 0;

  .card-wrapper {
    padding: 0 0.5rem;
    margin: 0.7rem 0;
  }
}
</style>
