<template>
  <div>
    <v-alert width="auto" class="alert pr-10" :value="alert" :type="type">
      {{ alertMsg }}
    </v-alert>

    <v-container fluid>
      <loading :loading="loading" opacity="0.5" />

      <banner class="mt-10 mb-10" />

      <slider
        v-if="newArrival"
        @display-alert="displayAlert($event)"
        :products="newArrival"
        class="mt-15"
        :sliderTitle="$t('NewArrivals')"
      />

      <v-divider class="mx-16 mt-7 mb-15"></v-divider>
      <slider
        v-if="hotOffers"
        @display-alert="displayAlert($event)"
        :products="hotOffers"
        :sliderTitle="$t('HotOffers')"
      />

      <v-divider class="mx-16 mt-7 mb-15"></v-divider>
      <slider
        v-if="bestSeller"
        @display-alert="displayAlert($event)"
        :products="bestSeller"
        :sliderTitle="$t('BestSellers')"
      />

      <v-divider class="mx-16 mt-7 mb-15"></v-divider>
    </v-container>
  </div>
</template>
<script>
import banner from "~/components/home/banner.vue";
import slider from "~/components/home/slider.vue";
import loading from "~/components/main/loading.vue";

import { mapGetters } from "vuex";
export default {
  components: {
    banner,
    slider,
    loading
  },
  data() {
    return {
      alert: false,
      alertMsg: "",
      loading: false,
      type: "success"
    };
  },

  head: {
    title: 'Home page',
    meta: [
      {
        hid: 'Home page',
        name: 'Home page',
        content: 'Home page for tech shop contains categories such laptops, mobiles, tablets, acccessories'
      }
    ],
  },
  asyncData(context) {
    return (
      context.store.dispatch("home/productCategories"),
      context.store.dispatch("home/hotOffers"),
      context.store.dispatch("home/newArrival"),
      context.store.dispatch("home/bestSeller")
    );
  },

  fetch() {
    if (this.$auth.loggedIn) {
      this.$store.dispatch("userCartProducts", [this.$auth.user.id]),
        this.$store.dispatch("userWishlistProducts", [this.$auth.user.id]);
    }
  },

  methods: {
    displayAlert(value) {
      if (value.type == "warning") {
        this.alertMsg = value.msg;
        this.type = value.type;
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 1500);
      } else {
        this.loading = true;
        this.alert = false;
        this.alertMsg = value.msg;
        this.type = value.type;
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
      hotOffers: "home/getHotOffers",
      newArrival: "home/getNewArrival",
      bestSeller: "home/getBestSeller"
    })
  }
};
</script>
<style lang="scss" scoped>
.alert {
  z-index: 99999;
  position: fixed;
  top: 15%;
  right: 5%;
}
</style>
