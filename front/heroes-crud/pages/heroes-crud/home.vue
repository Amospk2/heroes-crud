<template>
  <v-container>
    <div style="margin: 2%;">
      <DataTable></DataTable>
    </div>
    <v-main style="min-height: 300px;"></v-main>
  </v-container>
</template>

<script>

export default {
  methods: {
    openDrawer() {
      this.$refs.drawer.drawer = true;
    },
  },
}
</script>
