<template>
  <div>
    <v-footer elevation="10" color="blue-grey lighten-1 footer">
      <span
        :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
        class="mt-3 contact-icons"
      >
        <v-btn
          :large="!$vuetify.breakpoint.smAndDown"
          color="indigo darken-1"
          class="contact-icon"
          icon
        >
          <v-icon :size="$vuetify.breakpoint.smAndDown ? 28 : 33"
            >mdi-facebook</v-icon
          >
        </v-btn>
        <v-btn
          :large="!$vuetify.breakpoint.smAndDown"
          color="blue darken-2"
          class="contact-icon"
          icon
        >
          <v-icon :size="$vuetify.breakpoint.smAndDown ? 28 : 33"
            >mdi-twitter</v-icon
          >
        </v-btn>

        <v-btn
          :large="!$vuetify.breakpoint.smAndDown"
          color="deep-orange darken-4"
          class="contact-icon"
          icon
        >
          <v-icon :size="$vuetify.breakpoint.smAndDown ? 28 : 33"
            >mdi-instagram</v-icon
          >
        </v-btn>
        <v-btn
          :large="!$vuetify.breakpoint.smAndDown"
          color="blue darken-4"
          class="contact-icon"
          icon
        >
          <v-icon :size="$vuetify.breakpoint.smAndDown ? 28 : 33"
            >mdi-linkedin</v-icon
          >
        </v-btn>
      </span>

      <v-row style="width: 100%; margin: 0px" class="mt-lg-n10 mt-1" no-gutters>
        <v-col
          class="
                  mt-lg-0 mt-5
                  pt-0
                  justify-xs-start justify-sm-center justify-lg-center
                  d-flex
               "
          cols="5"
        >
          <div>
            <div class="">
              <span
                :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
                class="pb-1 mb-lg-0 mb-0 contact-header"
                >{{ $t("contact") }}</span
              >
            </div>
            <v-list
              :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
              color="blue-grey lighten-1"
              class="pt-3"
            >
              <v-list-item>
                <v-list-item-title
                  ><v-icon>mdi-office-building-marker </v-icon>
                  <span class="contact-text">
                    {{ $t("address") }}
                  </span>
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title
                  ><v-icon>mdi-email</v-icon>
                  <span class="contact-text">
                    Info@shopiland.Com
                  </span>
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title
                  ><v-icon>mdi-phone </v-icon>
                  <span class="contact-text"> 176108 </span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </div>
        </v-col>

        <v-col
          offset-lg="0"
          offset="0"
          cols="4"
          class="mt-lg-0 mt-2 justify-center d-flex"
        >
          <v-list color="blue-grey lighten-1 ">
            <v-list-item>
              <v-icon small>mdi-circle-medium </v-icon>
              <nuxt-link class="hover black--text text-decoration-none" to="/">
                {{ $t("home") }}
              </nuxt-link>
            </v-list-item>

            <v-list-item>
              <v-icon small>mdi-circle-medium </v-icon>
              <nuxt-link class="hover black--text text-decoration-none" to="/">
                {{ $t("TermsOfUse") }}
              </nuxt-link>
            </v-list-item>

            <v-list-item>
              <v-icon small>mdi-circle-medium </v-icon>
              <nuxt-link class="hover black--text text-decoration-none" to="/">
                {{ $t("RefundPolicy") }}
              </nuxt-link>
            </v-list-item>

            <v-list-item>
              <v-icon small>mdi-circle-medium </v-icon>
              <nuxt-link class="hover black--text text-decoration-none" to="/">
                {{ $t("AboutUs") }}
              </nuxt-link>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col offset="" cols="3" class="mt-lg-0 mt-2 justify-center d-flex">
          <v-list color="blue-grey lighten-1">
            <v-list-item>
              <v-icon small>mdi-circle-medium </v-icon>
              <nuxt-link class="hover black--text text-decoration-none" to="/">
                {{ $t("LAPTOP") }}
              </nuxt-link>
            </v-list-item>

            <v-list-item>
              <v-icon small>mdi-circle-medium </v-icon>
              <nuxt-link class="hover black--text text-decoration-none" to="/">
                {{ $t("MOBILE") }}
              </nuxt-link>
            </v-list-item>

            <v-list-item>
              <v-icon small>mdi-circle-medium </v-icon>
              <nuxt-link class="hover black--text text-decoration-none" to="/">
                {{ $t("TABLET") }}
              </nuxt-link>
            </v-list-item>

            <v-list-item>
              <v-icon small>mdi-circle-medium </v-icon>
              <nuxt-link class="hover black--text text-decoration-none" to="/">
                {{ $t("ACCESSORIES") }}
              </nuxt-link>
            </v-list-item>
          </v-list>
        </v-col>
        <v-divider class="mx-15"></v-divider>
      </v-row>

      <v-row class="mt-0 pt-0">
        <v-col>
          <div class="mx-auto">
            &copy; {{ new Date().getFullYear() }}
            <small style="font-size: 0.7rem"
              >{{ $t("AllRightsReserved") }}
            </small>
          </div>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "defaultFooter",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.footer {
  .contact-header {
    font-size: 1.25rem;
    letter-spacing: 0.08rem !important;
    border-bottom: 2px solid rgb(150, 67, 0);
    text-align: center;
  }
  .contact-icons {
    margin-left: 30%;
    &[dir="rtl"] {
      margin-right: 30%;
    }
  }
  .hover {
    &:hover {
      color: #e65100 !important;
    }
  }
}
.contact-text {
  font-size: 1.2rem;
}
@media (max-width: 1263.9px) {
  .contact-icons {
    margin: auto;
    &[dir="rtl"] {
      margin: auto;
    }
    .contact-icon {
      margin-right: 0.7rem;
      &[dir="rtl"] {
        margin-left: 0.7rem;
      }
    }
  }
}
.contact-text {
  font-size: 1rem;
}
@media (max-width: 800px) {
  .contact-text {
    font-size: 0.78rem;
  }
}
</style>
