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
            @change="filter($event)"
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
export default {
   name: "productFilter",
   data() {
      return {
         filterIcon: true,
         cardFilter: [
            this.$i18n.t("name"),
            this.$i18n.t("Price"),
            this.$i18n.t("Rating"),
         ],
         cardNmb: ["12", "24", "36"],
         orderedByFilter: "Name",
         paginationNum: 12,
         orderedByOption: "asc",
      };
   },
   props: ["type"],
   methods: {
      filter(filter) {
         this.orderedByFilter = filter;
         this.$store.commit("filters/setOrderedByFilter", [
            this.orderedByFilter,
            this.orderedByOption,
         ]);
      },

      numFilter(num) {
         this.paginationNum = num;
         this.$store.commit("filters/setPaginationNum", this.paginationNum);
      },

      filterDesc() {
         this.filterIcon = false;
         this.orderedByOption = "desc";
         this.$store.commit("filters/setOrderedByOption", [
            this.orderedByOption,
            this.orderedByFilter,
         ]);
      },

      filterAsc() {
         this.filterIcon = true;
         this.orderedByOption = "asc";
         this.$store.commit("filters/setOrderedByOption", [
            this.orderedByOption,
            this.orderedByFilter,
         ]);
      },
   },
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