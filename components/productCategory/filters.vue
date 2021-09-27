<template>
  <div>
    <v-row
      class="d-flex main-row flex-row flex-nowrap"
      justify-md="end"
      justify="start"
      justify-sm="center"
      align="start"
    >
      <p :dir="$i18n.locale == 'en' ? 'ltr' : 'rtl'" class="select-text">
        {{ $t("sortBy") }}
      </p>
      <v-select
        background-color="grey lighten-5"
        class="filterSelect"
        flat
        :items="cardFilter"
        @change="sortProducts($event)"
        dense
        solo
        :value="$t('name')"
      >
      </v-select>

      <v-hover v-slot="{ hover }">
        <div>
          <v-tooltip v-if="filterIcon" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                :dir="$i18n.locale == 'en' ? 'ltr' : 'rtl'"
                @click="filterDesc()"
                :color="hover ? 'blue' : ''"
                class="filter-icon"
                >mdi-arrow-up-bold</v-icon
              >
            </template>
            <span> {{ $t("Descending") }}</span>
          </v-tooltip>

          <v-tooltip v-else bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                :dir="$i18n.locale == 'en' ? 'ltr' : 'rtl'"
                @click="filterAsc()"
                :color="hover ? 'blue' : ''"
                class="filter-icon"
                >mdi-arrow-down-bold</v-icon
              >
            </template>
            <span> {{ $t("Ascending") }}</span>
          </v-tooltip>
        </div>
      </v-hover>

      <p class="select-text">{{ $t("Show") }}</p>
      <v-select
        background-color="grey lighten-5"
        class="showSelect"
        flat
        :items="cardNmb"
        dense
        value="12"
        solo
        @change="numFilter($event)"
      >
      </v-select>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "productFilter",
  data() {
    return {
      filterIcon: true,
      cardFilter: [
        this.$i18n.t("name"),
        this.$i18n.t("Price"),
        this.$i18n.t("popular")
      ],
      cardNmb: ["12", "24", "36"],
      sortBy: "name",
      paginationValue: 12,
      orderDir: "asc"
    };
  },
  props: ["type"],

  methods: {
    sortProducts(filter) {
      this.sortBy = filter;
      this.$store.dispatch("filters/filterProducts", [
        this.type,
        this.selectedFilters[0],
        this.selectedFilters[1],
        this.selectedFilters[2],
        this.sortBy,
        this.orderDir
      ]);
    },

    numFilter(paginationNum) {
      this.paginationValue = paginationNum;
      this.$store.commit("filters/setPaginationValue", this.paginationValue);
    },

    filterDesc() {
      this.filterIcon = false;
      this.orderDir = "desc";
      this.$store.dispatch("filters/filterProducts", [
        this.type,
        this.selectedFilters[0],
        this.selectedFilters[1],
        this.selectedFilters[2],
        this.sortBy,
        this.orderDir
      ]);
    },

    filterAsc() {
      this.filterIcon = true;
      this.orderDir = "asc";
      this.$store.dispatch("filters/filterProducts", [
        this.type,
        this.selectedFilters[0],
        this.selectedFilters[1],
        this.selectedFilters[2],
        this.sortBy,
        this.orderDir
      ]);
    }
  },
  computed: {
    ...mapGetters({
      selectedFilters: "filters/getSelectedFilters"
    })
  }
};
</script>

<style lang="scss" scoped>
.main-row {
  margin: 10px 10px 0 0;

  .select-text {
    margin: 5px 7px 0 0;
    font-size: 1.2rem;
    letter-spacing: 0.04rem;
    &[dir="rtl"] {
      margin: 5px 0 0 7px;
    }
  }
  .showSelect {
    width: 5rem !important;
  }
  .filter-icon {
    margin: 0.4rem 3rem 0 0.2rem;
    cursor: pointer;
    &[dir="rtl"] {
      margin: 0.4rem 0.2rem 0 3rem;
    }
  }
  .filterSelect {
    width: 10rem;
  }
}
@media (max-width: 959.9px) {
  .main-row {
    .showSelect {
      max-width: 5rem !important;
    }
    .filterSelect {
      max-width: 7rem;
    }
    .filter-icon {
      margin: 0.4rem 0.5rem 0 0.2rem !important;
      &[dir="rtl"] {
        margin: 0.4rem 0.2rem 0 0.5rem !important;
      }
    }
  }
  .select-text {
    font-size: 1rem !important;
  }
}
</style>
