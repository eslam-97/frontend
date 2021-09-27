<template>
  <div>
    <productPage :type="type" :laptopBreadCrumb="TabletBreadCrumb" />
  </div>
</template>

<script>
import productPage from "~/components/main/productPage";

export default {
  data() {
    return {
      type: "tablet",
      TabletBreadCrumb: {
        name: this.$i18n.t("TABLET"),
        link: "/tablet"
      }
    };
  },
  head: {
    title: "tablet page",
    meta: [
      {
        hid: "tablet page",
        name: "tablet page",
        content: "tablet page for tech shop contains all tablet of our products"
      }
    ]
  },
  components: {
    productPage
  }
};
</script>
