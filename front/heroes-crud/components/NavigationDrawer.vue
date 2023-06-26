<template>
  <v-navigation-drawer
    :permanent="!$vuetify.display.mobile"
    :rail="!$vuetify.display.mobile"
    :expand-on-hover="!$vuetify.display.mobile"
    :disable-resize-watcher="!$vuetify.display.mobile"
    style="position: fixed;"
    color="#1A73BD"
  >
    <v-list>
      <v-list-item prepend-icon="mdi-home" base-color="white" @click="navigateTo('/heroes-crud/home')">
        <v-list-item-title class="title">Heroes CRUD</v-list-item-title>
      </v-list-item>
      <v-list-item prepend-icon="mdi-plus" base-color="white" @click="navigateTo('/heroes-crud/create')">
        <v-list-item-title class="title">Add Heroes</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list :items="items" base-color="white" />
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    open: [],
  }),
}
</script>

<style>
.v-list-item__prepend .v-icon {
  opacity: 100;
}
</style>
