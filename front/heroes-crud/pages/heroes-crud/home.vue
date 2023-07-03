
<script setup>
import { useFetch } from 'nuxt/app';

const headers = [
  { title: 'HeroID', align: 'start', sortable: true, key: 'HeroID' },
  { title: 'Name', key: 'Name' },
  { title: 'Gender', key: 'Gender' },
  { title: 'Rank', key: 'Rank' },
  { title: 'Class', key: 'Class' },
  { title: 'Abilities', key: 'Abilities' },
  { title: 'Actions', key: 'actions', sortable: false },
]
const config = useRuntimeConfig()

const error = ref(false)

const api =
{
  async fetch({ page, itemsPerPage, sortBy, search }) {
    var sort = 'HeroID'
    if (sortBy.length) {
      sort = `${sortBy[0].order == 'desc' ? '-' : ''}${sortBy[0].key}`
    }
    return await $fetch(`${config.public.API_URL}/prest/public/heroes?_page=${page}&_page_size=${itemsPerPage == -1 ? this.getPageCount() : itemsPerPage}&Name=$like.%25${search}%25&_order=${sort}`,
      { headers: { Authorization: `Bearer ${config.public.API_TOKEN}` } })
      .catch((error) => {
        error.value = true
      })
      .then((value) => {
        return value
      })
  },
  goEdit(id) {
    navigateTo(`/heroes-crud/edit/${id}`)
  },
  async deleteItemConfirm(field) {
    await useFetch(`${config.public.API_URL}/prest/public/heroes?HeroID=${field['HeroID']}`,
      {
        method: 'DELETE',
      }).catch((error) => {
        error.value = true
      })
  },
  async getPageCount() {
    const data = await $fetch(`${config.public.API_URL}/prest/public/heroes?_count=*`,
      { headers: { Authorization: `Bearer ${config.public.API_TOKEN}` } })

    return data[0].count
  },
  async initialize() {
    return await $fetch(`${config.public.API_URL}/prest/public/heroes?_page=1`,
      { headers: { Authorization: `Bearer ${config.public.API_TOKEN}` } })
      .catch((error) => {
        error.value = true
      })
      .then((values) => {
        return values
      })
  }

}
</script>
<template>
  <v-container>
    <div style="margin: 2%;">
      <DataTable :headers="headers" :api="api" pk="HeroID" :error="error" v-if="isHydrated"></DataTable>
    </div>
    <v-main style="min-height: 300px;"></v-main>
  </v-container>
</template>

