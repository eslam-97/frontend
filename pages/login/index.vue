<template>
  <div>
    <div class="main">
      <div class="breadCrumb-header">
        <v-container class="py-0">
          <breadCrumb :breadCrumb="breadCrumb" :childBreadCrumb="[]" />
        </v-container>
      </div>

      <div class="login-card">
        <div class="form-title">{{ $t("login") }}</div>

        <v-card outlined>
          <validation-observer ref="observer" v-slot="{ handleSubmit }">
            <v-form class="login-form" @submit.prevent="handleSubmit(submit)">
              <p class="red--text mb-n5">{{ loginMsg }}</p>

              <validation-provider
                v-slot="{ errors }"
                name="email"
                rules="required|email"
                class="text-start"
              >
                <div class="label-text">{{ $t("Email") }}</div>
                <v-text-field
                  :dense="$vuetify.breakpoint.mdAndDown"
                  outlined
                  v-model="email"
                  :error="error"
                  :error-messages="errors"
                  :placeholder="$t('Email')"
                  solo
                  required
                ></v-text-field>
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                name="Password"
                rules="required"
                class="text-start"
              >
                <div class="label-text">{{ $t("password") }}</div>
                <v-text-field
                  :dense="$vuetify.breakpoint.mdAndDown"
                  solo
                  outlined
                  v-model="password"
                  :error="error"
                  :error-messages="errors"
                  :placeholder="$t('password')"
                  required
                  type="password"
                ></v-text-field>
              </validation-provider>

              <v-hover v-slot="{ hover }">
                <v-btn
                  id="login-btn"
                  class="mt-3 mb-10"
                  elevation="2"
                  type="submit"
                  :large="$vuetify.breakpoint.mdAndUp"
                  :outlined="hover"
                  color="primary"
                >
                  <span id="btn-text"> {{ $t("login") }} </span>
                </v-btn>
              </v-hover>

              <div>
                {{ $t("DontHaveAnAccountYet") }}
                <nuxt-link
                  class="text-decoration-none"
                  :to="localePath('register')"
                >
                  <v-btn
                    id="login-bt"
                    class="mx-2"
                    elevation="0"
                    outlined
                    color="orange darken-4"
                  >
                    {{ $t("signUp") }}
                  </v-btn>
                </nuxt-link>
              </div>

              <v-overlay opacity="0.8" :value="isLoading">
                <v-progress-circular
                  indeterminate
                  size="64"
                ></v-progress-circular>
              </v-overlay>
            </v-form>
          </validation-observer>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import breadCrumb from "~/components/main/breadCrumb";
import { ValidationProvider } from "vee-validate";
import { ValidationObserver } from "vee-validate";
import { mapGetters } from "vuex";

export default {
  middleware({ app, redirect, $auth }) {
    if ($auth.loggedIn) {
      if (app.i18n.vm.locale == "en") {
        return redirect("/account");
      } else if (app.i18n.vm.locale == "ar") {
        return redirect("/ar/account");
      }
    }
  },
  data() {
    return {
      breadCrumb: {
        name: this.$i18n.t("login"),
        link: "/login"
      },
      password: "",
      email: "",
      isLoading: false,
      error: false
    };
  },

  components: {
    breadCrumb,
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    submit() {
      this.$store.commit("authentication/setLoginData", []);
      this.$store.dispatch("authentication/login", [this.email, this.password]);
      this.error = false;
      this.isLoading = true;
    }
  },

  computed: {
    ...mapGetters({
      loginStatus: "authentication/getLoginStatus",
      loginMsg: "authentication/getLoginMsg"
    })
  },

  watch: {
    loginStatus() {
      if (this.loginStatus == "failed") {
        this.isLoading = false;
        this.error = true;
      } else if (this.loginStatus == "success") {
        if (this.$i18n.locale == "en") {
          this.$router.push("/Account");
        } else if (this.$i18n.locale == "ar") {
          this.$router.push("/ar/Account");
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  height: auto;
}
.breadCrumb-header {
  background-color: rgba(243, 243, 243, 0.4);
}
.form-title {
  margin: 2rem 0 1rem 0;
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
}
.login-card {
  height: fit-content;
  width: 60%;
  margin: auto;
  margin-bottom: 5rem;
}
.login-form {
  width: 80%;
  margin: 0 auto;
  padding: 2rem 0 2rem 0;
  text-align: center;
  .label-text {
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: 0.07rem;
    margin-bottom: 0.4rem;
  }
  #login-btn {
    width: 35%;
    #btn-text {
      font-size: 1.4rem !important;
      font-weight: 400;
      letter-spacing: 0.09rem;
    }
  }
}
@media (max-width: 960px) {
  .login-card {
    width: 95% !important;
    .login-form {
      width: 90%;
      .label-text {
        font-size: 1.1rem;
      }
      #login-btn {
        width: 50%;
        #btn-text {
          font-size: 1.2rem !important;
        }
      }
    }
  }
}
</style>
