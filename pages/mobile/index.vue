<template>
  <div>
    <productPage :type="type" :laptopBreadCrumb="mobilBreadCrumb" />
  </div>
</template>

<script>
import productPage from "~/components/main/productPage";

export default {
  data() {
    return {
      type: "mobile",
      mobilBreadCrumb: {
        name: this.$i18n.t("MOBILE"),
        link: "/mobile"
      }
    };
  },
  head: {
    title: "mobile page",
    meta: [
      {
        hid: "mobile page",
        name: "mobile page",
        content:
          "mobile page for tech shop contains all mobiles of our products"
      }
    ]
  },
  components: {
    productPage
  }
};
</script>
