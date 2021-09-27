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
  head: {
    title: "acccessories page",
    meta: [
      {
        hid: "acccessories page",
        name: "acccessories page",
        content:
          "acccessories page for tech shop contains categories all electronic acccessories for our products"
      }
    ]
  },
  components: {
    productPage
  }
};
</script>
