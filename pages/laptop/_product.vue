<template>
  <div>
    <v-alert width="auto" class="alert pr-10" :value="alert" :type="alertType">
      {{ alertMsg }}
    </v-alert>
    <loading :loading="pageLoading" opacity="1" color="white" />

    <div class="breadCrumb-header">
      <v-container>
        <breadCrumb :breadCrumb="[]" :childBreadCrumb="idBreadCrumb" />
      </v-container>
    </div>

    <v-container v-if="!pageLoading" fluid class="mt-2">
      <loading :loading="loading" opacity="0.5" />
      <detailedCard :type="type" :product="product" />
      <productDetail :product="product" />
    </v-container>

    <slider
      @display-alert="displayAlert($event)"
      v-if="!pageLoading"
      class="mb-16"
      :products="similarProducts"
      :sliderTitle="sliderTitle"
    />
  </div>
</template>

<script>
import detailedCard from "~/components/productCard/detailedCard";
import productDetail from "~/components/productCard/productDetail";
import slider from "~/components/home/slider";
import breadCrumb from "~/components/main/breadCrumb";
import loading from "~/components/main/loading";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      alert: false,
      alertMsg: "",
      loading: false,
      alertType: "success",
      type: this.$i18n.t("LAPTOP"),
      sliderTitle: this.$i18n.t("SimilarProducts"),
      pageLoading: true,
      idBreadCrumb: {
        name: this.$i18n.t("LAPTOP"),
        link: "/laptop",
        name2: "",
        link2: ""
      }
    };
  },

  created() {
    this.productParams();
  },

  mounted() {
    if (!this.$route.params.id) {
      this.pageLoading = false;
    }
  },

  fetch() {
    this.$store.dispatch("home/similarProducts", ["LAPTOP"]);
    if (this.$route.params.id) {
      this.$store.commit("home/setSingleProduct", []);
      this.$store.dispatch("home/product", [this.$route.params.id]);
    } else if (!this.$route.params.id) {
      this.$store.dispatch("home/product", [this.product.id]);
    }
  },

  components: {
    detailedCard,
    breadCrumb,
    slider,
    productDetail,
    loading
  },

  methods: {
    productParams() {
      if (this.$route.params.product) {
        this.idBreadCrumb.name2 = this.$route.params.product
          .split(" ")
          .splice(0, 4)
          .join(" ");
        this.idBreadCrumb.link2 = "/laptop/" + this.idBreadCrumb.name2;
      }
    },

    displayAlert(value) {
      if (value.type == "warning") {
        this.alertMsg = value.msg;
        this.alertType = value.type;
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 1500);
      } else {
        this.loading = true;
        this.alert = false;
        this.alertMsg = value.msg;
        this.alertType = value.type;
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
      product: "home/getSingleProduct",
      similarProducts: "home/getSimilarProducts"
    })
  },

  watch: {
    product() {
      if (Object.keys(this.product).length > 0) {
        this.pageLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.breadCrumb-header {
  height: 5rem;
  background-color: rgba(243, 243, 243, 0.4);
}
.alert {
  z-index: 99999;
  position: fixed;
  top: 15%;
  right: 5%;
}
</style>
