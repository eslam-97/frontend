<template>
  <div
    :class="toggleSlide ? 'slide' : 'reverseSlide'"
    class="d-flex flex-column"
    id="side-bar-position"
  >
    <v-hover v-slot="{ hover }">
      <div class="my-auto">
        <v-icon
          id="slide-icon-left"
          class="grey lighten-4"
          :ripple="false"
          v-if="toggleIcon"
          @click="
            toggleSlide = !toggleSlide;
            toggleIcon = !toggleIcon;
          "
          :color="hover ? 'orange darken-4' : null"
          >mdi-chevron-left
        </v-icon>

        <v-icon
          id="slide-icon"
          class="grey lighten-4"
          :ripple="false"
          v-if="!toggleIcon"
          @click="
            toggleSlide = !toggleSlide;
            toggleIcon = !toggleIcon;
          "
          :color="hover ? 'orange darken-4' : null"
          >mdi-chevron-right
        </v-icon>
      </div>
    </v-hover>

    <div id="side-bar" class="grey lighten-4">
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <nuxt-link to="/ShoppingCart" class="text-decoration-none">
            <div v-bind="attrs" v-on="on" class="sidebar-text text-center">
              <v-icon class="icon">mdi-cart-outline</v-icon>
            </div>
          </nuxt-link>
          <v-divider></v-divider>
        </template>
        <span>{{ $t("viewShoppingCart") }}</span>
      </v-tooltip>

      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on" class="sidebar-text text-center mt-1">
            <v-icon
              @click="$vuetify.goTo(1, options)"
              color="primary"
              class="icon"
              >mdi-chevron-double-up
            </v-icon>
          </div>
          <v-divider></v-divider>
        </template>
        <span>{{ $t("goUp") }}</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: "sideNav",
  data() {
    return {
      toggleIcon: false,
      toggleSlide: false,
      duration: 500,
      offset: 0,
      easing: "easeInOutCubic"
    };
  },
  computed: {
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing
      };
    }
  }
};
</script>

<style lang="scss" scoped>
#side-bar-position {
  position: fixed;
  height: auto;
  top: 45%;
  right: 0;
  z-index: 99999;
}
#slide-icon {
  height: 2rem;
  width: 3rem;
  font-size: 2.2rem;
  border-top: 0.5px solid rgb(230, 230, 230) !important;
  border-left: 0.5px solid rgb(230, 230, 230) !important;
  &::after {
    background-color: transparent;
  }
}
#slide-icon-left {
  right: 2.5rem !important;
  top: 4rem !important;
  height: 2.2rem;
  width: 2rem;
  font-size: 2.2rem;
  &::after {
    background-color: transparent;
  }
}
.slide {
  animation: barSlide 0.3s ease-in-out 0s 1 normal forwards;
  -webkit-animation: barSlide 0.3s ease-in-out 0s 1 normal forwards;
  -o-animation: barSlide 0.3s ease-in-out 0s 1 normal forwards;
  -moz-animation: barSlide 0.3s ease-in-out 0s 1 normal forwards;
}
.reverseSlide {
  animation: barSlideReverse 0.3s ease-in-out 0s 1 normal forwards;
  -webkit-animation: barSlideReverse 0.3s ease-in-out 0s 1 normal forwards;
  -o-animation: barSlideReverse 0.3s ease-in-out 0s 1 normal forwards;
  -moz-animation: barSlideReverse 0.3s ease-in-out 0s 1 normal forwards;
}
#side-bar {
  width: 3rem;
  border-top: 0.5px solid rgb(230, 230, 230) !important;
  border-bottom: 0.5px solid rgb(230, 230, 230) !important;
  border-left: 0.5px solid rgb(230, 230, 230) !important;
  .sidebar-text {
    padding: 0.6rem 0 !important;
    cursor: pointer;
    &:hover > .icon {
      color: #e65100;
    }
    .icon {
      font-size: 1.9rem;
      height: 2rem;
    }
  }
}
@keyframes barSlide {
  from {
    right: 0;
  }
  to {
    right: -3rem;
  }
}
@keyframes barSlideReverse {
  from {
    right: -3rem;
  }
  to {
    right: 0rem;
  }
}
@media (max-width: 600px) {
  #side-bar {
    .sidebar-text {
      .icon {
        font-size: 1.4rem;
        height: 1.5rem;
      }
    }
  }
}
</style>
