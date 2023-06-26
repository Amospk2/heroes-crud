<template>
  <v-app>
    <v-layout>
      <AppBar :drawer="drawer" @handleDrawer="handleDrawer" />
      <v-app-bar align="center" title="Heroes Crud" style="position: fixed;" @click.native="openDrawer"></v-app-bar>
      <NavigationDrawer v-model="drawer" />

      <v-main>
        <slot />
      </v-main>

    </v-layout>
  </v-app>
</template>

<script>
import NavigationDrawer from '~/components/NavigationDrawer.vue'
import DataTable from '~/components/DataTable.vue'

export default {
  components: {
    NavigationDrawer,
    DataTable,
  },
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
