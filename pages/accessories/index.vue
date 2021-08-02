<template>
  <div>
    <productPage :type="type" :laptopBreadCrumb="accessoriesBreadCrumb" />
  </div>
</template>

<script>
import productPage from "~/components/main/productPage";

export default {
  data() {
    return {
      type: "Accessories",
      accessoriesBreadCrumb: {
        name: this.$i18n.t("ACCESSORIES"),
        link: "/accessories"
      }
    };
  },
  components: {
    productPage
  }
};
</script>
