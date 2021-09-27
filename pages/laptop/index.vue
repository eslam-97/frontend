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
  head: {
    title: "LAPTOP page",
    meta: [
      {
        hid: "LAPTOP page",
        name: "LAPTOP page",
        content:
          "LAPTOP page for tech shop contains all LAPTOPs of our products"
      }
    ]
  },
  components: {
    productPage
  }
};
</script>
