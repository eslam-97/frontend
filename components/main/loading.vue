<template>
  <div>
    <v-overlay :color="color" :opacity="opacity" :value="loading">
      <v-progress-circular
        class="loading-icon"
        color="grey"
        indeterminate
        size="50"
      >
      </v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: "loading",

  props: ["opacity", "loading", "color"]
};
</script>

<style lang="scss" scoped>
.loading-icon {
  position: fixed;
  top: 43%;
  left: 46%;
}
</style>
