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
  components: {
    productPage
  }
};
</script>
