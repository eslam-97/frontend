<template>
  <div>
    <v-card class="tabs-content" flat>
      <v-overlay opacity="0.8" :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>

      <v-card-title class="pb-0"> {{ $t("myAccount") }} </v-card-title>

      <p
        class="red--text text-center mt-n6"
        v-if="updateUserStatus && updateUserStatus.status == 'failed'"
      >
        {{
          updateUserStatus.message.email
            ? updateUserStatus.message.email[0]
            : updateUserStatus.message
        }}
      </p>
      <p
        class="success--text text-center mt-n6"
        v-if="updateUserStatus && updateUserStatus.status == 'succes'"
      >
        {{ updateUserStatus.message }}
      </p>

      <validation-observer v-slot="{ handleSubmit }">
        <v-form
          @submit.prevent="handleSubmit(submit)"
          v-model="valid"
          class="pa-5"
        >
          <v-row>
            <v-col class="py-0" cols="12" md="6">
              <validation-provider
                v-slot="{ errors }"
                name="Name"
                rules="required|"
                class="text-start"
              >
                <div>{{ $t("name") }}</div>
                <v-text-field
                  :error-messages="errors"
                  :readonly="!editInfo"
                  v-model="name"
                  :flat="!editInfo"
                  solo
                >
                </v-text-field>
              </validation-provider>
            </v-col>

            <v-col class="py-0" cols="12" md="6">
              <validation-provider
                v-slot="{ errors }"
                name="username"
                rules="required|"
                class="text-start"
              >
                <div>{{ $t("UserName") }}</div>
                <v-text-field
                  :error-messages="errors"
                  v-model="username"
                  :readonly="!editInfo"
                  :flat="!editInfo"
                  solo
                ></v-text-field>
              </validation-provider>
            </v-col>

            <v-col class="py-0" cols="12">
              <validation-provider
                v-slot="{ errors }"
                name="email"
                rules="required|email"
                class="text-start"
              >
                <div>{{ $t("Email") }}</div>
                <v-text-field
                  :error-messages="errors"
                  v-model="email"
                  :readonly="!editInfo"
                  :flat="!editInfo"
                  solo
                ></v-text-field>
              </validation-provider>
            </v-col>

            <v-col class="py-0" cols="12">
              <validation-provider
                v-slot="{ errors }"
                name="phone"
                rules="required|integer"
                class="text-start"
              >
                <div>{{ $t("Phone") }}</div>
                <v-text-field
                  :error-messages="errors"
                  v-model="phone"
                  :readonly="!editInfo"
                  :flat="!editInfo"
                  solo
                ></v-text-field>
              </validation-provider>
            </v-col>

            <v-col class="py-0" cols="12">
              <validation-provider
                v-slot="{ errors }"
                name="avatar"
                rules="image"
              >
                <div class="text-start">
                  {{ $t("chooseYourImage") }}
                </div>
                <v-file-input
                  :dense="$vuetify.breakpoint.mdAndDown"
                  full-width
                  @change="onFileChange($event)"
                  :error-messages="errors"
                  v-model="avatar"
                  label="File Input"
                  name="avatar"
                  :disabled="!editInfo"
                  :flat="!editInfo"
                  solo
                ></v-file-input>
              </validation-provider>
            </v-col>
          </v-row>

          <v-row style="width: 70%" class="mx-auto mt-3" justify="space-around">
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  width="120"
                  v-bind="attrs"
                  v-on="on"
                  color="warning"
                  :disabled="editInfo"
                >
                  {{ $t("edit") }}
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h6 grey lighten-4 pt-6 pb-8">
                  {{ $t("DoYouWantToEditYourInformation") }}
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
                      editInfo = true;
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
              :disabled="!editInfo"
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
  name: "personalInfo",
  data() {
    return {
      name: "",
      username: "",
      email: "",
      phone: "",
      avatar: null,
      editInfo: false,
      dialog: false,
      loading: false,
      valid: false
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted() {
    if (this.$auth.user) {
      this.name = this.$auth.user.name;
      this.username = this.$auth.user.username;
      this.email = this.$auth.user.email;
      this.phone = this.$auth.user.phone;
      this.oldPassword = this.$auth.user.password;
    }
  },
  methods: {
    submit() {
      this.editInfo = false;
      this.loading = true;
      // form data for uploading Image
      let formData = new FormData();
      formData.append("id", this.$auth.user.id);
      formData.append("name", this.name);
      formData.append("username", this.username);
      formData.append("email", this.email);
      formData.append("phone", this.phone);
      formData.append("avatar", this.avatar);

      this.$store.dispatch("authentication/updateUserInfo", formData);
      this.$store.commit("authentication/setUpdateUserStatus");
      this.$auth.fetchUser();
    },
    onFileChange(imageFile) {
      this.avatar = imageFile;
    }
  },
  computed: {
    ...mapGetters({
      updateUserStatus: "authentication/getUpdateUserStatus"
    })
  },

  watch: {
    updateUserStatus() {
      if (this.updateUserStatus) {
        this.loading = false;
        this.editPassword = false;
      }
    }
  },
  destroyed() {
    this.$store.commit("authentication/setUpdateUserStatus");
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
