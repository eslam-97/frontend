<template>
  <div>
    <div class="main">
      <div class="breadCrumb-header">
        <v-container class="py-0">
          <breadCrumb :breadCrumb="breadCrumb" :childBreadCrumb="[]" />
        </v-container>
      </div>

      <div class="login-card">
        <div class="form-title">{{ $t("signUp") }}</div>
        <v-card outlined>
          <validationObserver
            ref="observer"
            v-slot="{ handleSubmit }"
            @submit.prevent
          >
            <v-form
              style="z-index: 99"
              class="login-form"
              @submit.prevent="handleSubmit(submit)"
            >
              <v-row justify="space-between">
                <v-col class="pb-0" cols="12" md="6">
                  <validation-provider
                    v-slot="{ errors }"
                    ref="name"
                    name="firstName"
                    rules="required|"
                    class="text-start"
                  >
                    <div class="label-text">
                      {{ $t("FirstName") }}
                    </div>
                    <v-text-field
                      hide-details=""
                      :dense="$vuetify.breakpoint.mdAndDown"
                      outlined
                      v-model="firstName"
                      :error="errors.length > 0 ? true : false"
                      :placeholder="$t('FirstName')"
                      solo
                      required
                    ></v-text-field>
                    <p
                      v-if="registerErrors && firstName == userData[0]"
                      class="red--text"
                    >
                      {{ registerErrors.name ? registerErrors.name[0] : "" }}
                    </p>
                    <p v-else class="red--text">
                      {{ errors[0] }}
                    </p>
                  </validation-provider>
                </v-col>

                <v-col class="pb-0" cols="12" md="6">
                  <validation-provider
                    v-slot="{ errors }"
                    name="username"
                    rules="required|"
                    class="text-start"
                  >
                    <div class="label-text">{{ $t("UserName") }}</div>
                    <v-text-field
                      hide-details=""
                      :dense="$vuetify.breakpoint.mdAndDown"
                      outlined
                      v-model="username"
                      :error="errors.length > 0 ? true : false"
                      :placeholder="$t('UserName')"
                      solo
                      required
                    ></v-text-field>
                    <p
                      v-if="registerErrors && username == userData[1]"
                      class="red--text"
                    >
                      {{
                        registerErrors.username
                          ? registerErrors.username[0]
                          : ""
                      }}
                    </p>
                    <p v-else class="red--text">
                      {{ errors[0] }}
                    </p>
                  </validation-provider>
                </v-col>
              </v-row>

              <v-row justify="space-between">
                <v-col class="pb-0" cols="12" md="6">
                  <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    rules="required|email"
                    class="text-start"
                  >
                    <div class="label-text">{{ $t("Email") }}</div>
                    <v-text-field
                      hide-details=""
                      :dense="$vuetify.breakpoint.mdAndDown"
                      outlined
                      ref="email"
                      v-model="email"
                      :placeholder="$t('Email')"
                      :error="errors.length > 0 ? true : false"
                      solo
                      required
                    ></v-text-field>
                    <p
                      v-if="registerErrors && email == userData[2]"
                      class="red--text"
                    >
                      {{ registerErrors.email ? registerErrors.email[0] : "" }}
                    </p>
                    <p v-else class="red--text">
                      {{ errors[0] }}
                    </p>
                  </validation-provider>
                </v-col>

                <v-col class="pb-0" cols="12" md="6">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Phone"
                    rules="required|integer"
                    class="text-start"
                  >
                    <div class="label-text">{{ $t("Phone") }}</div>
                    <v-text-field
                      :dense="$vuetify.breakpoint.mdAndDown"
                      outlined
                      hide-details=""
                      v-model="phone"
                      :error="errors.length > 0 ? true : false"
                      :placeholder="$t('Phone')"
                      solo
                      required
                    ></v-text-field>
                    <p
                      v-if="registerErrors && phone == userData[3]"
                      class="red--text"
                    >
                      {{ registerErrors.phone ? registerErrors.phone[0] : "" }}
                    </p>
                    <p v-else class="red--text">
                      {{ errors[0] }}
                    </p>
                  </validation-provider>
                </v-col>
              </v-row>

              <v-row justify="space-between">
                <v-col class="pb-0" cols="12" md="6">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Password"
                    rules="required|min:8|max:30"
                    vid="confirmation"
                    class="text-start"
                  >
                    <div class="label-text">{{ $t("password") }}</div>
                    <v-text-field
                      :dense="$vuetify.breakpoint.mdAndDown"
                      solo
                      outlined
                      v-model="password"
                      :error-messages="errors"
                      :placeholder="$t('password')"
                      required
                      type="password"
                    ></v-text-field>
                  </validation-provider>
                </v-col>

                <v-col class="pb-0" cols="12" md="6">
                  <validation-provider
                    v-slot="{ errors }"
                    name="confirmPassword"
                    rules="required|min:8|max:30|confirmed:confirmation"
                    class="text-start"
                  >
                    <div class="label-text">
                      {{ $t("confirmPassword") }}
                    </div>
                    <v-text-field
                      :dense="$vuetify.breakpoint.mdAndDown"
                      solo
                      outlined
                      v-model="confirmPassword"
                      :error-messages="errors"
                      :placeholder="$t('confirmPassword')"
                      required
                      type="password"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <validation-provider
                    v-slot="{ errors }"
                    name="avatar"
                    rules="image"
                    class=""
                  >
                    <div class="label-text text-start">
                      {{ $t("chooseYourImage") }}
                    </div>
                    <v-file-input
                      :dense="$vuetify.breakpoint.mdAndDown"
                      solo
                      outlined
                      full-width
                      @change="onFileChange($event)"
                      :error-messages="errors"
                      v-model="avatar"
                      label="File Input"
                      name="avatar"
                    ></v-file-input>
                  </validation-provider>
                </v-col>
              </v-row>

              <v-btn
                id="login-btn"
                class="mt-6 mb-10"
                elevation="2"
                type="submit"
                :large="$vuetify.breakpoint.mdAndUp"
                outlined
                color="orange darken-4"
              >
                <span id="btn-text"> {{ $t("signUp") }} </span>
              </v-btn>

              <div>
                {{ $t("AlreadyHaveAnAccount") }}
                <nuxt-link
                  class="text-decoration-none"
                  :to="localePath('login')"
                >
                  <v-hover v-slot="{ hover }">
                    <v-btn
                      id="login-bt"
                      class="mx-2"
                      elevation="0"
                      color="primary"
                      :outlined="hover"
                    >
                      {{ $t("login") }}
                    </v-btn>
                  </v-hover>
                </nuxt-link>
              </div>
            </v-form>
          </validationObserver>
          <v-overlay opacity="0.8" :value="isLoading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-overlay>
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
        name: this.$i18n.t("register"),
        link: "/register"
      },
      firstName: "",
      username: "",
      phone: "",
      password: "",
      confirmPassword: "",
      email: "",
      avatar: null,
      backendErrors: [],
      isLoading: false,
      loading: true
    };
  },
  components: {
    breadCrumb,
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    submit() {
      if (this.registerErrors) {
        if (
          (this.registerErrors.name && this.firstName == this.userData[0]) ||
          (this.registerErrors.username && this.username == this.userData[1]) ||
          (this.registerErrors.email && this.email == this.userData[2]) ||
          (this.registerErrors.phone && this.phone == this.userData[3])
        ) {
        } else {
          this.submitProccess;
        }
      } else {
        this.submitProccess;
      }
    },

    onFileChange(imageFile) {
      this.avatar = imageFile;
    }
  },

  computed: {
    ...mapGetters({
      registerStatus: "authentication/getRegisterStatus",
      registerErrors: "authentication/getRegisterErrors",
      userData: "authentication/getUserData"
    }),

    submitProccess() {
      this.isLoading = true;
      this.$store.commit("authentication/setRegisterInfo", []);
      let formData = new FormData();
      formData.append("name", this.firstName);
      formData.append("username", this.username);
      formData.append("password", this.password);
      formData.append("email", this.email);
      formData.append("phone", this.phone);
      formData.append("avatar", this.avatar);
      this.$store.dispatch("authentication/register", formData);

      this.$store.commit("authentication/setUserData", [
        this.firstName,
        this.username,
        this.email,
        this.phone
      ]);
    }
  },

  watch: {
    registerStatus() {
      setTimeout(() => {
        this.isLoading = false;
      }, 800);
      if (this.registerStatus == "success") {
        this.$router.push(this.localePath("/login"));
      } else {
        this.firstName = this.userData[0];
        this.username = this.userData[1];
        this.email = this.userData[2];
        this.phone = this.userData[3];
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
  width: 80%;
  margin: auto;
  margin-bottom: 5rem;
}
.login-form {
  width: 90%;
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
    width: 25%;
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
