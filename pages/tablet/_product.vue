<template>
  <div>
    <loading :loading="pageLoading" opacity="1" color="white" />

    <div class="breadCrumb-header">
      <v-container>
        <breadCrumb :breadCrumb="[]" :childBreadCrumb="idBreadCrumb" />
      </v-container>
    </div>

    <v-container v-if="!pageLoading" fluid class="mt-2">
      <detailedCard :type="type" :product="product" />
      <productDetail :product="product" />
    </v-container>

    <slider
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
      type: this.$i18n.t("TABLET"),
      sliderTitle: this.$i18n.t("SimilarProducts"),
      pageLoading: true,
      idBreadCrumb: {
        name: this.$i18n.t("TABLET"),
        link: "/tablet",
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
    this.$store.dispatch("home/similarProducts", ["TABLET"]);
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
        this.idBreadCrumb.link2 = "/tablet/" + this.idBreadCrumb.name2;
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
</style>
