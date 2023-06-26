<template>
  <v-container>
    <div style="margin: 3%;">
      <DataTable></DataTable>
    </div>

    <v-main style="min-height: 300px;"></v-main>
  </v-container>
</template>

<script>
import DataTable from '~/components/DataTable.vue'

export default {
  components: {
    DataTable,
  },
  methods: {
    openDrawer() {
      this.$refs.drawer.drawer = true;
    },
  },
}
</script>
