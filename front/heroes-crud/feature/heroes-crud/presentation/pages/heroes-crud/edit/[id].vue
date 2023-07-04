<script setup>
import { onHydrated } from "@/core/composables/vue"
const values = reactive({
    itens: {
        'HeroID': '',
        'Name': '',
        'Gender': '',
        'Rank': '',
        'Class': '',
        'Abilities': ''
    },
    editedIndex: ref(-1),
    items: ref([]),
    config: useRuntimeConfig(),
    pageCount: ref(0),
    id: useRoute().params.id,
    errorMSG: ''
})
async function hidrate() {
    const response = await useFetch(`${values.config.public.API_URL}/prest/public/heroes?HeroID=${values.id}`,
        {
            method: 'GET',
        });
    values.itens.Name = response.data.value[0].Name
    values.itens.Rank = response.data.value[0].Rank
    values.itens.HeroID = response.data.value[0].HeroID
    values.itens.Gender = response.data.value[0].Gender
    values.itens.Class = response.data.value[0].Class
    values.itens.Abilities = response.data.value[0].Abilities
}

async function getPageCount() {
    const data = await $fetch(`${values.config.public.API_URL}/prest/public/heroes?_count=*`, {
        headers: { Authorization: `Bearer ${values.config.public.API_TOKEN}` }
    })

    values.pageCount = data[0].count
}

async function save() {
    const editedItem = values.itens
    await $fetch(`${values.config.public.API_URL}/prest/public/heroes?HeroID=${values.id}`, {
        headers: { Authorization: `Bearer ${values.config.public.API_TOKEN}` },
        method: "PUT",
        body: values.itens,
    }).then(data => {
        if (!data.error) {
            if (values.editedIndex > -1) {
                Object.assign(values.items[values.editedIndex], editedItem.value)
            } else {
                values.items.push(editedItem.value)
            }
        }
    }).catch((error) => {
        values.errorMSG = "Erro encontrado na requisição."
    })

    navigateTo('/heroes-crud/home')

}

onHydrated( () =>{
    hidrate()
})
</script>
<template>
    <v-container>
        <v-row>
            <v-col align="center">
                <h1 class="text--underline">Editing "{{ values.itens.Name }}#{{ values.itens.HeroID }}"</h1>
                <h4 style="color: red;">{{ values.errorMSG }}</h4>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="values.itens.Name" label="Name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-select label="Select" :items="['Male', 'Female']" v-model="values.itens.Gender"></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="values.itens.Rank" label="Rank"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="values.itens.Class" label="Class"></v-text-field>
            </v-col>
            <v-col cols="12" sm="10" md="12">
                <v-text-field v-model="values.itens.Abilities" label="Abilities"></v-text-field>
            </v-col>
        </v-row>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="navigateTo('/heroes-crud/home')">
                Cancel
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="save">
                Save
            </v-btn>
        </v-card-actions>
    </v-container>
</template>




