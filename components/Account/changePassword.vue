<template>
  <div>
    <v-card class="tabs-content" flat>
      <v-overlay opacity="0.8" :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>

      <v-card-title> {{ $t("changePassword") }} </v-card-title>

      <p
        class="red--text text-center mt-n10"
        v-if="updatedPasswordStatus && updatedPasswordStatus.status == 'failed'"
      >
        {{ updatedPasswordStatus.message }}
      </p>

      <p
        class="success--text text-center mt-n10"
        v-if="updatedPasswordStatus && updatedPasswordStatus.status == 'succes'"
      >
        {{ updatedPasswordStatus.message }}
      </p>

      <validation-observer ref="observer2" v-slot="{ handleSubmit }">
        <v-form @submit.prevent="handleSubmit(submit)" class="pa-5">
          <v-row justify="center">
            <!--  -->
            <v-col class="pb-0" cols="11">
              <validation-provider
                v-slot="{ errors }"
                name="Password"
                rules="required"
              >
                <div class="label-text">{{ $t("YourPassword") }}</div>
                <v-text-field
                  :error-messages="errors"
                  :error="errors.length > 0"
                  v-model="Password"
                  :disabled="!editPassword"
                  :flat="!editPassword"
                  solo
                  :placeholder="$t('YourPassword')"
                ></v-text-field>
              </validation-provider>
            </v-col>

            <v-col class="pb-0" cols="11">
              <validation-provider
                v-slot="{ errors }"
                name="newPassword"
                rules="required|min:8|max:30"
                vid="confirmation"
              >
                <div class="label-text">{{ $t("Newpassword") }}</div>
                <v-text-field
                  :error-messages="errors"
                  :disabled="!editPassword"
                  :flat="!editPassword"
                  solo
                  v-model="newPassword"
                  :placeholder="$t('Newpassword')"
                ></v-text-field>
              </validation-provider>
            </v-col>

            <v-col class="pb-0" cols="11">
              <validation-provider
                v-slot="{ errors }"
                name="confirmPassword"
                rules="required|min:8|max:30|confirmed:confirmation"
              >
                <div class="label-text">
                  {{ $t("Confirmpassword") }}
                </div>
                <v-text-field
                  :error-messages="errors"
                  :disabled="!editPassword"
                  :flat="!editPassword"
                  solo
                  v-model="confirmPassword"
                  :placeholder="$t('Confirmpassword')"
                ></v-text-field>
              </validation-provider>
            </v-col>
            <!--  -->
          </v-row>

          <v-row style="width: 70%" class="mx-auto mt-3" justify="space-around">
            <!--  -->
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  width="120"
                  v-bind="attrs"
                  v-on="on"
                  color="warning"
                  :disabled="editPassword"
                >
                  {{ $t("edit") }}
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h6 grey lighten-4 pt-6 pb-8">
                  {{ $t("DoYouWantToChangeYourPassword") }}
                </v-card-title>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog = false">
                    {{ $t("cancel") }}
                  </v-btn>

                  <v-btn
                    color="primary"
                    text
                    @click="
                      dialog = false;
                      editPassword = true;
                    "
                  >
                    {{ $t("yes") }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn
              width="120"
              color="success"
              :loading="loading"
              type="submit"
              :disabled="!editPassword"
            >
              {{ $t("save") }}
            </v-btn>
          </v-row>
        </v-form>
      </validation-observer>
    </v-card>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { ValidationObserver } from "vee-validate";
import { mapGetters } from "vuex";
export default {
  name: "changePassword",
  data() {
    return {
      newPassword: "",
      Password: "",
      confirmPassword: "",
      editPassword: false,
      dialog: false,
      loading: false
    };
  },
  methods: {
    submit() {
      this.loading = true;
      this.$store.dispatch("authentication/updateUserPassword", [
        this.$auth.user.id,
        this.Password,
        this.newPassword
      ]);
      this.$store.commit("authentication/setUpdatePasswordStatus");
    }
  },
  computed: {
    ...mapGetters({
      updatedPasswordStatus: "authentication/getUpdatePasswordStatus"
    })
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  watch: {
    updatedPasswordStatus() {
      if (this.updatedPasswordStatus) {
        this.loading = false;
        this.editPassword = false;
      }
    }
  },
  destroyed() {
    this.$store.commit("authentication/setUpdatePasswordStatus");
  }
};
</script>

<style lang="scss" scoped>
.tabs-content {
  background-color: #f5f5f5;
  min-height: 29rem !important;
  height: auto;
}
</style>
