<script>
export default {
  data() {
    return {
      drawer: false,
    }
  },
  mounted() {
    this.drawer = false || !this.$vuetify.display.mobile
  },
}
</script>

<template>
  <v-app>
    <v-layout>
      <AppBar :drawer="drawer" @handleDrawer="handleDrawer" />
      <NavigationDrawer v-model="drawer" />

      <v-main>
        
      </v-main>
    </v-layout>
  </v-app>
</template>
