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
  components: {
    productPage
  }
};
</script>
