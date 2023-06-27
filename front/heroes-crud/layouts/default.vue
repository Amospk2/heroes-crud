<template>
  <v-app>
    
    <v-layout>
      <v-app-bar align="center" title="Heroes Crud" style="position: fixed;"></v-app-bar>
      <NavigationDrawer v-model="drawer" />
      <v-main>
        <slot />
      </v-main>

    </v-layout>
  </v-app>
</template>

<script>

export default {
  data() {
    return {
      drawer: false,
    }
  },
  methods: {
    handleDrawer() {
      this.drawer = !this.drawer
    },
  },
}
</script>
