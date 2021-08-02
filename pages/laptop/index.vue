<template>
  <div>
    <productPage :type="type" :laptopBreadCrumb="laptopBreadCrumb" />
  </div>
</template>

<script>
import productPage from "~/components/main/productPage";

export default {
  data() {
    return {
      type: "LAPTOP",
      laptopBreadCrumb: {
        name: this.$i18n.t("LAPTOP"),
        link: "/laptop"
      }
    };
  },
  components: {
    productPage
  }
};
</script>
