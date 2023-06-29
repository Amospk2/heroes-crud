<template>
  <v-container>
    <div style="margin: 2%;">
      <DataTable v-if="isHydrated"></DataTable>
    </div>
    <v-main style="min-height: 300px;"></v-main>
  </v-container>
</template>

