<template>
  <div>
    <v-alert width="500" class="alert" :value="alert" type="success">
      {{ alertMsg }}
    </v-alert>
    <loading :loading="loading" opacity="0.5" />

    <v-row class="main-row">
      <v-col cols="12" md="9" sm="12" class="mx-auto">
        <v-tabs v-model="tabs">
          <v-tabs-slider color="orange darken-2"></v-tabs-slider>
          <v-tab active-class="tabs-title-active">
            {{ $t("Description") }}
          </v-tab>
          <v-tab active-class="tabs-title-active">
            {{ $t("Specification") }}
          </v-tab>
          <v-tab active-class="tabs-title-active">
            {{ $t("Review") }} ({{ reviewCount() }})</v-tab
          >
        </v-tabs>

        <v-tabs-items class="mt-5" v-model="tabs">
          <v-tab-item>
            <v-card flat>
              <v-card-title class="">
                {{ $t("Anawesomeproduct") }}
              </v-card-title>
              <v-card-text>
                <p>
                  Duis lobortis massa imperdiet quam. Donec vitae orci sed dolor
                  rutrum auctor. Vestibulum facilisis, purus nec pulvinar
                  iaculis, ligula mi congue nunc, vitae euismod ligula urna in
                  dolor. Praesent congue erat at massa.
                </p>

                <p>
                  Aenean posuere, tortor sed cursus feugiat, nunc augue blandit
                  nunc, eu sollicitudin urna dolor sagittis lacus. Pellentesque
                  egestas, neque sit amet convallis pulvinar, justo nulla
                  eleifend augue, ac auctor orci leo non est. Etiam sit amet
                  orci eget eros faucibus tincidunt. Donec sodales sagittis
                  magna.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr
                    v-for="i in specsLength()"
                    :key="i"
                    :class="
                      i == 0 || i == 2 || i == 4 || i == 6 || i == 8
                        ? 'table'
                        : ''
                    "
                  >
                    <td>{{ specsKeys()[i] }}</td>
                    <td v-if="specsValues()[i]">
                      {{ specsValues()[i] }}
                    </td>
                    <td v-else>-</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-tab-item>

          <v-tab-item class="">
            <v-row v-for="(review, i) in product.rating" :key="review.id">
              <v-col class="" offset="0" sm="auto" cols="3">
                <v-img
                  v-if="getRatingUsers[i]"
                  contain
                  width="100"
                  height="100"
                  :src="imgUrl() + getRatingUsers[i].avatar"
                  class="img"
                >
                </v-img>
              </v-col>

              <v-col class="px-0" cols="8" md="9">
                <v-card elevation="5" class="ma-1">
                  <v-card-title class="pt-2 pb-3">
                    <span v-if="getRatingUsers[i]" class="card-name">
                      {{ getRatingUsers[i].username }} - &nbsp;
                    </span>

                    <span class="card-date">
                      {{ review.created_at }}
                    </span>
                  </v-card-title>
                  <v-card-text>
                    <div class="pb-3">
                      {{ review.text }}
                    </div>
                    <v-row justify="end">
                      <v-rating
                        dir="auto"
                        :value="review.rate"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                        class="pa-0"
                      >
                      </v-rating>
                    </v-row>
                  </v-card-text>
                </v-card>
                <v-divider class="mt-5 mx-16"></v-divider>
              </v-col>
            </v-row>

            <v-row v-if="$auth.loggedIn" class="mt-12">
              <v-col md="10" cols="11" class="mx-auto">
                <v-text-field
                  full-width
                  hide-details=""
                  outlined
                  height="100"
                  type="textarea"
                  v-model="rateText"
                  placeholder="Post Your Review Here"
                >
                </v-text-field>
                <v-rating
                  dir="auto"
                  color="amber"
                  dense
                  v-model="rateValue"
                  size="18"
                  class="pa-0 text-end"
                >
                </v-rating>
                <v-btn
                  outlined
                  @click="addReview()"
                  class="review-title orange--text text--darken-3"
                >
                  {{ $t("AddaReview") }}
                </v-btn>
              </v-col>
            </v-row>

            <v-row v-if="!$auth.loggedIn" class="">
              <v-col cols="auto" class="mx-auto">
                <div class="text-center mt-2 mb-5">
                  <v-btn outlined class="review-title orange--text" disabled>
                    {{ $t("AddaReview") }}
                  </v-btn>
                </div>
                <div class="sub-text mb-3">
                  {{ $t("YouMustBeLoggedInToPostAReview") }}
                </div>
              </v-col>
            </v-row>
            <v-divider class="mt-5"></v-divider>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import loading from "~/components/main/loading.vue";

export default {
  name: "productDetail",
  data() {
    return {
      tabs: null,
      rateValue: 0,
      rateText: "",
      loading: false,
      alert: false,
      alertMsg: "",
      specsKeysLocalized: [
        "الموديل",
        "نوع المعالج",
        "سرعة المعالجة المركزية",
        "بطاقة في جي إي",
        "الذاكرة العشوائية",
        "نوع الشريحة",
        "وحدة المعالجة المركزية",
        "التخزين الداخلي",
        "الشاشة",
        "دقة العرض",
        "القرص الصلب",
        "البطارية",
        "نظام التشغيل",
        "الكاميرا",
        "كاميرا سيلفي"
      ]
    };
  },
  async fetch() {
    await this.$store.dispatch("ratingUsers", this.product.id),
      this.$store.dispatch("productSpecs", this.product.id);
  },
  components: {
    loading
  },

  props: ["product"],

  methods: {
    imgUrl() {
      return "http://localhost:8000/";
    },

    specsLength() {
      return Object.keys("getProductSpecs");
    },

    specsKeys() {
      if (this.$i18n.locale == "en") {
        return Object.keys(this.getProductSpecs);
      } else if (this.$i18n.locale == "ar") {
        return this.specsKeysLocalized;
      }
    },

    specsValues() {
      return Object.values(this.getProductSpecs);
    },

    reviewCount() {
      if (Object.keys(this.product).length > 0) {
        return this.product.rating.length;
      } else {
        return null;
      }
    },

    addReview() {
      this.displayAlert();
      this.$store.dispatch("addRating", [
        this.rateText,
        this.rateValue,
        this.$auth.user.id,
        this.product.id
      ]);
      this.$store.dispatch("ratingUsers", this.product.id);
      this.$store.dispatch("home/product", [this.product.id]);
      this.rateText = "";
      this.rateValue = 0;
    },

    displayAlert() {
      this.alertMsg = "Review Added Successfully";
      this.loading = true;
      this.alert = false;
      setTimeout(() => {
        this.loading = false;
        this.alert = true;
      }, 2000);
      setTimeout(() => {
        this.alert = false;
      }, 4500);
    }
  },

  computed: {
    ...mapGetters({
      getProductSpecs: "getProductSpecs",
      getRatingUsers: "getRatingUsers"
    })
  },

  watch: {
    product() {
      this.reviewCount();
    },

    getRatingUsers() {
      this.reviewCount();
    }
  }
};
</script>

<style lang="scss" scoped>
.main-row {
  margin-bottom: 100px;
}

.tabs-title-active {
  color: orangered !important;
}
.review-row {
  height: auto;
}
.review-title {
  font-size: 1.5rem !important;
  font-weight: 600;
  letter-spacing: 0.05rem;
  color: black;
  text-align: center;
}
.card-name {
  color: rgb(41, 41, 41);
  font-size: 1.2rem;
}
.card-date {
  color: rgb(150, 150, 150);
  font-size: 0.9rem;
}
.card {
  width: 100%;
}

.table {
  background-color: rgb(250, 250, 250);
}
.sub-text {
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.05rem;
  color: rgb(134, 134, 134);
}
.alert {
  z-index: 99999;
  position: fixed;
  top: 12%;
  right: 5%;
}
</style>
