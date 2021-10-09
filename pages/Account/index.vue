<template>
  <div class="main">
    <div class="breadCrumb-header">
      <v-container class="py-0">
        <breadCrumb :breadCrumb="breadCrumb" :childBreadCrumb="[]" />
      </v-container>
    </div>

    <v-container>
      <div class="user-title mx-7">
        {{ $t("welcome") }}, {{ $auth.user.name }}
      </div>

      <div v-if="$vuetify.breakpoint.smAndDown">
        <v-icon @click="drawer = !drawer" large>mdi-dots-vertical </v-icon>

        <v-navigation-drawer
          hide-overlay
          class="drawer-tabs"
          :right="false"
          :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
          v-model="drawer"
          color="blue-grey lighten-5"
          temporary
          absolute
        >
          <v-tab disabled class="mob-tab grey lighten-1 py-7">
            <span
              :class="$i18n.locale == 'en' ? 'mr-auto' : 'ml-auto'"
              class="mob-sub-title"
            >
              <v-icon color="black" left> mdi-account </v-icon>
              {{ $t("AccountInformation") }}
            </span>
          </v-tab>

          <v-tab @click="tab = 1" class="mob-tab">
            <span :class="$i18n.locale == 'en' ? 'mr-auto' : 'ml-auto'">
              <v-icon left> mdi-view-list </v-icon>
              {{ $t("myOrders") }}
            </span>
          </v-tab>

          <v-tab @click="tab = 2" class="mob-tab">
            <span :class="$i18n.locale == 'en' ? 'mr-auto' : 'ml-auto'">
              <v-icon left> mdi-newspaper-variant-outline </v-icon>
              {{ $t("PersonalInformation") }}
            </span>
          </v-tab>

          <v-tab @click="tab = 3" class="mob-tab">
            <span :class="$i18n.locale == 'en' ? 'mr-auto' : 'ml-auto'">
              <v-icon left> mdi-email-multiple </v-icon>
              {{ $t("Newsletter") }}
            </span>
          </v-tab>

          <v-tab @click="tab = 4" class="mob-tab">
            <span :class="$i18n.locale == 'en' ? 'mr-auto' : 'ml-auto'">
              <v-icon left> mdi-lock </v-icon>
              {{ $t("changePassword") }}
            </span>
          </v-tab>

          <v-tab @click="tab = 5" class="mob-tab">
            <span :class="$i18n.locale == 'en' ? 'mr-auto' : 'ml-auto'">
              <v-icon left> mdi-face-agent </v-icon>
              {{ $t("contactUs") }}
            </span>
          </v-tab>

          <v-tab
            @click="
              logout();
              tab = 6;
            "
            class="mob-tab"
          >
            <span :class="$i18n.locale == 'en' ? 'mr-auto' : 'ml-auto'">
              <v-icon left> mdi-exit-to-app </v-icon>
              {{ $t("logout") }}
            </span>
          </v-tab>
        </v-navigation-drawer>
      </div>

      <v-tabs v-model="tab" color="orange darken-4" hide-slider vertical>
        <div
          v-if="$vuetify.breakpoint.mdAndUp && $vuetify.breakpoint.width != 0"
        >
          <v-tab
            disabled
            :class="$i18n.locale == 'en' ? 'px-3 mr-10' : 'px-9 ml-10'"
            class="grey lighten-2 py-10"
          >
            <v-icon color="black" left> mdi-account </v-icon>
            <span class="sub-title">
              {{ $t("AccountInformation") }}
            </span>
          </v-tab>

          <v-tab
            :class="$i18n.locale == 'en' ? 'mr-10' : 'ml-10'"
            class="grey lighten-5 py-8"
          >
            <span :class="$i18n.locale == 'en' ? 'mr-auto' : 'ml-auto'">
              <v-icon left> mdi-view-list </v-icon>
              {{ $t("myOrders") }}
            </span>
          </v-tab>

          <v-tab
            :class="$i18n.locale == 'en' ? 'mr-10' : 'ml-10'"
            class="grey lighten-5 py-8"
          >
            <span :class="$i18n.locale == 'en' ? 'mr-auto' : 'ml-auto'">
              <v-icon left> mdi-newspaper-variant-outline </v-icon>
              {{ $t("PersonalInformation") }}
            </span>
          </v-tab>

          <v-tab
            :class="$i18n.locale == 'en' ? 'mr-10' : 'ml-10'"
            class="grey lighten-5 py-8"
          >
            <span :class="$i18n.locale == 'en' ? 'mr-auto' : 'ml-auto'">
              <v-icon left> mdi-email-multiple </v-icon>
              {{ $t("Newsletter") }}
            </span>
          </v-tab>

          <v-tab
            :class="$i18n.locale == 'en' ? 'mr-10' : 'ml-10'"
            class="grey lighten-5 py-8"
          >
            <span :class="$i18n.locale == 'en' ? 'mr-auto' : 'ml-auto'">
              <v-icon left> mdi-lock </v-icon>
              {{ $t("changePassword") }}
            </span>
          </v-tab>

          <v-tab
            :class="$i18n.locale == 'en' ? 'mr-10' : 'ml-10'"
            class="grey lighten-5 py-8"
          >
            <span :class="$i18n.locale == 'en' ? 'mr-auto' : 'ml-auto'">
              <v-icon left> mdi-face-agent </v-icon>
              {{ $t("contactUs") }}
            </span>
          </v-tab>

          <v-tab
            :class="$i18n.locale == 'en' ? 'mr-10' : 'ml-10'"
            @click="logout()"
            class="grey lighten-5 py-8"
          >
            <span :class="$i18n.locale == 'en' ? 'mr-auto' : 'ml-auto'">
              <v-icon left> mdi-exit-to-app </v-icon>
              {{ $t("logout") }}
            </span>
          </v-tab>
        </div>

        <v-tab-item> </v-tab-item>

        <v-tab-item>
          <v-row>
            <v-col cols="12" offset-sm="1" offset-md="0" sm="10" md="12">
              <v-card class="tabs-content" flat>
                <div class="">
                  <v-card-title class="orders-title">
                    {{ $t("myOrders") }}:
                  </v-card-title>
                </div>
                <v-card-text class="text-center">
                  <v-icon class="orders-icon">mdi-playlist-plus </v-icon>
                  <p>{{ $t("Youdonothaveanorderyet") }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>

        <v-tab-item>
          <v-row>
            <v-col cols="12" offset-sm="1" offset-md="0" sm="10" md="12">
              <personalInfo />
            </v-col>
          </v-row>
        </v-tab-item>

        <v-tab-item>
          <v-row>
            <v-col cols="12" offset-sm="1" offset-md="0" sm="10" md="12">
              <v-card class="tabs-content" flat>
                <v-card-title> {{ $t("Newsletter") }} </v-card-title>
                <div class="mx-auto" style="width: 90%">
                  <div>
                    <v-checkbox
                      :label="$t('NewsletterOption1')"
                      color="orange darken-3 "
                      class="black--text"
                      value=""
                      hide-details
                    >
                    </v-checkbox>
                  </div>

                  <div>
                    <v-checkbox
                      :label="$t('NewsletterOption2')"
                      color="orange darken-3 "
                      class="black--text"
                      value=""
                      hide-details
                    >
                    </v-checkbox>
                  </div>

                  <div>
                    <v-checkbox
                      :label="$t('NewsletterOption3')"
                      color="orange darken-3 white--text"
                      class="black--text"
                      value=""
                      hide-details
                    >
                    </v-checkbox>
                  </div>

                  <v-form>
                    <div class="text-start">
                      <v-hover v-slot="{ hover }">
                        <v-btn
                          elevation="3"
                          tile
                          class="mt-15"
                          width="300"
                          height="50"
                          x-large
                          type="submit"
                          :outlined="hover"
                          color="orange darken-4 white--text"
                        >
                          {{ $t("save") }}
                        </v-btn>
                      </v-hover>
                    </div>
                  </v-form>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>

        <v-tab-item>
          <v-row>
            <v-col cols="12" offset-sm="1" offset-md="0" sm="10" md="12">
              <changePassword />
            </v-col>
          </v-row>
        </v-tab-item>

        <v-tab-item>
          <v-row>
            <v-col cols="12" offset-sm="1" offset-md="0" sm="10" md="12">
              <v-card class="tabs-content" flat>
                <v-card-title class="text-h5">
                  {{ $t("contactUs") }}
                </v-card-title>
                <v-list width="80%" class="mx-auto mt-10" color="#f5f5f5">
                  <v-list-item class="contact-list">
                    <v-icon class="mx-4" large
                      >mdi-office-building-marker
                    </v-icon>
                    {{ $t("address") }}
                  </v-list-item>
                  <v-list-item class="contact-list">
                    <v-icon class="mx-4" large>mdi-email</v-icon>
                    Info@shopiland.Com
                  </v-list-item>
                  <v-list-item class="contact-list">
                    <v-icon class="mx-4" large>mdi-phone </v-icon>
                    176108
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
    </v-container>
  </div>
</template>
<script>
import personalInfo from "~/components/Account/personalInfo";
import changePassword from "~/components/Account/changePassword";
import breadCrumb from "~/components/main/breadCrumb";
import { ValidationProvider } from "vee-validate";
import { ValidationObserver } from "vee-validate";
export default {
  middleware({ app, redirect, $auth }) {
    if (!$auth.user) {
      if (app.i18n.vm.locale == "en") {
        return redirect("/login");
      } else if (app.i18n.vm.locale == "ar") {
        return redirect("/ar/login");
      }
    }
  },

  data() {
    return {
      tab: 1,
      drawer: false,
      breadCrumb: {
        name: this.$i18n.t("myAccount"),
        link: "/Account"
      }
    };
  },

  components: {
    breadCrumb,
    ValidationProvider,
    ValidationObserver,
    personalInfo,
    changePassword
  },

  methods: {
    logout() {
      this.$store.dispatch("authentication/logout");
      if (this.$i18n.locale == "en") {
        this.$router.push("/");
      } else if (this.$i18n.locale == "ar") {
        this.$router.push("/ar/");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  height: 50rem;
}
.breadCrumb-header {
  background-color: rgba(243, 243, 243, 0.4);
}
.user-title {
  font-size: 1.8rem;
  letter-spacing: 0.1rem;
  font-weight: 500;
  margin: 1rem 0 2rem 0;
}
.sub-title {
  font-size: 1.2rem;
  letter-spacing: 0.03rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: black;
}
.orders-title {
  padding-bottom: 0.3rem;
  font-size: 1.3rem;
}
.orders-icon {
  font-size: 10rem;
  text-align: center;
  color: rgba(107, 107, 107, 0.473);
  margin: 2rem 0 0.5rem 0;
}
.tabs-content {
  background-color: #f5f5f5;
  min-height: 29rem !important;
  height: auto;
}
.contact-list {
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.05rem;
  margin-bottom: 2rem;
  color: rgb(0, 0, 0);
}
.drawer-tabs {
  width: 15rem !important;
  position: absolute;
  height: 40rem !important;
  top: 110px !important;
}
.mob-tab {
  padding: 1rem 0.3rem;
  font-size: 0.5rem;
  background-color: rgb(240, 240, 240);
  &:hover {
    background-color: rgb(230, 230, 230);
  }
}
.mob-sub-title {
  font-size: 1rem;
  letter-spacing: 0.01rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: black;
}
</style>
