<template>
  <div>
    <template>
      <v-autocomplete
        hide-no-data
        auto-select-first
        style="z-index: 9999"
        v-model="model"
        :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
        prepend-inner-icon="mdi-magnify"
        :items="items"
        full-width
        class="mt-10 search-input"
        :loading="loading"
        :search-input.sync="search"
        solo
        dense
        rounded
        return-object
        item-text="name"
        item-value="id"
        no-filter
        :placeholder="$t('Searchproducts')"
      ></v-autocomplete>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "search",
  data() {
    return {
      items: [],
      loading: false,
      model: { id: null, name: null, type: null },
      search: null
    };
  },
  methods: {
    queryInput() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1500);
      this.items = [];
      this.$store.commit("home/setFilteredProducts", []);
      this.$store.dispatch("home/searchProducts", this.search);
    },

    routeName(value) {
      return value.toLowerCase();
    },

    productParam(name) {
      return name
        .split(" ")
        .splice(0, 3)
        .join(" ");
    },

    goTOProduct(id, type, name) {
      if (this.$i18n.locale == "en") {
        this.$router.push({
          name: this.routeName(type) + "-product___en",
          params: {
            product: this.productParam(name),
            id: id,
            parentRoute: type
          }
        });
      } else if (this.$i18n.locale == "ar") {
        this.$router.push({
          name: this.routeName(type) + "-product___ar",
          params: {
            product: this.productParam(name),
            id: id,
            parentRoute: type
          }
        });
      }
    }
  },
  computed: {
    ...mapGetters({ products: "home/getFilteredProducts" }),

    filteredProducts() {
      this.items = [];
      if (this.products && this.products.length > 0) {
        let item = { name: "", id: "", type: "" };

        this.products.forEach(product => {
          let name = product.name
            .split(" ")
            .slice(0, 3)
            .join(" ");
          item = Object.assign(
            {},
            { name: name, id: product.id, type: product.type }
          );

          this.items.push(item);
        });
      }
    }
  },
  watch: {
    model(model) {
      if (model) {
        this.goTOProduct(model.id, model.type, model.name);
        this.model = null;
      }
    },

    search(search) {
      if (search) {
        this.queryInput();
      } else {
        this.items = [];
        this.$store.commit("home/setFilteredProducts", []);
      }
    },

    products() {
      this.filteredProducts;
    }
  }
};
</script>

<style lang="scss" scoped></style>
