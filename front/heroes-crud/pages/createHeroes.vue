<template>
  <v-card>
    <v-layout>
      <v-app-bar title="Heroes Crud" @click.native="openDrawer"></v-app-bar>
      
      <NavigationDrawer />
      <div style="margin: 8%;">
        <p>WIP-Create Heroes</p>
      </div>

      <v-main style="min-height: 300px;"></v-main>

    </v-layout>
  </v-card>
</template>

<script>
import NavigationDrawer from '~/components/NavigationDrawer.vue'

export default {
  components: {
    NavigationDrawer,
  },
  methods: {
    openDrawer() {
      this.$refs.drawer.drawer = true;
    },
  },
}
</script>