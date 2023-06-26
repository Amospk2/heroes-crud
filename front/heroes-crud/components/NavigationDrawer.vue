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
      <v-list-item prepend-icon="mdi-home" base-color="white" @click="goHome">
        <v-list-item-title class="title">Heroes CRUD</v-list-item-title>
        <v-list-item-subtitle class="d-flex">
          {{ message }}
        </v-list-item-subtitle>
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
    items: [
      {
        title: 'Add Heroes',
        value: 'add-heroes',
        props: {
          prependIcon: 'mdi-plus',
          href: '/createHeroes',
        },
      },
    ],
    message: ' ',
  }),
  methods: {
    goHome() {
      this.$router.push('/home');
    },
  },
}
</script>

<style>
.v-list-item__prepend .v-icon {
  opacity: 100;
}
</style>
