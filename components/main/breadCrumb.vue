<template>
  <div>
    <div v-if="!childBreadCrumb.name">
      <v-breadcrumbs :items="breadCrumbs">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right </v-icon>
        </template>

        <template v-slot:item="{ item }">
          <v-breadcrumbs-item exact active-class="">
            <nuxt-link class="text-decoration-none" :to="localePath(item.href)">
              <v-icon>{{ item.icon }}</v-icon>
              <span :class="item.class">{{ item.text }}</span>
            </nuxt-link>
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </div>

    <div v-if="childBreadCrumb.name">
      <v-breadcrumbs :items="childBreadCrumbs">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right </v-icon>
        </template>

        <template v-slot:item="{ item }">
          <v-breadcrumbs-item active-class="" exact>
            <nuxt-link class="text-decoration-none" :to="localePath(item.href)">
              <v-icon color="grey darken-1">{{ item.icon }}</v-icon>
              <span :class="item.class">{{ item.text }}</span>
            </nuxt-link>
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </div>
  </div>
</template>

<script>
export default {
  name: "breadCrumb",
  data() {
    return {
      breadCrumbs: [
        {
          icon: "mdi-home",
          text: "",
          href: "/"
        },
        {
          icon: "",
          text: this.breadCrumb.name,
          href: this.breadCrumb.link,
          class: "orange--text text--darken-3"
        }
      ],
      childBreadCrumbs: [
        {
          icon: "mdi-home",
          text: "",
          href: "/"
        },
        {
          icon: "",
          text: this.childBreadCrumb.name,
          href: this.childBreadCrumb.link,
          class: "grey--text text--darken-2"
        },
        {
          icon: "",
          text: this.childBreadCrumb.name2,
          href: this.childBreadCrumb.link2,
          class: "orange--text text--darken-3"
        }
      ]
    };
  },
  props: ["breadCrumb", "childBreadCrumb"]
};
</script>

<style lang="scss" scoped></style>
